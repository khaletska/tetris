package main

import (
	"encoding/json"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

type PlayerList map[*Player]bool
type Player struct {
	ws      *websocket.Conn
	egress  chan Event
	manager *application
}

var (
	pongWait     = 10 * time.Second
	pingInterval = (pongWait * 9) / 10
)

func NewPlayer(conn *websocket.Conn, app *application) *Player {
	return &Player{
		ws:      conn,
		manager: app,
		egress:  make(chan Event),
	}
}
func (p *Player) ReadMessages() {
	defer func() {
		p.manager.removePlayer(p)
	}()
	// p.ws.SetReadLimit(1024)
	if err := p.ws.SetReadDeadline(time.Now().Add(pongWait)); err != nil {
		log.Println(err)
		return
	}
	p.ws.SetPongHandler(p.PongHandler)
	for {
		_, payload, err := p.ws.ReadMessage() //reads the message from the client
		if err != nil {                       //if there is an error with the message coming
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error reading message: %v", err)
			}
			break
		}
		var request Event
		if err := json.Unmarshal(payload, &request); err != nil {
			log.Printf("error marshalling message: %v", err)
			break
		}
		if err := p.manager.routeEvent(request, p); err != nil { //routes the event to a certain function
			log.Println("Error handling message: ", err)
		}
	}
}
func (p *Player) WriteMessages() {
	ticker := time.NewTicker(pingInterval) //creates a ticker that sends a ping to the server every 10 seconds
	defer func() {
		ticker.Stop()
		p.manager.removePlayer(p)
	}()
	for {
		select {
		case message, ok := <-p.egress: //if there is a message in the egress channel, sends it to the browser
			if !ok {
				if err := p.ws.WriteMessage(websocket.CloseMessage, nil); err != nil {
					log.Println("connection closed", err)
				}
				return
			}
			data, err := json.Marshal(message)
			if err != nil {
				log.Println(err)
				return
			}
			if err := p.ws.WriteMessage(websocket.TextMessage, data); err != nil {
				log.Println(err)
			}
			log.Println("sent message")
		case <-ticker.C:
			//Sends a ping every 10 seconds, to keep the connection alive
			if err := p.ws.WriteMessage(websocket.PingMessage, []byte{}); err != nil {
				log.Println("writemsg: ", err)
				return
			}
		}
	}
}

// every ping is responded by a pong and this function sets connection deadline
func (p *Player) PongHandler(pongMessage string) error {
	return p.ws.SetReadDeadline(time.Now().Add(pongWait))
}
