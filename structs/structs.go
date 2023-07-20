package structs

type HighScore struct {
	Position   int    `json:"position"`
	PlayerName string `json:"playerName"`
	Score      int    `json:"score"`
	GameTime   string `json:"gameTime"`
	Mode       string `json:"mode"`
	CreatedAt  string `json:"date"`
}
