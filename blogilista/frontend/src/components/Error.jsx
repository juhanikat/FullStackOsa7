import React from "react"
import notificationReducer, {
  showNotification
} from "../reducers/notificationReducer"
import { useSelector } from "react-redux"

const Error = () => {
  const error = useSelector((state) => state.error)

  return <div className="error">{error}</div>
}

export default Error
