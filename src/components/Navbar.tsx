import "../components/componentsCss.css"
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useShoppingCart } from "../context/shoppingCartContext";


const Navbar= () => {
    const {  cartQuantity } = useShoppingCart()
   
    return(
    
        <div className="navbar">
            <div className="left">
            <Link to="/" className="link">Home</Link>
            <Link to="/store" className="link">Store</Link>
            <span className="logo">DANIEL'S FICTIONAL MUSIC STORE</span>
            </div>
            
           {cartQuantity > 0 && (<Link to= "/cart">
                <div className="right"><div>
                    <button className="icon" >
                        <AddShoppingCartIcon />
                    </button></div>
                </div>
           </Link>)}
            
        </div>
        
    ) 
    
  }
  
  export default Navbar
