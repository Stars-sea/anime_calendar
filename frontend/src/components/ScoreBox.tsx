import { Rate } from "antd";
import { bangumi_api } from "../../wailsjs/go/models";

export interface ScoreBoxProps {
    score?: bangumi_api.Score
}

export default ({ score }: ScoreBoxProps) => (
    <span>
        <Rate className="mr-4 text-sm" count={10}
              defaultValue={score?.score} disabled allowHalf />
        {score?.score}
    </span>
);
