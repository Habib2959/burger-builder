import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import Summary from "./Summary/Summary";
import { connect } from "react-redux";
import { addIngredients, removeIngredients, orderButtonToggle } from "../../Redux/actionCreators";

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        puchaseable: state.puchaseable
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addIngredients:(ingredientType)=> dispatch(addIngredients(ingredientType)),
        removeIngredients:(ingredientType)=> dispatch(removeIngredients(ingredientType)),
        orderButtonToggle: () => dispatch(orderButtonToggle())
    }
}

class BurgerBuilder extends Component {
    state = {
        modalOpen: false,
    }

    addIngredients = type => {
        this.props.addIngredients(type);
        this.props.orderButtonToggle();
    }
    removeIngredients = type => {
        this.props.removeIngredients(type);
        this.props.orderButtonToggle();
    }

    toggleModal = () =>{
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleCheckout = () =>{
        this.props.history.push("/checkout");
    }

    render() {
        return (
            <>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients} />
                    <Controls addIngredients={this.addIngredients}
                        removeIngredients={this.removeIngredients}
                        totalPrice={this.props.totalPrice} 
                        toggleModal={this.toggleModal} 
                        orderButtonToggle ={this.props.puchaseable}/>
                </div>
                <div>
                    <Modal isOpen={this.state.modalOpen}>
                        <ModalHeader></ModalHeader>
                        <ModalBody>
                            <h4>Total Price: {this.props.totalPrice}</h4>
                            <Summary ingredients={this.props.ingredients}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.handleCheckout}>Continue to checkout</Button>
                            <Button onClick={this.toggleModal} >Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (BurgerBuilder);