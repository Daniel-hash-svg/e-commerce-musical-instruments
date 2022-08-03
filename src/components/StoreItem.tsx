import "../components/componentsCss.css"
import { useShoppingCart } from "../context/shoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"


type StoreItemProps = {
    id: number
    instrument: string
    price: number
    imgUrl: string
} 

export function StoreItem({ id, instrument, price, imgUrl }: StoreItemProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart() 
    
    const quantity = getItemQuantity(id) 
 
    return(
        <div className="cardItem">
          <img src={imgUrl} className="cardImage"></img>
          <div className="nameAndPrice">
            <span className="instrument">{instrument}</span>
            <span className="price">{formatCurrency(price)}</span>
            </div>
            <div>
                {quantity === 0 ? <button className="addButton" onClick={() => increaseCartQuantity(id)}>Add to Cart</button> : <div>
                 <div className="plusAnd-Buttons">
                     <button onClick={() => decreaseCartQuantity(id)} className="decreaseButton">-</button>
                     <span className="quantityInCart">{quantity} In Cart</span>
                     <button onClick={() => increaseCartQuantity(id)} className="increaseButton">+</button>
                 </div>
                 <button className="removeButton" onClick={() => removeFromCart(id)}>Remove</button>  
                </div>}
                
            </div>
        </div>
    )
}
