const LoginForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input
          id="username"
          type="text"
          name="Username"
          value={props.username}
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>
        password: <input
          id="password"
          type="text"
          name="Password"
          value={props.password}
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )
}

export default LoginForm