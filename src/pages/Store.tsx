import Navbar from "../components/Navbar"
import { StoreItem } from "../components/StoreItem"
import storeItems from "../data/items.json"
import "../pages/PagesCss.css"

function Store() {
  return (
    
      <div className="pageStore">
        <Navbar />
        <div className="store">
        
        <div>
          {storeItems.map((item => (
            <div key={item.id}>
               <StoreItem {...item}/>
            </div>
          )))}
        </div>
        
            </div>
      </div>
  )
  
} 

export default Store
