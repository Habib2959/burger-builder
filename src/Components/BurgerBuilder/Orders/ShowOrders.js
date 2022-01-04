import React from 'react';
import {  Card, CardBody, CardHeader } from 'reactstrap';
import "./orders.css";


const ShowOrders = props => {
    const ingredientSummary = props.orderDetails.ingredients.map(items => {
        return (
            <div key={items.type} >
                <div className="text-capitalize ordered-items" >
                    <span className="me-2">{items.type}</span><span className="me-2">X</span><span className="me-2">{items.amount}</span>
                </div>
            </div>
        )
    })
    return (
        <>
            <div>
                <Card className="my-3 mx-auto order-summary">
                    <CardHeader><h6 className="d-inline">Order id: </h6>{props.orderDetails.id}</CardHeader>
                    <CardBody>
                        <h6>Address: {props.orderDetails.customer.address}</h6>
                        {ingredientSummary}
                        <h6>Total amount: {props.orderDetails.price}</h6>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default ShowOrders;