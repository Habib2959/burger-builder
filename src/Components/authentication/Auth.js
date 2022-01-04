import React, { Component } from 'react';
import { Formik } from 'formik';
import './auth.css';
import { auth } from '../../Redux/authActionCreators';
import { connect } from 'react-redux';
import Logo from '../../assets/logo.png';
import Spinner from '../Spinner/Spinner';
import { Alert } from 'reactstrap';


const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authErrorMessage: state.authErrorMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, name, mode) => dispatch(auth(email, password, name, mode))
    }
}

class Auth extends Component {

    state = {
        mode: "Login"
    }
    toggleMode = () => {
        this.setState({
            mode: this.state.mode === "Login" ? "SignUp" : "Login"
        })
    }
    render() {

        let errorMessage = null;
        if (this.props.authErrorMessage) {
            errorMessage = <Alert color="danger" id="remove-alert">{this.props.authErrorMessage}</Alert>;
        }

        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />
        } else {
            form = (
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    onSubmit={(values, action) => {
                        this.props.auth(values.email, values.password, values.name, this.state.mode)
                        action.resetForm({
                            values: {
                                name: '',
                                email: '',
                                password: '',
                                confirmPassword: ''
                            }
                        })
                    }}
                    validate={values => {
                        const errors = {};

                        if (this.state.mode !== "Login") {
                            if (!values.name) {
                                errors.name = <div className="error-div">Requied</div>;
                            }
                        }
                        if (!values.email) {
                            errors.email = <div className="error-div">Requied</div>
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                            errors.email = <div className="error-div"> Invalid email address</div>;
                        }
                        if (!values.password) {
                            errors.password = <div className="error-div">Required</div>
                        } else if (values.password.length < 8) {
                            errors.password = <div className="error-div">Minimum 8 character</div>
                        }

                        if (this.state.mode !== "Login") {
                            if (!values.confirmPassword) {
                                errors.confirmPassword = <div className="error-div">Required</div>;
                            } else if (values.confirmPassword !== values.password) {
                                errors.confirmPassword = <div className="error-div">Password didn't match</div>;
                            }
                        }

                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div className="card-center">
                            <div className="card p-3" style={{ width: '22rem', boxShadow: "1px 1px 4px 0px #000" }}>
                                {errorMessage}
                                <div className="card-header d-flex align-items-center justify-content-between">
                                    <img src={Logo} alt="logo" width="50rem" />
                                    <h5>Burger Builder</h5>
                                </div>
                                <div className="mt-4">
                                    <form onSubmit={handleSubmit}>
                                        {this.state.mode !== "Login" ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    className='form-control'
                                                    placeholder="Enter your name"
                                                />
                                                {errors.name}
                                                <br />
                                            </div>
                                        ) : null}

                                        <input
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            className='form-control'
                                            placeholder="Enter your email"
                                        />
                                        {errors.email}
                                        <br />
                                        <input
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            className='form-control'
                                            placeholder="Enter your password"
                                        />
                                        {errors.password}
                                        <br />
                                        {this.state.mode !== "Login" ? (
                                            <div>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={values.confirmPassword}
                                                    onChange={handleChange}
                                                    className='form-control'
                                                    placeholder="Confirm your password"
                                                />
                                                {errors.confirmPassword}
                                                <br />
                                            </div>
                                        ) : null}

                                        <button type="submit" className="btn btn-success w-100" >{this.state.mode === "Login" ? "Login" : "Signup"}</button>
                                        <br />
                                        <div className="mt-2">
                                            <p>
                                                {this.state.mode === "Login" ? "Don't have an account? " : "I have an account. "}
                                                <span onClick={this.toggleMode} className="mode-change">
                                                    {this.state.mode === "Login" ? "Signup" : "Login"} here</span>
                                            </p>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    )}
                </Formik>
            )
        }
        return (
            <div>
                {form}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);