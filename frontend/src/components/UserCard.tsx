import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { bangumi_api } from "../../wailsjs/go/models";

export interface UserCardProps {
    user: bangumi_api.User,
    actions?: Array<React.ReactNode>
}

export default ({ user: {
    username,
    nickname,
    sign,
    avatar
}, actions }: UserCardProps) => (
    <Card hoverable actions={actions}>
        <Meta
            avatar={<Avatar src={avatar?.medium} />}
            title={<>
                {nickname}
                <span style={{fontSize: 13, color: "grey"}}> @{username}</span>
            </>}
            description={sign === "" ? "此人还没有签名" : sign}
        />
    </Card>
);
