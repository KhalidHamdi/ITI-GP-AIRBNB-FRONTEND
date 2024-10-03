import React from "react";
import { useNotification } from "./NotificationContext";
import { toast } from "react-toastify";

const NotificationDisplay = () => {
  const { notifications } = useNotification();

  React.useEffect(() => {
    notifications.forEach((notification) => {
      toast.info(notification, {
        position: "top-right",
        autoClose: 5000,
      });
    });
  }, [notifications]);

  return null; // This component doesn’t render anything visually
};

export default NotificationDisplay;
