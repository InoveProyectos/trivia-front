import { createContext } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });

const SocketProvider = ({ children }: any) => {
  const socket = io("http://localhost:4000");

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
