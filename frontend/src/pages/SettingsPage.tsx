import { Card, Divider, Form, Select, Switch } from "antd";
import { useContext } from "react";
import { AppConfigContext } from "../App";
import AppInfoSection from "../components/AppInfoSection";
import UserSettingSection from "../components/UserSettingSection";

export default () => {
    const { appconfig, updateConfig } = useContext(AppConfigContext);

    return <>
        <UserSettingSection />
        <Divider />

        <Card hoverable>
            <Form name="regular_config" initialValues={appconfig}>
                <Form.Item label="过滤未收藏番剧" name="filter_anime" valuePropName="checked">
                    <Switch onChange={c => updateConfig({ filter_anime: c })} />
                </Form.Item>
                <Form.Item label="应用程序主题" name="app_theme">
                    <Select onChange={v => updateConfig({ app_theme: v })}>
                        <Select.Option value={0}>自动</Select.Option>
                        <Select.Option value={1}>浅色</Select.Option>
                        <Select.Option value={2}>暗色</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Card>
        <Divider />

        <AppInfoSection />
    </>;
}
