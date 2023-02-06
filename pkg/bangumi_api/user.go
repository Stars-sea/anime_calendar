package bangumi_api

import "fmt"

type User struct {
	ID        int     `json:"id"`
	UserGroup int     `json:"user_group"`
	Username  string  `json:"username"`
	Nickname  string  `json:"nickname"`
	Sign      string  `json:"sign"`
	Avatar    *Avatar `json:"avatar"`
}

// ---------- UserGroup Type ----------
/*
1  = 管理员
2  = Bangumi 管理猿
3  = 天窗管理猿
4  = 禁言用户
5  = 禁止访问用户
8  = 人物管理猿
9  = 维基条目管理猿
10 = 用户
11 = 维基人
*/
var usergroupTypeNameMap = map[int]string{
	1:  "管理员",
	2:  "Bangumi 管理猿",
	3:  "天窗管理猿",
	4:  "禁言用户",
	5:  "禁止访问用户",
	8:  "人物管理猿",
	9:  "维基条目管理猿",
	10: "用户",
	11: "维基人",
}

func (u *User) GetUserGroupTypeName() (string, error) {
	if name, ok := collectionTypeNameMap[u.UserGroup]; ok {
		return name, nil
	}
	return "", fmt.Errorf("unknown user group type %d", u.UserGroup)
}
