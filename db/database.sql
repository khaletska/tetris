DROP TABLE scores;

SELECT * FROM scores;


CREATE TABLE IF NOT EXISTS scores (
        id 		INTEGER PRIMARY KEY AUTOINCREMENT,
        player_name 	TEXT NOT NULL,
        score           TEXT NOT NULL,
        game_time       TEXT NOT NULL,
        mode            TEXT NOT NULL, 
        created_at 	DATE DEFAULT CURRENT_DATE NOT NULL
);

INSERT INTO scores (player_name, score, game_time, mode) 
VALUES 
    ('Emma', 100, '10:30', 'basic'),
    ('Alexander', 80, '15:45', 'story'),
    ('Chloe', 95, '18:20', 'basic'),
    ('William', 120, '09:10', 'basic'),
    ('Sophia', 110, '14:30', 'story'),
    ('Benjamin', 75, '21:15', 'basic'),
    ('Mia', 85, '11:40', 'story'),
    ('Ethan', 130, '16:50', 'basic'),
    ('Olivia', 90, '19:05', 'story'),
    ('Daniel', 105, '12:25', 'basic');
