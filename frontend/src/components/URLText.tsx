import { Tooltip } from "antd";
import { BrowserOpenURL } from "../../wailsjs/runtime/runtime";

export interface ClickableTitleProps {
    text: string,
    url: string,
    tooltip?: string,
    direct?: boolean
}

export default ({ text, url, tooltip, direct }: ClickableTitleProps) => (
    <Tooltip title={tooltip}>
        <span onClick={e => (direct || e.ctrlKey) && BrowserOpenURL(url)}
            style={{ "color": direct ? "#1668dc" : "	#ffffffd9"}}>
            {text}
        </span>
    </Tooltip>
);