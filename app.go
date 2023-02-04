package main

import (
	"context"
	"time"

	"github.com/Stars-sea/anime_calendar/pkg/bangumi_api/network"
)

// App struct
type App struct {
	ctx context.Context

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

	a.cacheReleaseTicker = network.StartCacheReleaseTicker()
}

func (a *App) shutdown(ctx context.Context) {
	a.cacheReleaseTicker.Stop()
}
