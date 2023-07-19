import { Rate } from "antd";
import { bangumi_api } from "../../wailsjs/go/models";

export interface ScoreBoxProps {
    score?: bangumi_api.Score
}

export default ({ score }: ScoreBoxProps) =>
    <div className="score-box">
        <Rate className="mr-4 text-sm" count={10} value={score?.score} disabled allowHalf />
        <span className="text-sm leading-5 align-middle text-zinc-500">{score?.score}</span>
    </div>
