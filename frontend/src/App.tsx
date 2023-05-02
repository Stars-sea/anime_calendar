import { ConfigProvider, theme } from "antd";
import { ThemeConfig } from "antd/es/config-provider";
import { createContext, useEffect, useState } from "react";
import { GetAppConfig, SaveAppConfig } from "../wailsjs/go/main/App";
import { config } from "../wailsjs/go/models";
import CalendarPage from "./pages/CalendarPage";

export const AppConfigContext = createContext<config.AppConfig | undefined>(undefined); 

export default () => {
    const [appconfig, setAppconfig] = useState<config.AppConfig>();
    const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
        algorithm: theme.compactAlgorithm
    });

    function setTheme(themeType: boolean) {
        setThemeConfig({
            algorithm: themeType
                ? theme.compactAlgorithm
                : theme.darkAlgorithm
        });
    }

    const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
    themeMedia.addEventListener("change", e => setTheme(e.matches));

    useEffect(() => {
        setTimeout(() => setTheme(themeMedia.matches), 100);

        (async () => {
            setAppconfig(await GetAppConfig());
        })();
    }, []);

    useEffect(() => {(async () => {
        if (appconfig) SaveAppConfig(appconfig);
    })()}, [appconfig]);
    
    
    return <AppConfigContext.Provider value={appconfig}>
        <ConfigProvider theme={themeConfig}>
            <CalendarPage updateConfig={config => setAppconfig(config)} />
        </ConfigProvider>
    </AppConfigContext.Provider>;
};
