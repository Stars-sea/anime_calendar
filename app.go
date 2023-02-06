package main

import (
	"context"
	"log"
	"os"
	"path"
	"time"

	"github.com/Stars-sea/anime_calendar/pkg/bangumi_api/network"
)

// App struct
type App struct {
	ctx context.Context

	configPath string
	appconfig  *AppConfig

	cacheReleaseTicker *time.Ticker
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	pwd, err := os.Getwd()
	if err != nil {
		log.Fatalln(err)
	}
	a.configPath = path.Join(pwd, "appconfig.json")

	if _, err := os.Stat(a.configPath); err == nil {
		a.appconfig, err = LoadConfigFromFile(a.configPath)
		if err != nil {
			log.Fatalln(err)
		}
	}

	a.cacheReleaseTicker = network.StartCacheReleaseTicker()
}

func (a *App) shutdown(ctx context.Context) {
	a.cacheReleaseTicker.Stop()
}

func (a *App) GetAppConfig() *AppConfig {
	return a.appconfig
}

func (a *App) SetAppConfig(config *AppConfig) error {
	a.appconfig = config
	return a.appconfig.Save(a.configPath)
}
