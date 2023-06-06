import { Tooltip } from "antd";
import { BrowserOpenURL } from "../../wailsjs/runtime/runtime";

export interface URLTextProps {
    text: string,
    url: string,
    tooltip?: string,
    direct?: boolean,
    className?: string
}

export default ({ text, url, tooltip, direct, className }: URLTextProps) => (
    <Tooltip title={tooltip} className={className}>
        <span onClick={e => (direct || e.ctrlKey) && BrowserOpenURL(url)}
            style={{ "color": direct ? "#1668dc" : "#ffffffd9"}}>
            {text}
        </span>
    </Tooltip>
);
