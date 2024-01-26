import { configureStore } from "@reduxjs/toolkit"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import blogsReducer from "./reducers/blogsReducer"
import errorReducer from "./reducers/errorReducer"
import loginReducer from "./reducers/loginReducer"
import notificationReducer from "./reducers/notificationReducer"
import usersReducer from "./reducers/usersReducer"

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    currentUser: loginReducer,
    users: usersReducer,
    notification: notificationReducer,
    error: errorReducer
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
