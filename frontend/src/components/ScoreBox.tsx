import { Rate } from "antd";
import React from "react";
import { bangumi_api } from "../../wailsjs/go/models";

export interface ScoreBoxProps {
    score?: bangumi_api.Score
}

const ScoreBox: React.FC<ScoreBoxProps> = ({ score }) => (
    <span>
        <Rate
            count={10} style={{ fontSize: 14, marginRight: 16 }}
            value={score?.score} disabled allowHalf />
        {score?.score}
    </span>
);

export default ScoreBox;
