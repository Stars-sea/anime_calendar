import { Card, Divider, Space, Switch } from "antd";
import { useEffect, useState } from "react";
import { GetAppConfig, SetAppConfig } from "../../wailsjs/go/main/App";
import UserSettingSection from "../components/UserSettingSection";

export default () => {
    const [filterAnime, setFilterAnime] = useState(false)
    useEffect(() => {
        GetAppConfig().then(config => setFilterAnime(config.filter_anime));
    }, []);

    const onChecked = async (filter_anime: boolean) => {
        setFilterAnime(filter_anime);
        
        const originConfig = await GetAppConfig();
        const config = {...originConfig, filter_anime};
        await SetAppConfig(config);
    }

    return <>
        <UserSettingSection />
        <Divider />
        <Card hoverable>
            <Space>
                过滤未收藏番剧
                <Switch checked={filterAnime} onClick={onChecked} />
            </Space>
        </Card>
    </>;
}
