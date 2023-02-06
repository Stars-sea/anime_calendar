package bangumi_api

import (
	"encoding/json"
	"fmt"

	"github.com/Stars-sea/anime_calendar/pkg/bangumi_api/network"
)

const (
	calendar_url       = "https://api.bgm.tv/calendar"
	subject_detail_url = "https://api.bgm.tv/v0/subjects/%d"
	user_info_url      = "https://api.bgm.tv/v0/users/%s"
)

type BangumiApi struct {
}

func NewBangumiApi() *BangumiApi {
	return &BangumiApi{}
}

func (b *BangumiApi) ClearCache() {
	network.ClearCache()
}

//
// ---------- Calender & Timeline ----------

func (b *BangumiApi) Calendar() ([]*CalendarRoot, error) {
	data, err := network.GetContentFromCache(calendar_url)
	if err != nil {
		return nil, err
	}

	var roots []*CalendarRoot
	json.Unmarshal(data, &roots)

	return roots, nil
}

func (b *BangumiApi) GetTimeline(day uint) (*CalendarRoot, error) {
	roots, err := b.Calendar()
	if err != nil {
		return nil, err
	}

	return roots[day-1], nil
}

//
// ---------- Subject ----------

func (b *BangumiApi) GetFullSubjectInfo(s *Subject) (*Subject, error) {
	url := fmt.Sprintf(subject_detail_url, s.ID)
	data, err := network.GetContentFromCache(url)
	if err != nil {
		return nil, err
	}

	json.Unmarshal(data, s)
	return s, nil
}

//
// ---------- User ----------

func (b *BangumiApi) GetUser(username string) (*User, error) {
	url := fmt.Sprintf(user_info_url, username)
	data, err := network.GetContentFromCache(url)
	if err != nil {
		return nil, err
	}

	var user *User
	json.Unmarshal(data, user)
	return user, nil
}
