import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import "./Header.css"

export default function header() {
  return (
    <>
        <Navbar bg='primary' variant='dark'>
         <Container>
            <Navbar.Brand to='/'>Student Management System</Navbar.Brand>
            <Nav className = "ml-auto"> 
                 <Nav.Link as={Link} to="/" className="nav-link">Students</Nav.Link>
                 <Nav.Link as={Link} to="/student" className="nav-link">Post Student</Nav.Link>
            </Nav>
         </Container>
         </Navbar>
    </>
  )
}
