import { useState,useEffect } from "react";
import { useParams } from "react-router-dom"
import { Footer } from "./Footer";
export const ProductPages = () =>{
    interface Item {
        id: number;
        objectname: string;
        image: string;
        cost:string
      }
      const [loaded,setisLoading] = useState(true);
      const [cart,setCart] = useState([])
      useEffect(() => {
          const item = JSON.parse(localStorage.getItem('Items'));
          setItem(item)
          const carts = JSON.parse(localStorage.getItem('cart'))
          if (carts){
            setCart(carts)

          }
          setisLoading(false)
          
      },[])
      useEffect(() =>{
        if (!loaded){
          localStorage.setItem('cart',JSON.stringify(cart))
        }
      },[cart,loaded])
    const [item,setItem] = useState<any>([])
    const { id } = useParams();
    const selectedItem = item.find((item) => item.id === id);
    if (!selectedItem){
        return <div>404 No Item</div>
    }
    const { id: selectedId, ...restProperties } = selectedItem;
    const {objectname,image,cost} = restProperties
    const newItem = {
      id: selectedId,
      ...restProperties
    }
const handleCartRemove =() =>{
    return
}
const handleCart = (items:Item) =>{
  setCart((prevItems) => [...prevItems, newItem ]);
   
    


  }
    return(
        <div>
        <div>
            <div className="Product-Container-Image idItem">
                <img className="product-image " height='500' width='450' src={image}></img>
            <div className="idpage">
                  <p className="p-4 idTitle">{objectname}</p>
                <p className="text-lg w-64 text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nulla earum aspernatur quos dignissimos et a deleniti vero porro sequi! Ut doloribus cupiditate vero tempore minima aliquam soluta aliquid harum.</p>
                  <p className="text-gray-600 ">Price : ${cost}</p>
                  <p><button type='submit' className="idButton" onClick={() => handleCart(item)}>Add To Cart</button></p>
            </div>
            </div>    
            <div className="line-container">
                  <span className="video">Buying Guide</span>
                    <span className="line"></span>
            </div>
            <div className="video-container">
                    <iframe className="video-position"width="920" height="500"src="https://www.youtube-nocookie.com/embed/aoAiIJZ6s-Y" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>

        </div>
            <Footer></Footer>
    </div>
    )

}