package db

import (
	"database/sql"
	"time"

	"01.kood.tech/git/ekhalets/tetris/structs"
	_ "github.com/mattn/go-sqlite3"
)

func OpenDatabase() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "db/database.db")
	if err != nil {
		return nil, err
	}

	return db, nil
}

func GetAllHighScores(db *sql.DB) ([]structs.HighScore, error) {
	var highScores = []structs.HighScore{}
	query := `SELECT * FROM scores ORDER BY score DESC`
	rows, err := db.Query(query)
	if err != nil {
		return highScores, err
	}
	position := 0
	previousScore := 0
	defer rows.Close()
	for rows.Next() {
		var id int
		var highScore structs.HighScore
		var time time.Time
		err = rows.Scan(&id, &highScore.PlayerName, &highScore.Score, &highScore.GameTime, &highScore.Mode, &time)
		if err != nil {
			return highScores, err
		}
		if previousScore != highScore.Score {
			position++
		}
		previousScore = highScore.Score

		highScore.Position = position
		highScore.CreatedAt = time.Format("2006-01-02 15:04:05")
		highScores = append(highScores, highScore)
	}

	return highScores, nil
}

func AddNewHighScore(db *sql.DB, highScore structs.HighScore) error {
	query := `INSERT INTO scores(player_name, score, game_time, mode) VALUES ( ?, ?, ?, ?)`
	_, err := db.Exec(query, highScore.PlayerName, highScore.Score, highScore.GameTime, highScore.Mode)
	if err != nil {
		return err
	}
	return nil
}

func UpdateHighScore(db *sql.DB, highScore structs.HighScore) error {
	query := `UPDATE scores SET score = ?, game_time = ?  WHERE player_name = ?`
	_, err := db.Exec(query, highScore.Score, highScore.GameTime, highScore.PlayerName)
	if err != nil {
		return err
	}
	return nil
}

func GetUserData(db *sql.DB, highScore structs.HighScore) (structs.HighScore, error) {
	query := `SELECT * FROM scores WHERE player_name = ? and mode = ? `
	rows, err := db.Query(query, highScore.PlayerName, highScore.Mode)
	var previousScore structs.HighScore

	if err != nil {
		return previousScore, err
	}
	for rows.Next() {
		var id int
		var time time.Time

		err = rows.Scan(&id, &previousScore.PlayerName, &previousScore.Score, &previousScore.GameTime, &previousScore.Mode, &time)
		if err != nil {
			return highScore, err
		}
	}
	return previousScore, nil
}
