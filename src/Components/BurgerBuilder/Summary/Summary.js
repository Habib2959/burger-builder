import React from 'react';

const Summary = props => {
   const ingredientsList= props.ingredients.map(items =>{
        return <li key={items.type}> {items.type} : {items.amount} </li>
    })
    return(
        <div>
            <ul>
                {ingredientsList}
            </ul>
        </div>
    )
}

export default Summary;