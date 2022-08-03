import Navbar from "../components/Navbar"
import "../pages/PagesCss.css"

function Home() {
    return(
       <div>
         <Navbar />
          
           <img src="/images/cover.jpg" className="coverImage"></img>
          
       </div>
    ) 
    // PEGUEI ESSA LINDA IMAGEM POR MEIO DESSE LINK AQUI: https://unsplash.com/photos/b57RqS-nQ1c
  }
  
  export default Home