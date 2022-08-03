 import CartItem from "../components/CartItem"
 import { formatCurrency } from "../utilities/formatCurrency"
 import storeItems from "../data/items.json"
import { useShoppingCart } from "../context/shoppingCartContext"
import { Link } from "react-router-dom"
import "../pages/PagesCss.css"

function Cart() {
    const { cartItems } = useShoppingCart()
    
return(
    <div className="container">
        <div >
            <div>
                <h1>CART</h1>
            
                <div className="totalPrice">
            Total Price = {formatCurrency(
                  cartItems.reduce((acc, cartItem) => {
                    const item = storeItems.find((i) => i.id === cartItem.id)
                    return acc + (item?.price || 0) * cartItem.quantity
                  }, 0)
                )}
            </div>
            
            <div>
                <span>
                        <button className="purchaseButton"><Link to="/end" className="link">Complete Your Purchase</Link></button>
                </span>
                
                <span>
                        <button className="buyMoreButton"><Link to="/store" className="link">Buy More</Link></button>
                </span>
            </div>

            </div>
            <div className="wrapper">
            

                {cartItems.map((item)=> (
                    <CartItem key={item.id} {...item} />
                ))}
                
            </div>
           
        </div>
    </div>
)
} 

export default Cart


{/* <h2>
                    <button className="buyMoreButton"><Link to="/store" className="link">Keep Shopping</Link></button>
                </h2>
                <h2>
                    <button className="purchaseButton"><Link to="/end" className="link">Purchase</Link></button>
                </h2> */}