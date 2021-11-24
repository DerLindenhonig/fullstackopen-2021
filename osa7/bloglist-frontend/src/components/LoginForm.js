import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useField } from '../hooks/index.js'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const Login = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  const handleLogin = (event) => {
    event.preventDefault()

    props.login({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <div>
      <h2>log in</h2>
      <Form onSubmit={handleLogin}>
        <div>
          username:
          <input {...username} />
        </div>
        <div>
          password:
          <input {...password} />
        </div>
        <Button type="submit">log in</Button>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    notification: state.notification,
  }
}

const mapDispatchToProps = { setNotification, login }

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)
export default ConnectedLogin