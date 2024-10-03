// src/components/chat/WebSocketContext.jsx
import React, { createContext, useEffect, useState } from "react";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connect = () => {
      const newSocket = new WebSocket(`ws://localhost:8000/ws/`);

      newSocket.onopen = () => {
        console.log("WebSocket connected");
      };

      newSocket.onclose = () => {
        console.log("WebSocket disconnected");
      };

      newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      // Store the socket in the state
      setSocket(newSocket);

      // Cleanup function to close the socket when the component unmounts
      return () => {
        newSocket.close();
      };
    };

    // Call the connect function
    const cleanup = connect();

    // Cleanup on component unmount
    return () => {
      if (cleanup) cleanup();
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
