import React, { Component } from "react";
import "./App.css";
import { IonPhaser } from "@ion-phaser/react";
import { gameSceneConfig } from "./scenes/gameScene";
import socketIOClient from "socket.io-client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Router } from "@reach/router";
import Loginpage from "./components/Loginpage";
import Gamepage from "./components/Gamepage";

class App extends React.Component {
  state = {
    user: undefined
  };

  render() {
    return (
      <div>
        <Router>
          <Loginpage path="/" setUser={this.setUser} />
          <Gamepage path="/game" user={this.state.user} />
        </Router>
      </div>
    );
  }
  setUser = user => {
    if (user.length > 0) {
      this.setState({ user: user });
    }
  };
}

export default App;
