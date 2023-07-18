package config

import (
	"encoding/json"
	"os"
	"path"
)

const (
	AppThemeAuto = iota
	AppThemeLight
	AppThemeDark
)

func GetDefaultConfigPath() (string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return "", err
	}
	return path.Join(pwd, "appconfig.json"), nil
}

type AppConfig struct {
	UserConfig  *UserConfig `json:"user_config,omitempty"`
	FilterAnime bool        `json:"filter_anime"`
	FilterNSFW  bool        `json:"filter_nsfw"`
	AppTheme    int         `json:"app_theme"`
}

func (c *AppConfig) Save(path string) error {
	file, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE, 666)
	if err != nil {
		return err
	}
	defer file.Close()

	file.Truncate(0)

	encoder := json.NewEncoder(file)
	err = encoder.Encode(c)
	return err
}

func (c *AppConfig) SaveToDefaultPath() error {
	path, err := GetDefaultConfigPath()
	if err != nil {
		return err
	}

	c.Save(path)
	return nil
}

func Load(path string) (*AppConfig, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var config AppConfig
	decoder := json.NewDecoder(file)
	err = decoder.Decode(&config)
	return &config, err
}

func LoadDefaultAppConfig() (*AppConfig, error) {
	path, err := GetDefaultConfigPath()
	if err != nil {
		return nil, err
	}

	conf, err := Load(path)
	if err != nil {
		return nil, err
	}
	return conf, nil
}
