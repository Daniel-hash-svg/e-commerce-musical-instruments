import Navbar from "../components/Navbar"
import { StoreItem } from "../components/StoreItem"
import storeItems from "../data/items.json"

function Store() {
  return (
    <div>
      <Navbar />
      <h1>Store</h1>
      <div>
        {storeItems.map((item => (
          <div key={item.id}>
             <StoreItem {...item}/>
          </div>
        )))}
      </div>
      
    </div>
  )
  
} 
// aqui no componente pai passa todas as infos que tem no item(id,instrument e os outros dois) por  props pro elemento filho. No javascript, passar a prop seria algo como item={...item}

export default Store
