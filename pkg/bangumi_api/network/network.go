package network

import (
	"io"
	"net/http"
	"regexp"

	"github.com/Stars-sea/anime_calendar/pkg/config"
)

// See: https://github.com/bangumi/api/blob/master/docs-raw/user%20agent.md
const user_agent = "Stars-sea/anime_calendar"

//
// ---------- Request ----------

var tokenPattern = regexp.MustCompile("(?i)^[A-Za-z0-9]+$")

func Get(url string, withToken bool) (*http.Response, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("User-Agent", user_agent)
	req.Header.Add("Accept", "application/json")

	if !withToken {
		return http.DefaultClient.Do(req)
	}

	// Add token
	appconfig, err := config.LoadDefaultAppConfig()
	if err == nil && tokenPattern.MatchString(appconfig.BangumiToken) {
		req.Header.Add("Authorization", "Bearer "+appconfig.BangumiToken)
	}
	return http.DefaultClient.Do(req)
}

func GetWithoutToken(url string) (*http.Response, error) {
	return Get(url, false)
}

func GetContent(url string, withToken bool) ([]byte, error) {
	resp, err := Get(url, withToken)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	return io.ReadAll(resp.Body)
}

func GetContentWithoutToken(url string) ([]byte, error) {
	return GetContent(url, false)
}

func GetContentFromCache(url string, withToken bool) ([]byte, error) {
	// Try to get cache
	if data, ok := GetCache(url); ok {
		return data, nil
	}

	data, err := GetContent(url, withToken)
	if err != nil {
		return nil, err
	}

	SetCache(url, data)
	return data, nil
}

func GetContentAutomatically(url string) ([]byte, error) {
	data, err := GetContentFromCache(url, true)
	if err != nil {
		data, err = GetContentFromCache(url, false)
	}

	if err != nil {
		return nil, err
	}
	return data, nil
}
