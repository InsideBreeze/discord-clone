import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Link, Route } from "wouter";
import Channels from "./components/Channels";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Hero />
    </div>
  );
};

export default App;
