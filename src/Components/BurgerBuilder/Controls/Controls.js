import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return{
        ingredients: state.ingredients,
    }
} 

const controls = [
    { label: 'Salad', type: 'salad', price: '20 tk' },
    { label: 'Cheese', type: 'cheese', price: '30 tk'},
    { label: 'Meat', type: 'meat', price: '40 tk'},
];

const BuildControl = props => {
    return (
        <div className="d-flex justify-content-between align-items-center">
            <div><span style={{color: '#D70864'}}>{props.label}: </span><span>{props.individualPrice}</span></div>
            <div>
                <button disabled={props.ingredientsAmount <=0} className="btn btn-danger m-1" onClick={props.removeIngredients}>Less</button>
                <button className="btn btn-success m-1" onClick={props.addIngredients}>More</button>
            </div>
        </div>
    )
}

const Controls = props => {
    return (
        <div className="container ml-md-5 text-center mt-4">
            <Card>
                <CardHeader
                style ={{backgroundColor: "#D70864", color:"#fff"}}><h4>ADD INGREDIENTS</h4></CardHeader>
                <CardBody>
                    {
                        controls.map((items , index)=> {
                            return <BuildControl
                                label={items.label}
                                type={items.type}
                                individualPrice ={items.price}
                                key={Math.random()}
                                addIngredients={() => props.addIngredients(items.type)}
                                removeIngredients={() => props.removeIngredients(items.type)} 
                                ingredientsAmount={props.ingredients[index].amount} />
                        })
                    }
                </CardBody>
                <CardFooter><h4>Price: {props.totalPrice} BDT</h4></CardFooter>
                <Button disabled={!props.orderButtonToggle} onClick={props.toggleModal}>ORDER NOW</Button>
            </Card>
        </div>
    )
}

export default connect(mapStateToProps) (Controls);