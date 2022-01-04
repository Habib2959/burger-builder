import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { logout } from "../../Redux/authActionCreators";


const mapDispatchToProps = dispatch =>{
    return{
        logout: () => dispatch(logout())
    }
}

class Logout extends Component{
    componentDidMount(){
        this.props.logout()
    }
    render(){
        return(
            <Redirect to="/login"/>
        )
    }
}

export default connect(null, mapDispatchToProps) (Logout);
