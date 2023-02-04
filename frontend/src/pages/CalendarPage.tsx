import { Tabs } from "antd";
import React from "react";
import { TimelinePage } from "./TimelinePage";

export const CalendarPage: React.FC = () => (
    <Tabs
        defaultActiveKey={(new Date().getDay() - 1).toString()}
        centered
        items={
            Array.from("一二三四五六日").map((w, i) => {
                return {
                    label: `周${w}`,
                    key: i.toString(),
                    children: <TimelinePage weekday={i + 1} />
                };
            })
        }
    />
);