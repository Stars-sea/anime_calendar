import { ConfigProvider, theme } from "antd";
import { ThemeConfig } from "antd/es/config-provider";
import { createContext, useEffect, useState } from "react";
import { GetAppConfig, SaveAppConfig } from "../wailsjs/go/main/App";
import { config } from "../wailsjs/go/models";
import { WindowSetDarkTheme, WindowSetLightTheme } from "../wailsjs/runtime/runtime";
import CalendarPage from "./pages/CalendarPage";

interface AppConfigContextType {
    appconfig: config.AppConfig,
    updateConfig: (newConfig: config.AppConfig | object) => void
}

export const AppConfigContext = createContext<AppConfigContextType>({
    appconfig: new config.AppConfig(),
    updateConfig(newConfig) { },
});

export default () => {
    const [inited,      setInited]       = useState(false);
    const [appconfig,   updateAppConfig] = useState(new config.AppConfig());
    const [themeConfig, setThemeConfig]  = useState<ThemeConfig>({
        algorithm: theme.compactAlgorithm
    });

    const themeMedia = window.matchMedia("(prefers-color-scheme: light)");

    const updateTheme = () => {
        const themetype = (appconfig.app_theme == 0 && themeMedia.matches) || appconfig.app_theme == 1;
        setThemeConfig({
            algorithm: themetype
                ? theme.compactAlgorithm
                : theme.darkAlgorithm
        });

        document.body.style["background"] = themetype ? "#f2f3f5" : "#1e2025";

        if (themetype) {
            WindowSetLightTheme();
        } else {
            WindowSetDarkTheme();
        }
        console.log()
    }
    
    const updateConfig = (newConfig: object) => {
        if (newConfig instanceof config.AppConfig)
            updateAppConfig(newConfig);
        else 
            updateAppConfig(new config.AppConfig({...appconfig, ...newConfig}));
    }

    themeMedia.addEventListener("change", updateTheme);

    // Sync config file
    useEffect(() => { (async () => {
        updateAppConfig(await GetAppConfig());
        updateTheme();

        setInited(true);
    })() }, []);

    useEffect(() => {(async () => {
        if (inited) await SaveAppConfig(appconfig);
    })()}, [appconfig]);
    useEffect(updateTheme, [appconfig.app_theme]);
    
    return <AppConfigContext.Provider value={{appconfig, updateConfig}}>
        <ConfigProvider theme={themeConfig}>
            <CalendarPage />
        </ConfigProvider>
    </AppConfigContext.Provider>;
};
