import React from 'react'
import BreadTop from '../../../Assets/images/top.png'
import salad from '../../../Assets/images/salad.png'
import cheese from '../../../Assets/images/cheese.png'
import meat from '../../../Assets/images/meat.png'
import BreadBottom from '../../../Assets/images/bottom.png'
import './ingredient.css'

const Ingredient = (props) => {

    let ingredient=null;
    switch(props.type){
        case "bread-top":
            ingredient=(<div><img src={BreadTop} alt='Top Bread'/></div>)
            break
        case "bread-bttom":
            ingredient=(<div><img src={BreadBottom} alt='Top Bread'/></div>)
            break
        case "salad":
            ingredient=(<div><img src={salad} alt='Top Bread'/></div>)
            break
        case "cheess":
            ingredient=(<div><img src={cheese} alt='Top Bread'/></div>)
            break
        case "meat":
            ingredient=(<div><img src={meat} alt='Top Bread'/></div>)
            break
        default : return null
    }

    return (
        <div className="Ingredient">
            {ingredient}
        </div>
    )
}

export default Ingredient
