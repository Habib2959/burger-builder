import React from 'react';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Header from './Header/Header';
import { Route, Redirect, Switch } from 'react-router';
import Orders from './BurgerBuilder/Orders/Orders';
import Checkout from './BurgerBuilder/Orders/Checkout/Checkout';
import Auth from './authentication/Auth';
import { connect } from 'react-redux';
import { Component } from 'react';
import { authCheck } from '../Redux/authActionCreators';
import Logout from './authentication/Logout';

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck())
    }
}

class Main extends Component {
    componentDidMount() {
        this.props.authCheck()
    }
    render() {
        let routes = null;
        if (this.props.token === null) {
            routes = (
                <Switch >
                    <Route path="/login" exact component={Auth} />
                    <Redirect to="/login" />
                </Switch>
            )
        } else {
            routes = (
                <Switch>
                    <Route path="/" exact component={BurgerBuilder} />
                    <Route path="/orders" exact component={Orders} />
                    <Route path="/checkout" exact component={Checkout} />
                    <Route path="/logout" exact component={Logout} />
                    <Redirect to="/" />
                </Switch>
            )
        }

        return (
            <>
                <Header />
                <div className="container">
                    {routes}
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);