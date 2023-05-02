package main

import (
	"context"
	"time"

	"github.com/Stars-sea/anime_calendar/pkg/bangumi_api/network"
	"github.com/Stars-sea/anime_calendar/pkg/config"
)

// App struct
type App struct {
	ctx context.Context

	cacheReleaseTicker *time.Ticker
}

var app *App

// GetApp gets or creates a new App application struct
func GetApp() *App {
	if app == nil {
		app = &App{}
	}
	return app
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.cacheReleaseTicker = network.StartCacheReleaseTicker()
}

func (a *App) shutdown(ctx context.Context) {
	a.cacheReleaseTicker.Stop()
}

func (a *App) GetAppConfig() (*config.AppConfig, error) {
	return config.LoadDefaultAppConfig()
}

func (a *App) SaveAppConfig(config *config.AppConfig) error {
	return config.SaveToDefaultPath()
}
