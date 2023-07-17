package config

type UserConfig struct {
	BangumiUsername string  `json:"bangumi_username"`
	BangumiToken    *string `json:"bangumi_token,omitempty"` // https://next.bgm.tv/demo/access-token
}
