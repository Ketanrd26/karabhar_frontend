import { io } from "socket.io-client";

const url = process.env.REACT_APP_ADMIN_URL;

export const socket = io(url, {
  path: "/socket.io",
  withCredentials: true,
  autoConnect: true,
});
