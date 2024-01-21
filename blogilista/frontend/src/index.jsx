import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import notificationReducer from "./reducers/notificationReducer"
import blogsReducer from "./reducers/blogsReducer"

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)
