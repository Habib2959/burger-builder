import React from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse } from 'reactstrap';
import Logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Component } from 'react';
import "./header.css"


const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId,
        userName: state.userName
    }
}




class Header extends Component {
    state = {
        isOpen: false,
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    render() {
        let links = null;
        if (this.props.token === null) {
            links = null
        } else {
            links = (
                <Navbar
                    style={{ backgroundColor: "#D70864" }} light expand="md">
                    <div className="container">
                        <NavbarBrand href="/">
                            <img src={Logo} alt="logo" width="60px" />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto">
                                <NavItem className="me-2">
                                    <NavLink to="/" style={{ color: "#fff", textDecoration: "none" }} >BurgerBuilder</NavLink>
                                </NavItem>
                                <NavItem className="me-2">
                                    <NavLink to="/orders" style={{ color: "#fff", textDecoration: "none" }} >Orders</NavLink>
                                </NavItem>
                                <NavItem className="me-2">
                                    <NavLink to="/logout" style={{ color: "#fff", textDecoration: "none" }}>Signout</NavLink>
                                </NavItem>
                                <NavItem >
                                    <div style={{ background: "#fff", padding: "5px", borderRadius: "5px" }}>
                                        <i className="bi bi-person-circle me-2" style={{ color: "#D70864" }}></i>
                                        <span style={{ color: "#D70864", textDecoration: "none", fontWeight: "500" }}>Signed in as {this.props.userName}</span>
                                    </div>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            )
        }
        return (
            <>
                {links}
            </>
        )
    }
}

export default connect(mapStateToProps)(Header);