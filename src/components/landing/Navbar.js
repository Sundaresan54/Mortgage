import React from 'react';
import { Navbar, NavDropdown, Form, Button, Nav, FormControl } from 'react-bootstrap'

export default class Header extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark" expand="lg">
                    <Navbar.Brand href="/">Mortgage Loan</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="left-spacing"  >
                        <Form inline style={{ marginLeft: '200px' }}>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-light">Search</Button>
                        </Form>
                        <Nav className="ml-auto">

                            <Nav.Link href="#link">Services</Nav.Link>
                            <Nav.Link href="#link">Contact</Nav.Link>
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>

                        <Form inline className="loginBtn">
                            <Button className="mr-sm-2" variant="outline-light" >LogIn </Button>

                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                {this.props.children}
            </div>
        )
    }
}
