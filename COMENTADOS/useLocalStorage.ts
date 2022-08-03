import { useState, useEffect } from "react"

// a função useLocalStorage é importada no shoppingcartContext e é usada assim:
//  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])
// Quer dizer que "shopping-cart" é a key:string e o [] é o initial value.

export function useLocalStorage<T>(key: string, initialValue: T | (()=> T)) { 
    // o <T> é um tipo genérico. Quer dizer que, não importa a tipagem que for, o initialValue vai retornar esse mesmo valor de tipagem ou retorna uma function que retorna essa tipagem.
    // No exemplo usado no arquivo shoppingCartContext, a tipagem <T> do useLocalStorage é o <cartItem[]> (não é o mesmo que o componente na pasta components) e quer dizer que é um array de cartItem,e cada cartItem é um obj.
            

    const [value, setValue] = useState<T>(() => {
        // o PARÂMETRO DE TIPAGEM desse useState vai ter a mesma tipagem da função useLocalStorage.
         // Depois do parâm de tipagem se usou a versão função pra que a checagem do localStorage só seja usada uma vez, ao invés de usar toda vez que o componente renderiza de novo.

        const jsonValue = localStorage.getItem(key) // pega o valor da key. Isso aqui dá o valor da tipagem do useLocalStorage. Ao mesmo tempo, dá o valor da tipagem do useState, então dá o valor do value
        
        if (jsonValue != null) return JSON.parse(jsonValue) // se não for nulo, quer dizer que já existe valor no local storage, aí retorna esse jsonValue.
        // Esse jsonValue vai dar o valor da tipagem genérica <T>

        
      })
    
      useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
      }, [key, value]) // setItem coloca os valores no local storage. Vai colocar os valores toda vez que o key ou value mudarem, ou seja, sempre que clicar pra comprar um novo instrumento, ou pra aumentar ou diminuir a quantidade de um instrumento, ou até pra remover algum instrumento do array de objetos do estado global cartItems. Muda no estado global e aí muda no local storage tb e assim armazena os novos valores.
    
      return [value, setValue] as [typeof value, typeof setValue] // pra não dar erro. O 1° elemento do 1° array vai sempre ter a tipagem do segundo array e a mesma ideia vale pro segundo elemento do 1° array.

}