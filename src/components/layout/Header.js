import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, Container } from "react-bootstrap";

class Header extends Component {
  onToggle = () => {
    const hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("is-active");
  };
  render() {
    return (
      <header>
        <Navbar bg="dark" variant="dark" expang="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand className="boldFont">Germiny</Navbar.Brand>
            </LinkContainer>
            <Nav className="ml-auto">
              <LinkContainer to="/#">
                <Nav.Link>
                  <i className="fas fa-home" /> Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link>
                  <i className="fas fa-user" /> Login
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Container>
        </Navbar>
      </header>
    );
  }
}
export default Header;
