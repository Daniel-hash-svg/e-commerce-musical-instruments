import { useShoppingCart } from "../context/shoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"

type StoreItemProps = {
    id: number
    instrument: string
    price: number
    imgUrl: string
} // São as props recebidas no Store.tsx. Como é typescript, precisa dar a "tipagem" das props recebidas aqui e passar essa const do lado das props na função abaixo.

export function StoreItem({ id, instrument, price, imgUrl }: StoreItemProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart() // Vem do estado global. Essas 4 funções são uma parte da  tipagem do shoppingCartContext. Esse shoppingCartContext foi passado como parâmetro no useContext, dentro da função useShoppingCart
    
    const quantity = getItemQuantity(id) // como já botei a tipagem desse parâmetro no arquivo em que fiz a função, aí não bota a tipagem aqui de novo.
   
    // IMPORTANTE ******* o valor do quantity é o que define o que renderiza no storeItem. Se for zero, renderiza o button "Add to Cart". Se não for zero, aí aparece o botão de + e -, além da mensagem: "valor do quantity" in cart e embaixo aparecer o button de remover.  Além disso, ao remover o produto da lista de já pedidos, o quantity desse produto no estado se torna zero, então volta a aparecer o button "Add to Cart".
 
    return(
        <div className="cardItem">
          <img src={imgUrl} className="cardImage"></img>
          <div>
            <span className="instrument">{instrument}</span>
            <span className="price">{formatCurrency(price)}</span>
            </div>
            <div>
                {quantity === 0 ? <button className="addButton" onClick={() => increaseCartQuantity(id)}>Add to Cart</button> : <div>
                 <div>
                     <button onClick={() => decreaseCartQuantity(id)}>-</button>
                     <span>{quantity} in cart</span>
                     <button onClick={() => increaseCartQuantity(id)}>+</button>
                 </div>
                 <button className="removeButton" onClick={() => removeFromCart(id)}>Remove</button>  
                </div>}
                
            </div>
        </div>
    )
} // essa div que tou fazendo vai ser o card de cada produto
