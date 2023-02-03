import { Avatar, Card } from "antd";
import { CardSize } from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { bangumi_api } from "../../wailsjs/go/models";
import { ScoreBox } from "./ScoreBox";
import "./SubjectCard.css";
import { SubjectTitle } from "./SubjectTitle";

export interface SubjectCardProps {
    subject: bangumi_api.Subject,
    image: "grid" | "small" | "medium" | "common" | "large",

    size: CardSize
}

export function SubjectCard(props: SubjectCardProps) {
    return (
        <Card size={props.size} >
            <Meta
                avatar={<Avatar shape="square" size="large" src={props.subject.images[props.image]} />}
                title={<SubjectTitle subject={props.subject} />}
                description={<ScoreBox score={props.subject.rating} />}
            />
        </Card>
    );
}
