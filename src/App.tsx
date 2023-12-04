import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LobbyScreen from "./screens/lobbyScreen";
import Room from "./screens/Room";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LobbyScreen />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
