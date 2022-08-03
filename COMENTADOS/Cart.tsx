import CartItem from "../components/CartItem"
import { formatCurrency } from "../utilities/formatCurrency"
import storeItems from "../data/items.json"
import { useShoppingCart } from "../context/shoppingCartContext"
import { Link } from "react-router-dom"



function Cart() {
   const { cartItems } = useShoppingCart()
   // pegando do estado global. Esse estado global VAI TER APENAS O ID E O QUANTITY dos produtos pedidos. Aí o map é pra renderizar um cart pra cada um  desses produtos pedidos, mas com as infos completas, além do id e quantity. *************
   // lembrando que esse estado global com id e quantity fica salvo no local storage. Então fica salvo lá e segue tudo após dar refresh. Continua fazendo um map no estado global porque tá salvo no local storage e aí renderiza um componente <CartItem> disso que tá salvo lá.
return(
   <div>
       <div>
           <h1>CART</h1>
           <h2><button><Link to="/store">Keep Shopping</Link></button></h2>
           <h2><button><Link to="/end">Purchase</Link></button></h2>
       </div>
       <div>
           {cartItems.map((item)=> (
               <CartItem key={item.id} {...item} />
           ))} {/* ESSE COMPONENTE NÃO É IGUAL AO "type CartItem". Lá eu digo a tipagem do estado cartItems. Aqui eu renderizo um card com os produtos pedidos e várias infos, não somente id e quantity*/}
       </div>
       <div>
       Total {formatCurrency(
             cartItems.reduce((acc, cartItem) => {
               const item = storeItems.find((i) => i.id === cartItem.id)
               return acc + (item?.price || 0) * cartItem.quantity
             }, 0)
           )} {/* vários comentários sobre esse reduce mais pra baixo. É bem importante e útil ter esse reduce pra essa função da soma total.*/}
       </div>
   </div>
)
} // as props passadas pro componente filho por meio do {...item} são id e quantity.

// SOBRE O REDUCE*****************************************
//vai rodar o estado global cartItems e todos os ids e quantities dos produtos já pedidos. 
//cartItem vai ser cada um desses produtos(id e quantity) dentro do estado global, vai ser a iteração do estado global  
//A const item é pra procurar no json um produto que tenha o mesmo id que o id o cartItem dentro do estado global.
// Ao achar um produto no json com id igual ao cartItem, vai pegar o price desse produto no json e vai multiplicar pela quantity do cartItem(lembrando que esse fica no estado global). Aí soma esse valor com o acumulador. Repetindo isso pela iteração do reduce, vai somar o valor de todos os produtos pedidos e suas quantidades pedidas.
// Lembrando que o price só pode pegar pelo json mesmo porque só tá lá. E o quantity só dá pra pegar na iteração do estado global porque só tá lá, não está no json.
// OBS: o ternário no item?.price || 0 é pra garantir que, caso não exista o item/produto no json, o preço vai ser 0 e assim esse produto(que não existe mais) não vai mudar em nada a soma.

export default Cart

// o cartItem deve estar dentro do estado global cartItems. a const item é pra pegar o produto todo dentro do json, aí vê um id de produto no json que seja igual ao id do cartItem