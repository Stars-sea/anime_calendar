import { List } from "antd";
import React from "react";
import { GetSingelDayWithFullInfo } from "../../wailsjs/go/bangumi_api/BangumiApi";
import { bangumi_api } from "../../wailsjs/go/models";
import { ProgressRing } from "../components/ProgressRing";
import { SubjectCard } from "../components/SubjectCard";

export interface CalendarPageProps {
    loading_done?: (value: bangumi_api.CalendarRoot[]) => void,
    loading_error?: (reason: any) => void
}

export interface CalendarPageState {
    loading_index: boolean,
    loading_error?: string,

    calendar_root?: bangumi_api.CalendarRoot
}

export class CalendarPage extends React.Component<CalendarPageProps, CalendarPageState> {
    constructor(props: CalendarPageProps) {
        super(props)

        this.state = {
            loading_index: true,
            loading_error: undefined,
            calendar_root: undefined
        };
    }

    render(): React.ReactNode {
        this.updateCalendar();

        return (
            <div className="calendar_page_root" style={{padding: "32px 8px"}}>
                <ProgressRing wrapperClassName="loading full-window" size="large" spinning={this.state.loading_index}/>
                <List
                    size="large" itemLayout="vertical" grid={{ gutter: 16, column: 1 }}
                    dataSource={this.state.calendar_root?.items}
                    renderItem={s =>
                        <List.Item>
                            <SubjectCard subject={s} image="small" size="default" />
                        </List.Item>
                    }
                />
            </div>
        )
    }

    private async updateCalendar() {
        if (!this.state.loading_index) return;

        try {
            const root = await GetSingelDayWithFullInfo(1);
            this.setState({
                loading_index: false,
                calendar_root: root
            });
        } catch (error: any) {
            this.setState({
                loading_index: false,
                loading_error: error
            });
        }
    }
}