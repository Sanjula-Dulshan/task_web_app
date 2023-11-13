import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export const NOTIFICATION_TYPE = {
  SUCCESS: "success",
  ERROR: "danger",
  WARNING: "warning",
  INFO: "info",
};
export const notification = async (title, type) => {
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed

  Store.addNotification({
    title: title,
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    type: type,
    insert: "top",
    container: "top-right",

    dismiss: {
      duration: 2000,
      onScreen: true,
      showIcon: true,
    },
    isMobile: true,
    breakpoint: 768,
    width: isMobile ? "100%" : 400,
  });
};
