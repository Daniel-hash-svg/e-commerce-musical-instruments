import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"

// EXTREMAMENTE COMENTADO. Só comento muito por questões de estudo e revisão. Em ambiente profissional o ideal é ter o menor número de linhas possível. Esse foi o arquivo com lógicas.

type ShoppingCartProviderProps = {
    children: ReactNode
} // reactNode é o tipo que se dá pra propriedade children no react.

type CartItem ={ // ISSO AQUI NÃO É IGUAL O COMPONENTE "CartItem" NA PASTA COMPONENTES****************************************************** lá eu renderizo um card tem que mais informações do produto
    id: number
    quantity: number
} // é a tipagem do estado cartItems. O estado cartItems vai ter um array de CartItem e cada CartItem vai ser um objeto com o id de cada produto pedido e uma quantity.

// topa essa tipagem do ShoppingCartContext abaixo VAI PRO ESTADO GLOBAL ****************
type ShoppingCartContext = {
    getItemQuantity: (id: number) => number // retorna um vazio, essa função não retorna nada.
    increaseCartQuantity: (id: number) => void 
    decreaseCartQuantity: (id: number) => void 
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[] // aqui é o estado local que montei mais pra baixo.
} // todas essa funções, o estado local e o cartQuantity são a tipagem do ShoppingCartContext

const ShoppingCartContext = createContext({} as ShoppingCartContext) 
// além de criar o contexto aqui, tou dizendo que essa const ShoppingCartContext contém todas essas funções e outras coisas acima como a tipagem dela.

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
} // a mesma const que recebeu o createContext vai ser usada no parâmetro do useContext. E por meio dessa const eu vou acessar o provider na função abaixo.
// essa função é importada no StoreItem.tsx ...  4 funções que são a tipagem do ShoppingCartContext serão importadas do useShoppingCart.

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])
    // <CartItem[]> é o parâm de tipagem e será a tipagem desse estado 'cartItems. Também QUER DIZER QUE É UM ARRAY DE OBJETO e em cada obj vai ter um cartItem com um id e uma quantity   E ESSE ESTADO VAI PRO LOCAL STORAGE ************
    // EXEMPLO REAL O LOCAL STORAGE COM ESSE CartItem(peguei usando f12 após fazer pedidos): shopping-cart( é chave)	[{"id":1,"quantity":3},{"id":2,"quantity":2}] ************************************************************
    // lá em cima no type CartItem eu disse que ia ter um id e um quantity e ambos são number.
    
   const cartQuantity = cartItems.reduce((acc, instrument) => acc + instrument.quantity, 0)
   // esse reduce é útil pra quer o quantity total e pra ver se deve renderizar o ícone de carrinho de compras ou não.
   // vai rodar o estado local cartItems e ver os instrumentos que já foram pedidos. No cartItems tem a propriedade quantity em cada instrumento. Aí vai simplesmente ir somando as quantities de cada produto, assim vai ter a soma da quantity de todos os produtos, o número de vezes que foi feito o pedido de algum instrumento.
   // obs: no typescript só parou de dar erro quando botei o 0 no final. No javascript não precisava botar, já se entendia que o acc começava com 0.

     

    // Agora dentro dessa função ShoppingCartProvider que provê os valores pro children, vou 4 funções que são parte da tipagem da const ShoppingCartContext.
    // cartItems vai ser um estado que é é um array de obj e cada obj vai ser o que foi tipado lá em cima do cartItem: um obj com id e array dos produtos pedidos.
    
    //  as 4 funções abaixo são pra ter ou alterar o valor do quantity de um produto pedido. O valor do quantity é fundamental pra ver se renderiza o botão "add to cart" ou se renderiza os botões "+,"-","remove" e a mensagem com o "valor do quantity in cart" *************** 
    //  Cada produto nesse estado vai ter um id e uma quantity.Essas funções, em quase todos os casos, vão atualizar esse estado cartItems e vão retornar o array de obj atualizado com o id de cada produto seu novo valor de quantity, dependendo se pediu mais do produto ou se pediu pra diminuir o quantity do produto pedido *************

        function getItemQuantity(id: number) {
            return cartItems.find((item) => item.id === id)?.quantity || 0 }
        // vai procurar dentro do cartItems(os produtos já pedidos )o produto que tenha um id igual ao passado no parâm dessa função. Se achar um id igual,aí  só precisa RETORNAR O ITEM ENCONTRADO. Esse item/instrumento vai ter um id e uma quantity. Se não encontrar esse instrumento, aí retorna 0.  Nessa função aqui ainda não precisa atualizar o estado cartItems.
        // obs: lembrando que cada cartItem só tem id e quantity.
        
       

        function increaseCartQuantity(id: number) {
            setCartItems((currItems) => { // o resultado dessa função vai atualizar o estado local cartItems. currItems é a "lista" de produtos já pedidos
              if (currItems.find((item) => item.id === id) == null) { // o null quer dizer que o find NÃO ACHOU NADA. O id do produto não se encontra na lista de produtos já pedidos. 
                return [...currItems, { id, quantity: 1 }] // Aí atualiza o estado local cartItems apenas retornando  um array de obj que é a lista dos produtos já pedidos, porém CRIA ESSE NOVO PEDIDO NA LISTA, colocando um {} com o id desse produto e o quantity igual a 1(já que é o 1°pedido desse produto).
              } else { // Caso encontre o produto na lista de produtos já pedidos...
                return currItems.map((item) => { // aí roda toda essa lista de produtos.
                  if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 } // se encontrar esse produto na lista de produtos já pedidos, aí atualiza o estado local cartItems retornando o objeto desse produto mantendo o valor do id, PORÉM AUMENTA A QUANTITY EM 1. ******
                  } else {  // dava erro no vs code sem esse final aqui.
                    return item
                  }
                })
              }
            })
        }

        function decreaseCartQuantity(id: number) {
            setCartItems((currItems) => {
              if (currItems.find((item) => item.id === id)?.quantity === 1) { // ESSE IF É APENAS PRA PRODUTOS QUE SÓ FORAM PEDIDOS 1 VEZ. Se o produto tiver na "lista" de produtos já pedidos e foi pedido só 1 vez,aí faz o filter abaixo
                return currItems.filter((item) => item.id !== id) // aí atualiza o estado local cartItems EXCLUINDO O PRODUTO QUE SÓ TINHA 1 PEDIDO. Quer diminuir o quantity desse produto em 1, então fica 0 e aí não pode continuar na lista de produtos já pedidos.
              } else { // se não for um produto que foi pedido apenas uma vez, aí poder ter sido pedido nenhuma vez ou mais de 1 vez. Aí vai  rodar a lista de produtos pra analisar.
                return currItems.map((item) => {
                  if (item.id === id) { // nesse ponto, se encontrar o produto na lista do estado local, É PORQUE FOI PEDIDO MAIS DE UMA VEZ(se não tivesse sido pedido, não estaria na lista). 
                    return { ...item, quantity: item.quantity - 1 } // aí atualiza o estado local cartItems retornando o id produto, PORÉM DIMINUI A QUANTITY DO PRODUTO EM 1.
                  } else { // os produtos pedidos 1 vez ou mais já foram tratados. Então só resta os que não foram pedidos nenhuma vez. Esses nem tão nessa lista que é esse estado cartItems, então só retorna o item e tá ok.
                    return item
                  }
                })
              }
            })
          }

        function removeFromCart(id: number) {
            setCartItems((currItems) => {
              return currItems.filter((item) => item.id !== id)
            })
          } // se achar o produto na lista de produtos já pedidos, aí atualiza o estado  cartItems usando o filter pra EXCLUIR O PRODUTO EM QUESTÃO da lista de produtos já pedidos. Aí como o produto será removido,  o quantity desse produto também será 0, então vai voltar a aparecer o button add to cart *****
        

    return(
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartQuantity, cartItems}}>
            {children}
            
        </ShoppingCartContext.Provider>
    ) // As funções e as outras coisas que são a tipagem da const ShoppingCartContext são passadas no value, assim elas tão no estado global pra serem usadas pela aplicação ******************
} //  Essa função ShoppingCartProvider vai prover os valores necessários pro children(funções e outras infos). No arquivo App.tsx essa função é importada, aí cobre toda a aplicação com essa função.
// Sempre que usa um provider, precisa ter um objeto e um children nele.


// <ShoppingCart /> BOTAR ISSO EMBAIXO DO CHILDREN *************