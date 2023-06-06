package network

import (
	"errors"
	"io"
	"net/http"
	"regexp"

	"github.com/Stars-sea/anime_calendar/pkg/config"
)

// See: https://github.com/bangumi/api/blob/master/docs-raw/user%20agent.md
const user_agent = "Stars-sea/anime_calendar"

//
// ---------- Request ----------

var tokenPattern = regexp.MustCompile("(?i)^[a-z0-9]{40}$")

func Get(url string, token *string) (*http.Response, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("User-Agent", user_agent)
	req.Header.Add("Accept", "application/json")

	// Add token
	if token != nil {
		if tokenPattern.MatchString(*token) {
			req.Header.Add("Authorization", "Bearer "+*token)
		} else {
			return nil, errors.New("Invaild token format")
		}
	}
	return http.DefaultClient.Do(req)
}

func GetAutomatically(url string) (*http.Response, error) {
	token := getToken()

	resp, err := Get(url, token)
	if token != nil && err != nil {
		resp, err = Get(url, nil)
	}

	if err != nil {
		return nil, err
	}
	return resp, nil
}

func GetContent(url string, token *string) ([]byte, error) {
	resp, err := Get(url, token)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	return io.ReadAll(resp.Body)
}

func GetContentFromCache(url string, token *string) ([]byte, error) {
	// Try to get cache
	if data, ok := GetCache(url); ok {
		return data, nil
	}

	data, err := GetContent(url, token)
	if err != nil {
		return nil, err
	}

	SetCache(url, data)
	return data, nil
}

func GetContentAutomatically(url string) ([]byte, error) {
	token := getToken()

	data, err := GetContentFromCache(url, token)
	if token != nil && err != nil {
		data, err = GetContentFromCache(url, nil)
	}

	if err != nil {
		return nil, err
	}
	return data, nil
}

func getToken() *string {
	appconfig, err := config.LoadDefaultAppConfig()
	if err != nil {
		return nil
	}
	return appconfig.BangumiToken
}
