package main

import (
	"encoding/json"
	"os"
)

type AppConfig struct {
	BangumiUsername string `json:"bangumi_username"`
	FilterAnime     bool   `json:"filter_anime"`
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

func LoadConfigFromFile(path string) (*AppConfig, error) {
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
