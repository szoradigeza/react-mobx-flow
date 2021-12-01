import "./styles.css";
import React, { Component } from "react";
import { observable, action, flow, flowResult } from "mobx";

class App extends React.Component {
  wait = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };

  myFlow = flow(function* (initial) {
    let a = initial; // this runs in action
    try {
      a = yield this.wait(100); // and this as well!
      yield this.wait(100);
      console.log("yield1");
      yield this.wait(4000);
      console.log("yield2");
      yield this.wait(2000);
      console.log("yield3");
    } catch (e) {
      a = e;
    }
    return a;
  });

  testflow;

  testFunction = async () => {
    this.testflow = this.myFlow(2);
    this.testflow.then((v) => {
      console.log(v);
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.testFunction}>start flow</button>
        <button onClick={() => this.testflow.cancel()}>Cancel</button>
      </div>
    );
  }
}

export default App;
