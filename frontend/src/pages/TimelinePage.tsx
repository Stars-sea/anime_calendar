import { DrawerProps, List } from "antd";
import { useContext, useEffect, useState } from "react";
import { GetTimeline, IsUserCollected } from "../../wailsjs/go/bangumi_api/BangumiApi";
import { bangumi_api } from "../../wailsjs/go/models";
import { AppConfigContext } from "../App";
import SubjectCard from "../components/SubjectCard";
import "./TimelinePage.css";

export interface TimelinePageProps {
    weekday: number,
    showOnDrawer?: (props: DrawerProps) => void
}

export default ({ weekday, showOnDrawer }: TimelinePageProps) => {
    const appconfig = useContext(AppConfigContext);
    const [subjects, setSubjects] = useState<bangumi_api.Subject[]>();
    const [loading, setLoading] = useState<boolean>();

    const updateSubject = async () => {
        setLoading(true);

        let timeline = (await GetTimeline(weekday)).items;

        if (appconfig && appconfig.filter_anime) {
            const username = appconfig.bangumi_username;
            const conditions = await Promise.all(
                timeline.map(async s => await IsUserCollected(username, s.id))
            );
            timeline = timeline.filter((_, i) => conditions[i]);
        }

        setSubjects(timeline);
        setLoading(false);
    };

    useEffect(() => { updateSubject() }, [appconfig?.filter_anime]);

    return (
        <div className="subject_list">
            <List grid={{ column: 1 }} dataSource={subjects} loading={loading}
                locale={{ "emptyText": "空空如也" }}
                renderItem={s =>
                    <List.Item>
                        <SubjectCard subject={s} showOnDrawer={showOnDrawer} />
                    </List.Item>
                }
            />
        </div>
    );
}