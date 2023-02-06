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

type Avatar struct {
	Large  string `json:"large"`
	Medium string `json:"medium"`
	Small  string `json:"small"`
}

type CalendarRoot struct {
	Weekday  *Weekday   `json:"weekday"`
	Subjects []*Subject `json:"items"`
}

type Score struct {
	Total int        `json:"total"`
	Count ScoreCount `json:"count"`
	Score float64    `json:"score"`
}

type ScoreCount struct {
	Star1  int `json:"1"`
	Star2  int `json:"2"`
	Star3  int `json:"3"`
	Star4  int `json:"4"`
	Star5  int `json:"5"`
	Star6  int `json:"6"`
	Star7  int `json:"7"`
	Star8  int `json:"8"`
	Star9  int `json:"9"`
	Star10 int `json:"10"`
}
