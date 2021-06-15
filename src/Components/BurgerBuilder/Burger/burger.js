import React from 'react'
import Ingredient from '../Ingredient/ingredient'
import './burger.css'

const Burger = (props) => {
    let ingredientArr = props.ingredients.ingredient.map(item => {
        const array = [...Array(item.amount).keys()]
        return array.map(() => {
            return <Ingredient type={item.type} key={Math.random()} />
        })
    })
    .reduce((arr, ele) => {
        return arr.concat(ele)
    }, []);
    if (ingredientArr.length===0){
        ingredientArr= <div><strong>Please add some ingredients!!!</strong></div>
    }

    return (
        <div className='Burger'>
            <Ingredient type="bread-top" />
            {ingredientArr}
            <Ingredient type="bread-bttom" />
        </div>
    )
}

export default Burger
