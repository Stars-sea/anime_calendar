import { Avatar, Card, DrawerProps } from "antd";
import { CardSize } from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React from "react";
import { bangumi_api } from "../../wailsjs/go/models";
import ScoreBox from "./ScoreBox";
import "./SubjectCard.css";
import SubjectTitle from "./SubjectTitle";

export interface SubjectCardProps {
    subject: bangumi_api.Subject,
    image: "grid" | "small" | "medium" | "common" | "large",

    size: CardSize,
    showOnDrawer?: ShowOnDrawer
}

export type ShowOnDrawer = (content: DrawerProps) => void;

export default function SubjectCard({
    subject,
    image = "small",
    size = "default",
    showOnDrawer
}: SubjectCardProps) {
    function onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (showOnDrawer == undefined) return;
        showOnDrawer({
            title: <SubjectTitle subject={subject} showNameCN={true} />
        });
    }

    return (
        <Card size={size} onClick={onClick}>
            <Meta
                avatar={<Avatar shape="square" size="large" src={subject.images && subject.images[image]} />}
                title={<SubjectTitle showNameCN={false} subject={subject} />}
                description={<ScoreBox score={subject.rating} />}
            />
        </Card>
    );
};
