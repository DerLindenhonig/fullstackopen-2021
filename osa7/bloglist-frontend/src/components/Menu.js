import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { connect } from 'react-redux'
import { Button, Navbar, Nav, Container } from 'react-bootstrap'

const NavBar = (props) => {
  const handleLogout = () => {
    props.logout()
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Container className="mr-auto">
          <Navbar.Brand>BlogApp</Navbar.Brand>
          <Nav link>
            <Link to="/">Blogs</Link>
          </Nav>
          <Nav link>
            <Link to="/users">Users</Link>
          </Nav>
          <Nav link>
            <em>{props.user.name} logged in </em>
            <Button variant="light" onClick={handleLogout}>logout</Button>
          </Nav>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    notification: state.notification,
  }
}

const mapDispatchToProps = { logout }

const ConnectedNavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar)
export default ConnectedNavBar