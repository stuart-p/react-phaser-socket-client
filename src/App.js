import React from "react";
import "./App.css";
import { IonPhaser } from "@ion-phaser/react";
import { gameSceneConfig } from "./scenes/gameScene";
import socketIOClient from "socket.io-client";
class App extends React.Component {
  state = {
    initialize: true,
    game: gameSceneConfig,
    endpoint: "localhost:8080",
    socket: null
  };

  render() {
    return (
      <div className="App">
        <IonPhaser game={this.state.game} initialize={this.state.initialize} />
      </div>
    );
  }
}

export default App;
