import { SettingOutlined } from "@ant-design/icons";
import { Button, Drawer, DrawerProps, Tabs, TabsProps, theme } from "antd";
import { createContext, useContext, useState } from "react";
import StickyBox from "react-sticky-box";
import "./CalendarPage.css";
import SettingsPage from "./SettingsPage";
import TimelinePage from "./TimelinePage";

const weekdaysInJs = Array.from("1234560");

const SettingsButton = () => {
    const { updateDrawerProps } = useContext(SideDrawerContext);

    const onClick = () => {
        updateDrawerProps({
            title: "Settings",
            children: <SettingsPage />
        })
    }

    return (
        <Button
            className="mx-4 my-0 "
            shape="circle"
            onClick={onClick}
            icon={<SettingOutlined />}
        />
    );
};

interface SideDrawerProps {
    updateDrawerProps: (props: DrawerProps) => void,
    closeDrawer: () => void
}

export const SideDrawerContext = createContext<SideDrawerProps>({ updateDrawerProps(_) { }, closeDrawer() { } });

export default () => {
    const [drawerOpen,  setDrawerOpen]  = useState(false);
    const [drawerProps, setDrawerProps] = useState<DrawerProps>();

    const closeDrawer = () => setDrawerOpen(false);
    const updateDrawerProps = (props: DrawerProps) => {
        setDrawerProps(props);
        setDrawerOpen(true);
    }

    const { token: { colorBgContainer } } = theme.useToken();
    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
        <StickyBox offsetTop={0} offsetBottom={20} className="z-0 -mb-4">
            <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
        </StickyBox>
    );

    const tabs = Array.from("一二三四五六日").map((w, i) => ({
        label: `周${w}`,
        key: weekdaysInJs[i],
        children: <TimelinePage weekday={i + 1} />
    }));

    return <SideDrawerContext.Provider value={{ updateDrawerProps, closeDrawer }}>
        <Tabs
            className="h-full"
            defaultActiveKey={new Date().getDay().toString()}
            centered destroyInactiveTabPane
            renderTabBar={renderTabBar}
            items={tabs}
            tabBarExtraContent={
                <SettingsButton />
            }
        />

        <Drawer
            placement="right" open={drawerOpen} closable={false} destroyOnClose
            onClose={() => setDrawerOpen(false)} {...drawerProps}
        />
    </SideDrawerContext.Provider>;
};
