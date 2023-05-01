import { FileTextOutlined, GithubOutlined, SyncOutlined } from "@ant-design/icons";
import { Card, Space, Tag } from "antd";
import { version } from "../../package.json";
import "./AppInfoSection.css";
import URLText from "./URLText";

const RepoTitle = () => <>
    <GithubOutlined />

    <span className="title">
        <URLText url="https://github.com/Stars-sea" text="Stars-sea" direct />
        <span className="slash"> / </span>
        <URLText url="https://github.com/Stars-sea/anime_calendar" text="anime_calendar" direct />
    </span>
</>;

const Description = () => <Space direction="vertical">
    <p>使用 Wails 构建的新番提醒程序</p>
    <p>
        <FileTextOutlined />
        <span> MIT license</span>
        <br />
        <SyncOutlined />
        <span> v{version}</span>
    </p>
    <p>
        <Tag color="#00add8">Golang</Tag>
        <Tag color="#3178c6">Typescript</Tag>
    </p>
</Space>;

export default () => (
    <Card hoverable>
        <Card.Meta title={<RepoTitle />} description={<Description />} />
    </Card>
)