import { Tooltip } from "antd";
import { BrowserOpenURL } from "../../wailsjs/runtime/runtime";

export interface ClickableTitleProps {
    text: string,
    tooltip: string,
    url: string
}

export default ({ text, tooltip, url }: ClickableTitleProps) => (
    <Tooltip title={tooltip}>
        <span onClick={e => e.ctrlKey && BrowserOpenURL(url)}>
            {text}
        </span>
    </Tooltip>
);