import React, { useState} from 'react'
import { Card, CardBody, CardFooter, CardHeader, Button } from 'reactstrap'


const ItemMap = (props) => {
    return (
        <div className='d-flex flex-md-row'>
            <h5 className='m-auto' style={{ textAlign: "left" }}>{props.level} </h5>
            <Button className='btn btn-danger btn-sm m-1' onClick={props.remove}>Less</Button>
            <Button className='btn btn-success btn-sm m-1' onClick={props.add}>More</Button>
        </div>
    )
}

const Controls = (props) => {

    const [items] = useState([
        { level: "Salad", type: "salad" },
        { level: "Cheess", type: "cheess"},
        { level: "Meat", type: "meat" },
    ]) 

    return (
        <div className='container  ml-md-10' style={{
            textAlign: "center"
        }}>
            <Card style={{
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center"
            }}>
                <CardHeader style={{
                    backgroundColor: "#D70F64",
                    color: "white"
                }}>
                    <h4>Add Ingredient</h4></CardHeader>
                <CardBody>
                    {
                        items.map(item => {
                            return <ItemMap
                                level={item.level}
                                amount={item.amount}
                                type={item.type}
                                key={Math.random()}
                                add={() => props.ingredientAdded(item.type) }
                                remove={() => props.ingredientRemoved(item.type)}
                            />
                        })
                    }
                </CardBody>
                <CardFooter><h5>Price: {props.price} BDT</h5></CardFooter>
                    <Button disabled={props.purchasable} className='btn-suceess'onClick={props.togglebtn}>Order Now</Button>

            </Card>
        </div>
    )
}

export default Controls
