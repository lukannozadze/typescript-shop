import { ChangeEvent, ReactElement,memo } from "react"
import { CartItemType } from "../context/CartProvider"
import { ReducerAction } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"

type propsType = {
    item:CartItemType,
    dispatch:React.Dispatch<ReducerAction>
    REDUCER_ACTIONS:ReducerActionType
}
function CartLineItem({item,dispatch,REDUCER_ACTIONS}:propsType):ReactElement {
    const img:string = new URL(`../images/${item.sku}.jpg`,import.meta.url).href

    const lineTotal: number = (item.quantity * item.price);

    const highestQuantity:number = 20 > item.quantity? 20:item.quantity

    const optionValues:number[] = [...Array(highestQuantity).keys()].map(i=>i+1)

    const options:ReactElement[] = optionValues.map(val=>{
        return <option key={`opt${val}`} value={val}>{val}</option>
    })

    const onChangeQuantity = (e:ChangeEvent<HTMLSelectElement>) =>{
        dispatch({
            type:REDUCER_ACTIONS.QUANTITY,
            payload:{...item,quantity:Number(e.target.value)}
        })
    }

    const onRemoveFromCart = () =>{
        dispatch({
            type:REDUCER_ACTIONS.REMOVE,
            payload: item
        })
    }
    const content = (
        <li className="cart__item">
            <img src={img} alt={item.name} className="cart__img" />
            <div aria-label="Item Name">{item.name}</div>
            <div aria-label="Pricer Per Item">{new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(item.price)}</div>

            <label htmlFor="itemQty" className="offscreen">
                Item Quantity
            </label>
            <select name="itemQty" id="itemQty" className="cart__select" value={item.quantity} aria-label="Item Quantity" onChange={onChangeQuantity}>{options}</select>
            <div className="cart__item-subtotal" aria-label="Line-Item Subtotal">
                {new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(lineTotal)}
            </div>
            <button className="cart_button"
              aria-label="Remove Item From Cart"
              title="Remove Item From Cart"
              onClick={(onRemoveFromCart)}
            >
                 &#10006;
                             </button>
        </li>
    )
  return content
}

function areItemsEqual ({item:prevItem}:propsType,{item:nextItem}:propsType){
    return Object.keys(prevItem).every(key =>{
        return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
    })
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem,areItemsEqual)
export default MemoizedCartLineItem