import React, { Component } from "react";
import { Link } from "@reach/router";

class Loginpage extends Component {
  state = {
    inputText: ""
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.inputText}
          ></input>
          {this.state.inputText.length > 0 ? (
            <Link to="/game">
              {" "}
              <button>Submit</button>
            </Link>
          ) : (
            <button>Submit</button>
          )}
        </form>
      </div>
    );
  }
  handleChange = event => {
    console.log(event.value);
    this.setState({ inputText: event.target.value });
  };
  handleSubmit = event => {
    this.props.setUser(this.state.inputText);
    this.setState({ inputText: "" });
  };
}

export default Loginpage;
