 import CartItem from "../components/CartItem"
 import { formatCurrency } from "../utilities/formatCurrency"
 import storeItems from "../data/items.json"
import { useShoppingCart } from "../context/shoppingCartContext"
import { Link } from "react-router-dom"
import "../pages/PagesCss.css"
import Navbar from "../components/Navbar"

function Cart() {
    const { cartItems } = useShoppingCart()
    
return(
    <div className="cart">
        <Navbar />


            <div className="twoButtons">
                <button className="buyMoreButton"><Link to="/store" className="link">Buy More</Link></button>
                <button className="purchaseButton"><Link to="/end" className="link">Complete Your Purchase</Link></button>
            </div>
            <div className="wrapper">
                    {cartItems.map((item)=> (
                        <CartItem key={item.id} {...item} />
                    ))}
            </div>
            
            <div className="totalPrice">
                Total Price = {formatCurrency(
                      cartItems.reduce((acc, cartItem) => {
                        const item = storeItems.find((i) => i.id === cartItem.id)
                        return acc + (item?.price || 0) * cartItem.quantity
                      }, 0)
                    )}
            </div>

        
            
        

    </div>
  )
} 

export default Cart


