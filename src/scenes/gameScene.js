import Phaser from "phaser";
import socketIOClient from "socket.io-client";

let playerNum;
let cursors;
let player;
let stars;
let score = 0;
let scoreText;
let bombs;
let gameOver = false;
let socket = null;
let currentPos;

let players = [];

socket = socketIOClient("localhost:8080");
socket.on("playerArrayUpdate", data => {
  players = data;
});
socket.on("connection verified", playerNumber => {
  playerNum = playerNumber;
});

function preload() {
  socket.emit("playerJoined", "hi");
  this.load.image("sky", "../assets/sky.png");
  this.load.spritesheet("dude", "../assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48
  });
}

function create() {
  player = this.physics.add.sprite(100, 450, "dude");
  player.setCollideWorldBounds(true);
  cursors = this.input.keyboard.createCursorKeys();
  socket.emit("player connected", { id: socket.id, x: 100, y: 450 });

  socket.on("player connected update", data => {
    let players_found = {};
    data.forEach(player => {
      if (players[player.id] === undefined && player.id !== socket.id) {
        let createPlayer = (x, y, image) => {
          let sprite = this.physics.add.sprite(x, y, image);
          return sprite;
        };
        let newPlayer = createPlayer(player.x, player.y, "dude");
        players[player.id] = newPlayer;
      }
      players_found[player.id] = true;

      if (player.id !== socket.id) {
        players[player.id].x = player.x;
        players[player.id].y = player.y;
      }
      players.forEach(player => {
        if (!players_found[player.id]) {
          players[player.id].destroy();
          delete players[player.id];
        }
      });
    });
  });
  //   this.anims.create({
  //     key: "left",
  //     frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
  //     frameRate: 10,
  //     repeat: -1
  //   });
  //   this.anims.create({
  //     key: "turn",
  //     frames: [{ key: "dude", frame: 4 }],
  //     frameRate: 20
  //   });

  //   this.anims.create({
  //     key: "right",
  //     frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
  //     frameRate: 10,
  //     repeat: -1
  //   });
}
function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    socket.emit("playerMovement", { id: socket.id, x: player.x, y: player.y });
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    socket.emit("playerMovement", { id: socket.id, x: player.x, y: player.y });
    player.anims.play("right", true);
  } else if (cursors.up.isDown) {
    player.setVelocityY(-160);
    socket.emit("playerMovement", { id: socket.id, x: player.x, y: player.y });
    player.anims.play("up", true);
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
    socket.emit("playerMovement", { id: socket.id, x: player.x, y: player.y });
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.setVelocityY(0);
    player.anims.play("turn");
  }
}
// else if (cursors.a.isDown) {
//   player.setVelocityX(-160);
//   socket.emit("playerMovement", { x: -1, y: 0 });
//   player.anims.play("left", true);
// } else if (cursors.d.isDown) {
//   player.setVelocityX(160);
//   socket.emit("playerMovement", { x: 1, y: 0 });
//   player.anims.play("right", true);
// } else if (cursors.w.isDown) {
//   player.setVelocityY(-160);
//   socket.emit("playerMovement", { x: 0, y: -1 });
//   player.anims.play("up", true);
// } else if (cursors.s.isDown) {
//   player.setVelocityY(160);
//   socket.emit("playerMovement", { x: 0, y: 1 });
//   player.anims.play("right", true);
// }

//TEMP ONLY - SERVER WILL EVENTUALLY DICTATE POSITION

const gameSceneConfig = {
  width: "90%",
  height: "3000",
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      fps: 30
    }
  },
  scene: { preload: preload, create: create, update: update }
};

export { gameSceneConfig };
