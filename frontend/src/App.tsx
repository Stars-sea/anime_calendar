import { ConfigProvider, theme } from "antd";
import { ThemeConfig } from "antd/es/config-provider";
import React, { useState } from "react";
import CalendarPage from "./pages/CalendarPage";

const App: React.FC = () => {
    const [inited, setInited] = useState(false);
    const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
        algorithm: theme.defaultAlgorithm
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

    if (!inited) {
        setTimeout(() => setTheme(themeMedia.matches), 100);
        setInited(true);
    }
    
    return (
        <ConfigProvider theme={themeConfig}>
            <CalendarPage />
        </ConfigProvider>
    );
};

export default App;
