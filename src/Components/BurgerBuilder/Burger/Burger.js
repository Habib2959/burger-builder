import React from 'react';
import Ingredients from '../Ingredients/Ingredients';
import './burger.css'

const Burger = props => {
    let ingredientArr = props.ingredients.map(item => {
        const amountArr = [...Array(item.amount).keys()];

        return amountArr.map(() => {
            return <Ingredients type={item.type} key={Math.random()} />
        })
    })
        .reduce((previousArr, currentArr) => {
            return previousArr.concat(currentArr)
        }, []);



    if (ingredientArr.length === 0) {
        ingredientArr= <h3 className="text-center">Please add some ingredients</h3>
    }
        return (
            <div className="Burger">
                <Ingredients type="bread-top" />
                {ingredientArr}
                <Ingredients type="bread-bottom" />
            </div>
        )

};

export default Burger;