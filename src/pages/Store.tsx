import Navbar from "../components/Navbar"
import { StoreItem } from "../components/StoreItem"
import storeItems from "../data/items.json"
import "../pages/PagesCss.css"

function Store() {
  return (
    
      <div className="pageStore">
        <Navbar />
        <container className="store">
          {storeItems.map((item => (
            <div key={item.id}>
               <StoreItem {...item}/>
            </div>
          )))}
            </container>
      </div>
  )
  
} 

export default Store
