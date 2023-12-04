import React, { createContext, useContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket;
}

const SocketContext: any = createContext<SocketContextProps | null>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
export const SocketProvider: any = (props: any) => {
  const socket = useMemo(() => io("172.16.15.48:8000"), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
