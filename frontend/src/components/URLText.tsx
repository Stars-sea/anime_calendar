import { ConfigProvider, Tooltip } from "antd";
import { useContext } from "react";
import { BrowserOpenURL } from "../../wailsjs/runtime/runtime";

export interface URLTextProps {
    text: string,
    url: string,
    tooltip?: string,
    direct?: boolean,
    className?: string
}

export default ({ text, url, tooltip, direct, className }: URLTextProps) => {
    // TODO: Find a better way to get theme.
    const { theme } = useContext(ConfigProvider.ConfigContext);
    
    return <Tooltip title={tooltip} className={className}>
        <span onClick={e => (direct || e.ctrlKey) && BrowserOpenURL(url)}
            style={{ "color": direct 
                ? theme?.token?.colorLink
                : theme?.token?.colorText
        }}>
            {text}
        </span>
    </Tooltip>
};
