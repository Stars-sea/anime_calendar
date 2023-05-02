package main

import (
	"embed"

	"github.com/Stars-sea/anime_calendar/pkg/bangumi_api"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := GetApp()
	api := bangumi_api.NewBangumiApi()
	helper := bangumi_api.NewStructureHelper()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "Anime Calendar",
		Width:  750,
		Height: 420,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		OnShutdown:       app.shutdown,
		Bind: []interface{}{
			app,
			api,
			helper,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
