import React from 'react';
import { Component } from 'react';
import { fetchOrders } from '../../../Redux/actionCreators';
import { connect } from 'react-redux';
import ShowOrders from './ShowOrders';
import Spinner from '../../Spinner/Spinner'


const mapStateToProps = state =>{
    return{
        orders: state.orders,
        ordersLoading: state.ordersLoading,
        orderError: state.orderError
    }
}

 const mapDispatchToProps = dispatch =>{
     return {
        fetchOrders: () => dispatch(fetchOrders())
     }
 }

class Orders extends Component  {
    componentDidMount(){
        this.props.fetchOrders();
    }

    render(){
        let orders = null;
        if (this.props.orderError) {
            orders = <h3>failed to fetch orders from server</h3>
        }else{
            if (this.props.orders === undefined) {
                return <Spinner />
            }
            if (this.props.orders.length === 0) {
                orders = <h3>There is no order</h3>
            } else {
                orders =  this.props.orders.map(items => {
                    return <ShowOrders orderDetails ={items} key={items.id} />
                })
            }

        }

        return (
            <>
                {this.props.ordersLoading? <Spinner /> : orders}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Orders);