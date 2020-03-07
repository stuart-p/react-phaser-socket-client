import React, { Component } from "react";
import "../App.css";
import { IonPhaser } from "@ion-phaser/react";
import { gameSceneConfig } from "../scenes/gameScene";
import Header from "./Header";
import Footer from "./Footer";

class Gamepage extends Component {
  state = {
    initialize: true,
    game: gameSceneConfig,
    endpoint: "localhost:8080",
    socket: null
  };

  render() {
    return (
      <div>
        <Header user={this.props.user} />
        <div className="App">
          <IonPhaser
            game={this.state.game}
            initialize={this.state.initialize}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Gamepage;
