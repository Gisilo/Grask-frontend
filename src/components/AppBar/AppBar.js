import React from 'react';

import { Navbar, Nav, NavDropdown, FormControl, Form, Button} from 'react-bootstrap/';

export class AppBar extends React.Component {

  render() {

    return (
      <Navbar bg="light" expand="lg" className="shadow">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button className="btn-primary">erere</Button>{' '}
          <Button variant="secondary">erere</Button>{' '}
          <Button variant="success">erere</Button>{' '}
          <Button variant="info">erere</Button>{' '}
          <Button variant="danger">erere</Button>{' '}
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );

  }
}