import { Tabs, TabsProps, theme } from "antd";
import React from "react";
import StickyBox from "react-sticky-box";
import TimelinePage from "./TimelinePage";

const weekdaysInJs = Array.from("1234560");

const CalendarPage: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
        <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1, marginBottom: "-16px" }}>
            <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
        </StickyBox>
    );

    const tabs = Array.from("一二三四五六日").map((w, i) => {
        return {
            label: `周${w}`,
            key: weekdaysInJs[i],
            children: <TimelinePage weekday={i + 1} />
        };
    });

    return (
        <Tabs
            defaultActiveKey={new Date().getDay().toString()}
            style={{ height: "100%" }}
            centered destroyInactiveTabPane
            renderTabBar={renderTabBar}
            items={tabs}
        />
    );
};

export default CalendarPage;
