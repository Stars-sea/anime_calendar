import { Avatar, Card } from "antd";
import { CardSize } from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { useContext } from "react";
import { bangumi_api } from "../../wailsjs/go/models";
import { SideDrawerContext } from "../pages/CalendarPage";
import SubjectDetailPage from "../pages/SubjectDetailPage";
import ScoreBox from "./ScoreBox";
import SubjectTitle from "./SubjectTitle";

export interface SubjectCardProps {
    className?: string,
    subject: bangumi_api.Subject,
    image: "grid" | "small" | "medium" | "common" | "large",

    size: CardSize,
    showOnDrawer?: boolean
}

export default function SubjectCard({ className, subject, image, size, showOnDrawer }: SubjectCardProps) {
    const { updateDrawerProps } = useContext(SideDrawerContext);

    const onClick = () => {
        if (showOnDrawer)
            updateDrawerProps({
                title: <SubjectTitle subject={subject} showNameCN={true} />,
                children: <SubjectDetailPage subject={subject} />
            });
    }

    return (
        <Card className={className} size={size} onClick={onClick}>
            <Meta
                avatar={<Avatar shape="square" size="large" src={subject.images && subject.images[image]} />}
                title={<SubjectTitle subject={subject} />}
                description={<ScoreBox score={subject.rating} />}
            />
        </Card>
    );
};

SubjectCard.defaultProps = {
    image: "small",
    size: "default"
};
