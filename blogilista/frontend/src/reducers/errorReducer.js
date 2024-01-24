import { createSlice } from "@reduxjs/toolkit"

const errorSlice = createSlice({
  name: "error",
  initialState: "",
  reducers: {
    showError(state, action) {
      const content = action.payload
      return content
    },
    hideError(state, action) {
      return ""
    }
  }
})

export const setError = (content) => {
  return (dispatch) => {
    dispatch(showError(content))

    setTimeout(() => {
      dispatch(hideError())
    }, 5000)
  }
}

const { showError, hideError } = errorSlice.actions
export default errorSlice.reducer
