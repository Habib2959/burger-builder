import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { resetStore } from '../../../../Redux/actionCreators';
import Spinner from '../../../Spinner/Spinner';


const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        puchaseable: state.puchaseable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetStore: () => dispatch(resetStore())
    }
}


class Checkout extends Component {
    state = {
        values: {
            address: "",
            contact: "",
            payment: "Cash on delivery"
        },
        isLoading: false,
        modalOpen: false,
        modalMsg: ""
    }


    inputHandler = event => {
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name]: event.target.value
            }
        })
    }

    submitHandler = event => {
        this.setState({
            isLoading: true
        })

        let order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            date: new Date(),
        }

        axios.post("https://burger-builder-4c440-default-rtdb.firebaseio.com/orders.json", order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        modalOpen: true,
                        modalMsg: "Order has been placed"
                    })
                    this.props.resetStore();
                } else {
                    this.setState({
                        isLoading: false,
                        modalOpen: true,
                        modalMsg: "Something error happened"
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    modalOpen: true,
                    modalMsg: "Something error happened"
                })
            })
        event.preventDefault();
    }

    goBack = () => {
        this.props.history.goBack("/")
    }

    render() {
        const CheckoutPageData = (
            <div>
                <div className="checkout-price">
                    <h5>Total Price: {this.props.totalPrice} BDT</h5>
                </div>
                <Form className="form-checkout" onSubmit={(event) => this.submitHandler(event)}>
                    <FormGroup>
                        <Input type="textarea"
                            name="address"
                            placeholder="Enter Your Address"
                            onChange={(event) => this.inputHandler(event)} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text"
                            name="contact"
                            placeholder="Enter Your Number"
                            onChange={(event) => this.inputHandler(event)} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="select"
                            name="payment"
                            onChange={(event) => this.inputHandler(event)}>
                            <option>Cash on delivery</option>
                            <option>Bkash</option>
                        </Input>
                    </FormGroup>
                    <Button disabled={!this.props.puchaseable}>Place Order</Button>
                    <Button className="m-1" onClick={this.goBack}>Cancel Order</Button>
                </Form>
            </div>
        );
        return (
            <>
                {this.state.isLoading ? <Spinner /> : CheckoutPageData};
                <Modal isOpen={this.state.modalOpen}>
                    <ModalBody>
                        <h4>{this.state.modalMsg}</h4>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" onClick={this.goBack}>Okay</button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);