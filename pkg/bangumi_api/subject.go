package bangumi_api

import "fmt"

// See https://bangumi.github.io/api/
type Subject struct {
	ID            int             `json:"id"`
	URL           string          `json:"url"`
	Type          int             `json:"type"`
	Name          string          `json:"name"`
	NameCN        string          `json:"name_cn"`
	Summary       string          `json:"summary"`
	Nsfw          bool            `json:"nsfw"`
	Locked        bool            `json:"locked"`
	Date          string          `json:"date,omitempty"`
	Platform      string          `json:"platform"`
	Images        Images          `json:"images"`
	Infobox       []Infobox       `json:"infobox,omitempty"`
	Volumes       int             `json:"volumes"`
	Eps           int             `json:"eps"`
	TotalEpisodes int             `json:"total_episodes"`
	Rating        Score           `json:"rating"`
	Collection    UsersCollection `json:"collection"`
	Tags          []Tag           `json:"tags"`

	AirDate    string `json:"air_date,omitempty"`
	AirWeekday int    `json:"air_weekday,omitempty"`
	Rank       int    `json:"rank,omitempty"`
}

func (s *Subject) GetTypeName() (string, error) {
	if name, ok := subjectTypeNameMap[s.Type]; ok {
		return name, nil
	}

	return "", fmt.Errorf("invalid subject type %d", s.Type)
}

// ----------  Type ----------
// const (
// 	Book  = 1
// 	Anime = 2
// 	Music = 3
// 	Game  = 4
// 	Real  = 6
// )

var subjectTypeNameMap = map[int]string{
	1: "书籍",
	2: "动画",
	3: "音乐",
	4: "游戏",
	6: "三次元",
}
