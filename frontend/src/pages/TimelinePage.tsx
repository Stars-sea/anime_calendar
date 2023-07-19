import { List } from "antd";
import { useContext, useEffect, useState } from "react";
import { GetTimeline } from "../../wailsjs/go/bangumi_api/BangumiApi";
import { bangumi_api } from "../../wailsjs/go/models";
import { AppConfigContext } from "../App";
import SubjectCard from "../components/SubjectCard";

export interface TimelinePageProps {
    weekday: number
}

export default ({ weekday }: TimelinePageProps) => {
    const { appconfig } = useContext(AppConfigContext);
    const [subjects, setSubjects] = useState<bangumi_api.Subject[]>();
    const [loading, setLoading] = useState<boolean>();

    useEffect(() => { (async () => {
        setLoading(true);
        setSubjects((await GetTimeline(weekday)).items);
        setLoading(false);
    })() }, [appconfig.filter_anime, appconfig.user_config, appconfig.filter_nsfw]);

    return (
        <List className="min-h-full pt-5"
              grid={{ column: 1 }} dataSource={subjects} loading={loading}
              locale={{ "emptyText": "啥也没有" }}
              renderItem={s =>
                <List.Item>
                    <SubjectCard className="mx-4 " subject={s} showOnDrawer />
                </List.Item>
        }/>
    );
}