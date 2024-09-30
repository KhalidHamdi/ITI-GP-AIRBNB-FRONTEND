// src/utils/notifications.js

import { toast } from 'react-toastify';

export const notifySuccess = (message, onClose) => {
  toast.success(message, { onClose });
};

export const notifyError = (message) => {
  toast.error(message);
};
