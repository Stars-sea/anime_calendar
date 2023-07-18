package bangumi_api

import (
	"encoding/json"
	"fmt"
	"io"
	"sync"

	"github.com/Stars-sea/anime_calendar/pkg/bangumi_api/network"
	"github.com/Stars-sea/anime_calendar/pkg/config"
)

const (
	calendar_url               = "https://api.bgm.tv/calendar"
	subject_detail_url         = "https://api.bgm.tv/v0/subjects/%d"
	user_info_url              = "https://api.bgm.tv/v0/users/%s"
	user_collections_url       = "https://api.bgm.tv/v0/users/%s/collections"
	user_single_collection_url = "https://api.bgm.tv/v0/users/%s/collections/%d"
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

// https://bangumi.github.io/api/#/%E6%9D%A1%E7%9B%AE/getCalendar
func (b *BangumiApi) Calendar() ([]*CalendarRoot, error) {
	data, err := network.GetContentFromCache(calendar_url, nil)
	if err != nil {
		return nil, err
	}

	var roots []*CalendarRoot
	json.Unmarshal(data, &roots)

	return roots, nil
}

// https://bangumi.github.io/api/#/%E6%9D%A1%E7%9B%AE/getCalendar
func (b *BangumiApi) GetTimeline(day uint) (*CalendarRoot, error) {
	roots, err := b.Calendar()
	if err != nil {
		return nil, err
	}

	singleday := roots[day-1]

	appconfig, err := config.LoadDefaultAppConfig()
	if err != nil || (!appconfig.FilterAnime && !appconfig.FilterNSFW) {
		return singleday, nil
	}

	syncgroup := &sync.WaitGroup{}
	username := appconfig.UserConfig.BangumiUsername
	collected := make(chan *Subject, 15)
	for _, subject := range singleday.Subjects {
		if appconfig.FilterNSFW && subject.NSFW {
			continue
		}
		if appconfig.FilterAnime {
			syncgroup.Add(1)
			go func(s *Subject) {
				defer syncgroup.Done()
				if b.IsUserCollected(username, s.ID) {
					collected <- s
				}
			}(subject)
		} else {
			collected <- subject
		}
	}

	syncgroup.Wait()
	close(collected)

	filtered := singleday.Subjects[:0]
	for subject := range collected {
		filtered = append(filtered, subject)
	}

	singleday.Subjects = filtered
	return singleday, nil
}

//
// ---------- Subject ----------

// https://bangumi.github.io/api/#/%E6%9D%A1%E7%9B%AE/getSubjectById
func (b *BangumiApi) GetFullSubjectInfo(s *Subject) (*Subject, error) {
	url := fmt.Sprintf(subject_detail_url, s.ID)
	data, err := network.GetContentAutomatically(url)
	if err != nil {
		return nil, err
	}

	err = unmarshalJson(data, s)
	if err != nil {
		return nil, err
	}
	return s, nil
}

//
// ---------- User ----------

// https://bangumi.github.io/api/#/%E7%94%A8%E6%88%B7/getUserByName
func (b *BangumiApi) GetUser(username string) (*User, error) {
	url := fmt.Sprintf(user_info_url, username)
	data, err := network.GetContentFromCache(url, nil)
	if err != nil {
		return nil, err
	}

	var user User
	err = unmarshalJson(data, &user)
	if err != nil {
		return nil, err
	}
	return &user, err
}

func (b *BangumiApi) ValidUserAndToken(username string, token *string) (*network.ApiError, error) {
	url := fmt.Sprintf(user_info_url, username)
	resp, err := network.Get(url, token)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode == 200 {
		return nil, nil
	}

	defer resp.Body.Close()

	var apiErr network.ApiError
	data, err := io.ReadAll(resp.Body)
	if err == nil {
		json.Unmarshal(data, &apiErr)
		return &apiErr, nil
	}
	return nil, err
}

// https://bangumi.github.io/api/#/%E6%94%B6%E8%97%8F/getUserCollectionsByUsername
func (b *BangumiApi) GetUserCollections(
	username string,
	subjectType byte,
	collectionType byte,
	limit uint, offset uint,
) (*UserCollectionQueryResult, error) {
	url := fmt.Sprintf(user_collections_url, username)

	arg := fmt.Sprintf("limit=%d&offset=%d", limit, offset)
	url = fmt.Sprintf("%s?%s", url, arg)

	args := []string{}
	if subjectType != 0 {
		arg := fmt.Sprintf("subject_type=%d", subjectType)
		args = append(args, arg)
	}
	if collectionType != 0 {
		arg := fmt.Sprintf("type=%d", collectionType)
		args = append(args, arg)
	}
	for _, arg := range args {
		url = fmt.Sprintf("%s&%s", url, arg)
	}

	data, err := network.GetContentAutomatically(url)
	if err != nil {
		return nil, err
	}

	var result *UserCollectionQueryResult
	err = unmarshalJson(data, result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// https://bangumi.github.io/api/#/%E6%94%B6%E8%97%8F/getUserCollection
func (b *BangumiApi) GetUserSingleCollection(username string, subject_id int) (*Subject, error) {
	url := fmt.Sprintf(user_single_collection_url, username, subject_id)
	data, err := network.GetContentAutomatically(url)
	if err != nil {
		return nil, err
	}

	var subject *Subject
	err = unmarshalJson(data, subject)
	if err != nil {
		return nil, err
	}
	return subject, nil
}

func (b *BangumiApi) IsUserCollected(username string, subject_id int) bool {
	url := fmt.Sprintf(user_single_collection_url, username, subject_id)
	key := fmt.Sprintf("METADATA [%s]", url)

	if result, ok := network.GetCache(key); ok {
		return bytes2Bool(result)
	}

	resp, err := network.GetAutomatically(url)

	result := err == nil && resp.StatusCode == 200
	network.SetCache(key, bool2Bytes(result))
	return result
}

//
// ---------- Tool Functions ----------

func unmarshalJson(data []byte, v any) error {
	err := json.Unmarshal(data, v)
	if err != nil {
		var apiErr network.ApiError
		if json.Unmarshal(data, &apiErr) == nil {
			return &apiErr
		}
		return err
	}
	return nil
}

// Go 不支持三元运算符, 操蛋
func bool2Bytes(value bool) []byte {
	if value {
		return []byte{1}
	}
	return []byte{0}
}

func bytes2Bool(value []byte) bool {
	if value[0] == 0 {
		return false
	}
	return true
}
