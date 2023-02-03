package bangumi_api

import (
	"encoding/json"
	"fmt"
)

type BangumiApi struct {
}

func NewBangumiApi() *BangumiApi {
	return &BangumiApi{}
}

func (b *BangumiApi) ClearCache() {
	cache = make(map[string][]byte)
}

func (b *BangumiApi) Calendar() ([]*CalendarRoot, error) {
	data, err := GetContentFromCache(calendar_url)
	if err != nil {
		return nil, err
	}

	var roots []*CalendarRoot
	json.Unmarshal(data, &roots)

	return roots, nil
}

func (b *BangumiApi) GetSingelDayWithFullInfo(day uint) (*CalendarRoot, error) {
	roots, err := b.Calendar()
	if err != nil {
		return nil, err
	}

	root := roots[day-1]

	for _, subject := range root.Subjects {
		go b.GetFullSubjectInfo(subject)
	}

	return root, nil
}

func (b *BangumiApi) GetFullSubjectInfo(s *Subject) (*Subject, error) {
	url := fmt.Sprintf(subject_detail_url, s.ID)
	data, err := GetContentFromCache(url)
	if err != nil {
		return nil, err
	}

	json.Unmarshal(data, s)
	return s, nil
}
