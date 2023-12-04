import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/socketProvider";
import { useNavigate } from "react-router-dom";
import "./LobbyScreen.css"; // Import your custom CSS file

const LobbyScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const socket: any = useSocket();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
      console.log({ email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data: any) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
      console.log(email, room);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="lobby-container">
      <h1 className="lobby-title">Lobby Screen</h1>
      <form className="lobby-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">RoomNo</label>
        <input
          type="text"
          id="room"
          name="room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button className="join-button" type="submit">
          Join
        </button>
      </form>
    </div>
  );
};

export default LobbyScreen;
