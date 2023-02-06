package bangumi_api

import "fmt"

type UsersCollection struct {
	OnHold  int `json:"on_hold,omitempty"`
	Dropped int `json:"dropped,omitempty"`
	Wish    int `json:"wish,omitempty"`
	Collect int `json:"collect,omitempty"`
	Doing   int `json:"doing,omitempty"`
}

// ---------- Collection Type ----------
/*
1 = 想看
2 = 看过
3 = 在看
4 = 搁置
5 = 抛弃
*/

var collectionTypeNameMap = map[int]string{
	1: "想看",
	2: "看过",
	3: "在看",
	4: "搁置",
	5: "抛弃",
}

func GetCollectionTypeName(ctype int) (string, error) {
	if name, ok := collectionTypeNameMap[ctype]; ok {
		return name, nil
	}
	return "", fmt.Errorf("unknown collection type %d", ctype)
}
