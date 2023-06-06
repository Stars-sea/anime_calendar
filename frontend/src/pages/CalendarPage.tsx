import { SettingOutlined } from "@ant-design/icons";
import { Button, Drawer, DrawerProps, Tabs, TabsProps, theme } from "antd";
import { useState } from "react";
import StickyBox from "react-sticky-box";
import { config } from "../../wailsjs/go/models";
import "./CalendarPage.css";
import SettingsPage from "./SettingsPage";
import TimelinePage from "./TimelinePage";

const weekdaysInJs = Array.from("1234560");

interface SettingsButtonProps {
    showOnDrawer: (props: DrawerProps) => void,
    updateConfig: (config: config.AppConfig) => void
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ showOnDrawer, updateConfig }) => {
    function onClick() {
        showOnDrawer({
            title: "Settings",
            children: <SettingsPage updateConfig={updateConfig} />
        })
    }

    return (
        <Button
            className="mx-4 my-0 "
            shape="circle"
            onClick={e => onClick()}
            icon={<SettingOutlined />}
        />
    );
};


interface CalendarPageProps {
    updateConfig: (config: config.AppConfig) => void
}

export default ({ updateConfig }: CalendarPageProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerProps, setDrawerProps] = useState<DrawerProps>();

    function showDrawer(props: DrawerProps) {
        setDrawerProps(props);
        setDrawerOpen(true);
    }

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
        <StickyBox offsetTop={0} offsetBottom={20} className="z-0 -mb-4">
            <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
        </StickyBox>
    );

    const tabs = Array.from("一二三四五六日").map((w, i) => {
        return {
            label: `周${w}`,
            key: weekdaysInJs[i],
            children: <TimelinePage showOnDrawer={showDrawer} weekday={i + 1} />
        };
    });

    return <>
        <Tabs
            className="h-full"
            defaultActiveKey={new Date().getDay().toString()}
            centered destroyInactiveTabPane
            renderTabBar={renderTabBar}
            items={tabs}
            tabBarExtraContent={
                <SettingsButton showOnDrawer={showDrawer} updateConfig={updateConfig} />
            }
        />

        <Drawer
            placement="right" open={drawerOpen} closable={false} destroyOnClose
            onClose={() => setDrawerOpen(false)} {...drawerProps}
        />
    </>;
};
