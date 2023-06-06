import { Rate } from "antd";
import { bangumi_api } from "../../wailsjs/go/models";

export interface ScoreBoxProps {
    score?: bangumi_api.Score
}

export default ({ score }: ScoreBoxProps) => (
    <span>
        {/* TODO: 解决 Rate 组件一整行上下跳动问题 */}
        <Rate className="mr-4 text-sm" count={10}
              defaultValue={score?.score} disabled allowHalf />
        {score?.score}
    </span>
);
