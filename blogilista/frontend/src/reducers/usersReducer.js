import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/userService"

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

const { setUsers } = usersSlice.actions
export default usersSlice.reducer
