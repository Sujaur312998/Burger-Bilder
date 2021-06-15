import React from 'react'

const Summary = (props) => {
    const ingredientSummery = props.ingredient.ingredient.map(item => {
        return (
            <li key={item.type}>
                <span style={{textTransform:"capitalize"}}>{item.type} : {item.amount} </span> 
            </li>

        )
    })

    return (
        <div>
            <ul>
                {ingredientSummery}
            </ul>
        </div>
    )
}

export default Summary
