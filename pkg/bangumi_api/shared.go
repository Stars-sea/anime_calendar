package bangumi_api

type Tag struct {
	Name  string `json:"name"`
	Count int    `json:"count"`
}

type Infobox struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type Weekday struct {
	EN string `json:"en"`
	CN string `json:"cn"`
	JA string `json:"ja"`
	ID int    `json:"id"`
}

type Images struct {
	Large  string `json:"large"`
	Common string `json:"common"`
	Medium string `json:"medium"`
	Small  string `json:"small"`
	Grid   string `json:"grid"`
}

type CalendarRoot struct {
	Weekday  *Weekday   `json:"weekday"`
	Subjects []*Subject `json:"items"`
}
