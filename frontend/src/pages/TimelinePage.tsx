import { List } from "antd";
import { useContext, useEffect, useState } from "react";
import { GetTimeline, IsUserCollected } from "../../wailsjs/go/bangumi_api/BangumiApi";
import { bangumi_api } from "../../wailsjs/go/models";
import { AppConfigContext } from "../App";
import SubjectCard from "../components/SubjectCard";
import "./TimelinePage.css";

export interface TimelinePageProps {
    weekday: number
}

export default ({ weekday }: TimelinePageProps) => {
    const { appconfig } = useContext(AppConfigContext);
    const [subjects, setSubjects] = useState<bangumi_api.Subject[]>();
    const [loading, setLoading] = useState<boolean>();

    const updateSubject = async () => {
        setLoading(true);

        let timeline = (await GetTimeline(weekday)).items;

        if (appconfig.user_config && appconfig.filter_anime) {
            const username = appconfig.user_config?.bangumi_username;
            const conditions = await Promise.all(
                timeline.map(async s => await IsUserCollected(username, s.id))
            );
            timeline = timeline.filter((_, i) => conditions[i]);
        }

        setSubjects(timeline);
        setLoading(false);
    };

    useEffect(() => { updateSubject() }, [appconfig.filter_anime, appconfig.user_config]);

    return (
        <div className="subject_list">
            <List grid={{ column: 1 }} dataSource={subjects} loading={loading}
                locale={{ "emptyText": "空空如也" }}
                renderItem={s =>
                    <List.Item>
                        <SubjectCard subject={s} showOnDrawer />
                    </List.Item>
                }
            />
        </div>
    );
}