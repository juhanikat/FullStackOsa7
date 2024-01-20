import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    showNotification(state, action) {
      const content = action.payload
      return content
    },
    hideNotification(state, action) {
      return ""
    }
  }
})

export const setNotification = (content) => {
  return (dispatch) => {
    dispatch(showNotification(content))

    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
