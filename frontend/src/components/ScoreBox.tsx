import { Rate } from "antd";
import { bangumi_api } from "../../wailsjs/go/models";

export interface ScoreBoxProps {
    score: bangumi_api.Score
}

export function ScoreBox(props: ScoreBoxProps) {
    return (
        <span>
            <Rate
                count={10} style={{fontSize: 14, marginRight: 16}}
                value={props.score.score} disabled allowHalf />
            {props.score.score}
        </span>
    )
}