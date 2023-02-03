package bangumi_api

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
