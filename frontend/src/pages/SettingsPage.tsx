import { Card, Divider, Space, Switch } from "antd";
import { useContext } from "react";
import { config } from "../../wailsjs/go/models";
import { AppConfigContext } from "../App";
import AppInfoSection from "../components/AppInfoSection";
import UserSettingSection from "../components/UserSettingSection";

interface SettingsPageProps {
    updateConfig: (config: config.AppConfig) => void
}

export default ({ updateConfig }: SettingsPageProps) => {
    const appconfig = useContext(AppConfigContext);

    const onChecked = async (filter_anime: boolean) => {
        if (!appconfig) throw "Config undefined";
        updateConfig({...appconfig, filter_anime});
    }

    return <>
        <UserSettingSection updateConfig={updateConfig} />
        <Divider />

        <Card hoverable>
            <Space>
                过滤未收藏番剧
                <Switch checked={appconfig?.filter_anime} onClick={onChecked} />
            </Space>
        </Card>
        <Divider />

        <AppInfoSection />
    </>;
}
