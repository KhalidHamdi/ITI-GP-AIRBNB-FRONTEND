import React, { createContext, useContext, useState, useEffect } from "react";
import notificationSound from "../../assets/sound/chatnotification.wav";

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    setNotifications((prev) => [...prev, message]);
    const audio = new Audio(notificationSound);
    audio
      .play()
      .catch((error) => console.error("Audio playback error:", error));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
