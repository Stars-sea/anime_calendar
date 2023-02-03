package bangumi_api

import (
	"io"
	"net/http"
)

const (
	calendar_url       = "https://api.bgm.tv/calendar"
	subject_detail_url = "https://api.bgm.tv/v0/subjects/%d"
)

// See: https://github.com/bangumi/api/blob/master/docs-raw/user%20agent.md
const user_agent = "Stars-sea/anime_calendar"

// Cache
var cache = make(map[string][]byte)

//
// ---------- Request ----------

func Get(url string) (*http.Response, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("User-Agent", user_agent)
	req.Header.Add("Accept", "application/json")

	return http.DefaultClient.Do(req)
}

func GetContent(url string) ([]byte, error) {
	resp, err := Get(url)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	return io.ReadAll(resp.Body)
}

func GetContentFromCache(url string) ([]byte, error) {
	if data, ok := cache[url]; ok {
		return data, nil
	}

	data, err := GetContent(url)
	if err != nil {
		return nil, err
	}

	cache[url] = data
	return data, nil
}
