import { useShoppingCart } from "../context/shoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import storeItems from "../data/items.json"


type CartItemProps = {
    id: number
    quantity: number
} // as props recebidas do componente pai(Cart.tsx).

// o componente pai Cart.tsx tem o estado global itemCarts com id e quantity dos produtos pedidos. Agora precisa usar o id recebido no parâmetro pra achar os produtos no json e trazer o valor todo dos produtos que foram pedidos, além do id e quantity.

 function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } =useShoppingCart() // pegando do estado global pra remover dessa lista de produtos pedidos.
  const instrument = storeItems.find((item)=> item.id === id)
  // é pra ser o instrumento do json que tenha o id igual ao do parâmetro

  if(instrument == null) return null // se não achar nenhum instrumento, retorna null

// se achar , aí retorna o componente com as infos do instrumento, que será renderizado no  Cart.tsx
  return (
    <div>
       <img src={instrument.imgUrl}></img>
       <div>
        {instrument.instrument} {quantity > 1 ? <span>{quantity}X</span>: null}
       </div>
       <div>
         {formatCurrency(instrument.price)}
       </div>
       <div>
        {formatCurrency(instrument.price * quantity)}
       </div>
       <button onClick={()=> removeFromCart(instrument.id)}>Remover</button>
    </div>
    
  ) // lembrando que o valor do quantity vem por props.O quantity não tá no arquivo json.
} // o quantity deve aparecer do lado do nome, mas somente se for pedido mais de 1 vez. Se foi pedido só 1 vez, não precisa colocar nada e já fica implícito que foi pedido uma vez.
// clicando pra remover, a função do estado global(que tá escrita no shoppingCartContext.tsx) retorna o id e o quantity de todos produtos pedidos, menos o desse produto específico.Ou seja, esse produto sai do estado global itemCarts então o map no Cart.tsx não vai renderizar mais as infos desse produto porque ele  foi excluído.

export default CartItem


// até então aqui só tem o id e quantity do produto, mas precisa pegar ele todo.