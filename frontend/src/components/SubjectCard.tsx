import { Avatar, Card } from "antd";
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

    size: CardSize
}

const SubjectCard: React.FC<SubjectCardProps> = ({
    subject,
    image = "small",
    size = "default"
}: SubjectCardProps) => (
    <Card size={size} >
        <Meta
            avatar={<Avatar shape="square" size="large" src={subject.images && subject.images[image]} />}
            title={<SubjectTitle subject={subject} />}
            description={<ScoreBox score={subject.rating} />}
        />
    </Card>
);

export default SubjectCard;
