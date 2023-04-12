import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './common-toast.css'

toast.configure();

const closeTime = 2000;

//For Error Notification
export const errorNotification = (message) => {
    toast.error(message, { autoClose: closeTime, className: "toast-message" })
}

//For Warning Notification
export const warningNotification = (message) => {
    toast.warning(message, { autoClose: closeTime, className: "toast-message" })
}

//For Success Notification
export const successNotification = (message) => {
    toast.success(message, { autoClose: closeTime, className: "toast-message" })
}

//For Info Notification
export const infoNotification = (message) => {
    toast.info(message, { autoClose: closeTime, className: "toast-message" })
}