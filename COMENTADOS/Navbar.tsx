import "../components/componentsCss.css"
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useShoppingCart } from "../context/shoppingCartContext";


const Navbar= () => {
    const {  cartQuantity } = useShoppingCart()
    // pegando  do estado global. Vai me dar o valor do quantity geral. Se tiver pelo menos 1 pedido, aí renderiza o ícone do carrinho de compras.
    return(
    
        <div className="navbar">
            <div className="left">
            <Link to="/" className="link">Home</Link>
            <Link to="/store" className="link">Store</Link>
            </div>
           {cartQuantity > 0 && (<Link to= "/cart">
                <div className="right"><div>
                    <button className="icon" >
                        <AddShoppingCartIcon />
                    </button></div>
                </div>
           </Link>)}
            
        </div>
        
    ) // o ternário que usei segue essa ideia: se o estado global cartQuantity(ele é o N° de pedidos feitos em qualquer um dos instrumentos) for maior que zero, quer dizer que pelo menos 1 pedido de algum instrumento foi feito. Aí renderiza o botão com ícone de carrinho de compras. Se não fizer pedido de nada, não renderiza o botão.
   
    // sobre o ícone: oq percebi sobre icon aqui: Procura o icon antes no site do mui, aí cola o link de importação aqui e adiciona o componente no return. Provável que não dê resultado. Aí então usa de novo o comando no terminal:  npm install @mui/material @emotion/react @emotion/styled
    
  }
  
  export default Navbar
