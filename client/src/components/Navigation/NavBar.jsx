import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, handleLogout, username }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className="brand-logo" as={Link} to="/">
          BLOGIFY
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto justify-content-center">
            {isLoggedIn ? (
              <Nav.Link as={Link} to="/UserDashboard">
                UserDashboard
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            )}
            <Nav.Link href="/AboutUs">About Us</Nav.Link>
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
                <Nav.Link as={Link} to={'/Profile'}>
                  {isLoggedIn ? `Signed in as: ${username}` : null}
                </Nav.Link>
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
