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
                    <Navbar.Brand href="#home">Mortgage Loan</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="left-spacing"  >
                        <Nav className="mr-auto">
                            <Nav.Link className='space' href="#home">Home</Nav.Link>
                            <Nav.Link className='space' href="#link">Services</Nav.Link>
                            <Nav.Link className='space' href="#link">Tax</Nav.Link>
                            <Nav.Link className='space' href="#link">About</Nav.Link>
                            <Nav.Link className='space' href="#link">ContactUs</Nav.Link>
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>

                        <Form inline className="loginBtn">
                            <Button className="mr-sm-2" variant="outline-dark" >LogIn </Button>

                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                {this.props.children}
            </div>
        )
    }
}
