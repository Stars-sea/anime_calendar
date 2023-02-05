import { Rate } from "antd";
import React from "react";
import { bangumi_api } from "../../wailsjs/go/models";

export interface ScoreBoxProps {
    score?: bangumi_api.Score
}

const ScoreBox: React.FC<ScoreBoxProps> = ({ score }) => (
    <span>
        {/* TODO: 解决 Rate 组件一整行上下跳动问题 */}
        <Rate count={10} style={{ fontSize: 14, marginRight: 16 }}
              defaultValue={score?.score} disabled allowHalf />
        {score?.score}
    </span>
);

export default ScoreBox;
