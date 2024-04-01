import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import chatReducer from "./reducers/chat.reducer";

const store = configureStore({
  reducer: {
    chats: chatReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({});
    if (process.env.NODE_ENV === "development") middleware.push(logger);
    return middleware;
  },
});

export default store;
