package main

import (
	"bytes"
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"sync"

	db "01.kood.tech/git/ekhalets/tetris/db"
	"github.com/gorilla/websocket"
	_ "github.com/mattn/go-sqlite3"
)

var (
	port     = ":" + os.Getenv("PORT")
	upgrader = websocket.Upgrader{ //upgrades the connection to a websocket connection
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
)

type application struct {
	DB       *sql.DB
	Players  PlayerList
	mutex    sync.Mutex
	handlers map[string]EventHandler
}

func main() {
	app := &application{ // create an app so we can use methods to access data from from every funciton
		Players:  make(PlayerList),
		handlers: make(map[string]EventHandler),
	}
	app.setupEventHandler()
	app.setuUpDB()
	defer app.DB.Close()
	fmt.Println("Visit http://localhost:8080 to play the game!")
	fileServer := http.FileServer(http.Dir("./app"))
	http.Handle("/app/", http.StripPrefix("/app", fileServer))
	http.HandleFunc("/", app.tetris)
	http.HandleFunc("/ws", app.wsEndPoint)
	log.Fatal(http.ListenAndServe(port, nil))
}

func (app *application) tetris(w http.ResponseWriter, r *http.Request) { //index page handler
	template, err := template.ParseFiles("app/templates/index.html")
	if err != nil {
		http.Error(w, "500 Internal server error", http.StatusInternalServerError)
	}
	if r.URL.Path != "/" {
		http.Error(w, "404 Page not found", http.StatusNotFound)
		return
	}
	var temp bytes.Buffer
	err = template.Execute(&temp, "")
	if err != nil {
		http.Error(w, "500 Internal server error", http.StatusInternalServerError)
		return
	}
	w.Write(temp.Bytes())
}

func (app *application) wsEndPoint(w http.ResponseWriter, r *http.Request) { //websocket connection handler
	// upgrade this connection to a WebSocket
	// connection
	wsConn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("error establishing websocket connection ", err)
	}
	player := NewPlayer(wsConn, app)
	app.addPlayer(player)
	go player.ReadMessages()  //create goroutines to listen and write to the players browser
	go player.WriteMessages() //every player has its own goroutine
}

func (app *application) addPlayer(player *Player) { //when a new browser connects to the server, creates a new instance
	app.mutex.Lock()
	defer app.mutex.Unlock()
	app.Players[player] = true
}

func (app *application) removePlayer(player *Player) { //when the player disconnects, removes it from connections
	app.mutex.Lock()
	defer app.mutex.Unlock()
	if _, ok := app.Players[player]; ok {
		player.ws.Close()
		delete(app.Players, player)
	}
}

func (app *application) routeEvent(event Event, p *Player) error { //routes events recived from the browser, every event type has a function that will deal with it
	if handler, ok := app.handlers[event.Type]; ok {
		if err := handler(event, p); err != nil {
			return err
		}
		return nil
	} else {
		return ErrEventNotSupported
	}
}

func (app *application) setupEventHandler() { //hear we assign functions to handle different events
	app.handlers[EventRequestScores] = app.SendHighScoresHandler
	app.handlers[EventNewScore] = app.AddNewPlayerScoreHandler
}

func (app *application) setuUpDB() {
	database, err := db.OpenDatabase() //connect to db
	if err != nil {
		fmt.Println("error opening database", err)
		os.Exit(1)
	}
	app.DB = database
}
