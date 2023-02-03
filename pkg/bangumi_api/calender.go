package bangumi_api

import (
	"github.com/Stars-sea/anime_calendar/pkg/bangumi_api/shared"
)

type CalendarRoot struct {
	Weekday  shared.Weekday `json:"weekday"`
	Subjects []*Subject     `json:"items"`
}
