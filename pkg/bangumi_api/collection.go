package bangumi_api

import "fmt"

type UserCollectionSummary struct {
	OnHold  uint `json:"on_hold,omitempty"`
	Dropped uint `json:"dropped,omitempty"`
	Wish    uint `json:"wish,omitempty"`
	Collect uint `json:"collect,omitempty"`
	Doing   uint `json:"doing,omitempty"`
}

type UserCollectionQueryResult struct {
	Total  uint       `json:"total"`
	Limit  byte       `json:"limit"`  // Range [1, 50]
	Offset uint       `json:"offset"` // Subject count, not page index
	Data   []*Subject `json:"data"`
}

// ---------- Collection Type ----------
/*
1 = 想看
2 = 看过
3 = 在看
4 = 搁置
5 = 抛弃
*/

var collectionTypeNameMap = map[byte]string{
	1: "想看",
	2: "看过",
	3: "在看",
	4: "搁置",
	5: "抛弃",
}

func GetCollectionTypeName(ctype byte) (string, error) {
	if name, ok := collectionTypeNameMap[ctype]; ok {
		return name, nil
	}
	return "", fmt.Errorf("unknown collection type %d", ctype)
}
