import { List } from "antd";
import { useState } from "react";
import { GetTimeline } from "../../wailsjs/go/bangumi_api/BangumiApi";
import { bangumi_api } from "../../wailsjs/go/models";
import SubjectCard from "../components/SubjectCard";
import "./TimelinePage.css";

export interface TimelinePageProps {
    weekday: number
}

export default function TimelinePage({ weekday }: TimelinePageProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [subjects, setSubjects] = useState<bangumi_api.CalendarRoot>();

    // TODO: Catch
    if (loading) {
        GetTimeline(weekday).then(setSubjects);
        setLoading(false);
    }

    return (
        <div className="subject_list">
            <List loading={loading} grid={{ column: 1 }} dataSource={subjects?.items}
                renderItem={s =>
                    <List.Item>
                        <SubjectCard subject={s} size="default" image="small" />
                    </List.Item>
                }
            />
        </div>
    );
}