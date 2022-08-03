import { Routes, Route } from "react-router-dom"
import Store from "./pages/Store"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Conclusion from "./pages/Conclusion"
import { ShoppingCartProvider } from "./context/shoppingCartContext"

function App() {
  return (
        <ShoppingCartProvider>
         <Routes>
            <Route  path="/" element={<Home />}/>
            <Route path="/store" element={<Store />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/end" element={<Conclusion />}/>
         </Routes>
         </ShoppingCartProvider> 
  )    
         
}

export default App
