import { Rate } from "antd";
import { shared } from "../../wailsjs/go/models";

export interface ScoreBoxProps {
    score: shared.Score
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