import { useShoppingCart } from "../context/shoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import storeItems from "../data/items.json"
import "../components/componentsCss.css"

type CartItemProps = {
    id: number
    quantity: number
}



 function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } =useShoppingCart() 
  const instrumentProduct = storeItems.find((item)=> item.id === id)

  if(instrumentProduct == null) return null 

  return (
    <div className="container">
       <img src={instrumentProduct.imgUrl} className="image"></img>
       <div className="nameInstrument">
        {instrumentProduct.instrument} {quantity > 1 ? <span>{quantity}X</span>: null}
       </div>
       <div className="preco">
         {formatCurrency(instrumentProduct.price)}
       </div>
       <div className="currency">
       Total {formatCurrency(instrumentProduct.price * quantity)}
       </div>
       <button onClick={()=> removeFromCart(instrumentProduct.id)} className="remove">Remove</button>
    </div>
    
  )
} 

export default CartItem
