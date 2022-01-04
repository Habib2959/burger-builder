import React from 'react';
import BreadTop from '../../../assets/images/top.png';
import BreadBottom from '../../../assets/images/bottom.png';
import Salad from '../../../assets/images/salad.png';
import Meat from '../../../assets/images/meat.png';
import Cheese from '../../../assets/images/cheese.png';
import './ingredients.css'

const Ingredients = props => {
    let ingredients = null;
    switch (props.type) {
        case "bread-top":
            ingredients = <div><img src={BreadTop} alt="BreadTop" /></div>
            break;
        case "bread-bottom":
            ingredients = <div><img src={BreadBottom} alt="BreadBottom" /></div>
            break;
        case "meat":
            ingredients = <div><img src={Meat} alt="Meat" /></div>
            break;
        case "salad":
            ingredients = <div><img src={Salad} alt="Meat" /></div>
            break;
        case "cheese":
            ingredients = <div><img src={Cheese} alt="Meat" /></div>
            break;
        default:
            ingredients = null;
    }
    return (
        <div className="ingredients">
            {ingredients}
        </div>
    )
}

export default Ingredients;