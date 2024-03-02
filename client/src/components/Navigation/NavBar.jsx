import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, handleLogout, username }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className="brand-logo" as={Link} to="/">
          BLOGIFY
        </Navbar.Brand>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            {isLoggedIn ? (
              <Nav.Link as={Link} to="/UserDashboard">
                UserDashboard
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            )}
            <Nav.Link href="#link">About Us</Nav.Link>
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/signIn">
                  Signin
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Navbar.Collapse>
                  <Navbar.Text>
                    Signed in as:
                    <Nav.Link as={Link} to={'/Profile'}>
                      {username}
                    </Nav.Link>
                  </Navbar.Text>
                </Navbar.Collapse>

                <Nav.Link onClick={handleLogout}>LogOut</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
