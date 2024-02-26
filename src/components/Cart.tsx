import useCart from "../hooks/useCart"
import CartLineItem from "./CartLineItem"
import { useState } from "react"

function Cart() {
  const [confirm,setConfirm] = useState(false);
  const {dispatch,REDUCER_ACTIONS,totalItems,totalPrice,cart} = useCart();

  const onSubmitOrder = ()=>{
    dispatch({type:REDUCER_ACTIONS.SUBMIT})
    setConfirm(true);
  }

  const pageContent = confirm
   ? <h2>Thank you for your order.</h2>
   : <><h2 className="offscreen">Cart</h2>
     <ul>
        {cart.map(item=>{
            return <CartLineItem key={item.sku}
             item={item}
             dispatch={dispatch}
             REDUCER_ACTIONS={REDUCER_ACTIONS}
             />
        })}
     </ul>
     <div className="cart__totals">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <button onClick={onSubmitOrder} className="cart__submit" disabled={!totalItems}>Place Order</button>
     </div>
    </>
      const content = (
        <main className="main main--cart">
            {pageContent}
        </main>
      )
  return content
}

export default Cart