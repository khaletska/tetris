package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"

	db "01.kood.tech/git/ekhalets/tetris/db"
	"01.kood.tech/git/ekhalets/tetris/structs"
)

type Event struct { //create a struct to accept raw json data from the websocket connection
	Type    string          `json:"type"`
	Payload json.RawMessage `json:"payload"`
}
type EventHandler func(event Event, p *Player) error

const (
	EventNewScore      = "new_score"
	EventSendHighScore = "send_scores"
	EventRequestScores = "request_scores"
)

var ErrEventNotSupported = errors.New("this event type is not supported")

func (app *application) SendHighScoresHandler(event Event, p *Player) error {
	highScores, err := db.GetAllHighScores(app.DB) //get all scores from db
	if err != nil {
		fmt.Println("error getting highscores from database", err)
		os.Exit(1)
	}
	data, err := json.Marshal(highScores)
	if err != nil {
		return fmt.Errorf("failed to marshal highscore message: %v", err)
	}
	var outGoingEvent Event
	outGoingEvent.Payload = data
	outGoingEvent.Type = EventSendHighScore
	p.egress <- outGoingEvent // send the event to the players channel to be sent to the browser
	return nil
}

func (app *application) AddNewPlayerScoreHandler(event Event, p *Player) error {
	var highScore structs.HighScore
	err := json.Unmarshal(event.Payload, &highScore)
	if err != nil {
		fmt.Println(err)
	}
	if highScore.PlayerName != "" {
		previousScore, err := db.GetUserData(app.DB, highScore)
		if err != nil {
			log.Println("error querying for userdata", err)
		}
		if previousScore.PlayerName == highScore.PlayerName {
			if highScore.Score > previousScore.Score {
				err = db.UpdateHighScore(app.DB, highScore) //update data to db
				if err != nil {
					log.Println("error updating highscores", err)
				}
			}
			return nil
		}
		err = db.AddNewHighScore(app.DB, highScore) //add data to db
		if err != nil {
			log.Println("Error adding new score to db", err)
		}

	}
	return nil
}
