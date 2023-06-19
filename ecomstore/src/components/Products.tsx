import { useState,useEffect } from "react"
import { Link } from "react-router-dom";

export const Products = () =>{
    interface Item {
        id: number;
        objectname: string;
        image: string;
        cost:string;
        length:number;
      }
      const [cart,setCart] = useState([])
      const [items, setItems] = useState<Item[]>([]);
      const [searchQuery,setSearchQuery] = useState('');
      const [loading,setLoading] = useState(true)
      
    useEffect(  () =>{

        const item = localStorage.getItem('Items');
        const parsed = JSON.parse(item);
        const localCart = JSON.parse(localStorage.getItem('cart'))
        if (localCart){
          setCart(localCart)

        }
        setLoading(false);
        
        if (item){  
          setItems(parsed)
          
          
        }

        if (!item){
          const fetchData = async () => {
            try {
              const response = await fetch("http://localhost:3000/api/data", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await response.json();
              console.log(data);
              // const dataParse = JSON.stringify(data);
              setItems(data);
      
              const localItem = localStorage.setItem("Items", JSON.stringify(data));
            } catch (error) {
              console.error(error);
            }
          };   
          fetchData();
        }
        
    },[])

    useEffect(() =>{
      if (!loading){
        localStorage.setItem('cart',JSON.stringify(cart))

      }
      
    },[cart,loading])
    const handleCart  = async(item:Item) =>{
        setCart((prevItems) => [...prevItems, item]);
 
    }
    const handleCartRemove = (item: Item) => {
      // const updatedItems = cart.filter((prevItem) => prevItem.id !== item.id);
      // setCart(updatedItems);
      const index = cart.findIndex((cartItem) => cartItem.id === item.id);
  if (index !== -1) {
    const updatedItems = [...cart];
    updatedItems.splice(index, 1);
    setCart(updatedItems);
  }
      // localStorage.setItem('cart',JSON.stringify(cart));
      // console.log(cart.length);
    };
   
    
    return (    
        <div>
          <h1 className="Title">Digital Cameras</h1>
      <div className="flex flex-wrap ItemList px-4 mb-8 ">
        {items.map(item =>{
          
          return (
            
            <div className='Product-Container'key={item.id}>  
            <Link to={`/item/${item.id}`}>
            <div className="Product-Container-Image">
                <img className="product-image" height='300' width='150'src={item.image}></img>
            </div>    
                <p className="p-4">{item.objectname}</p>
            </Link>
                <div className="Product-Description-Container">
                <p className="text-gray-600 ">Price : ${item.cost}</p>
                  <p>Add Cart  <span><button onClick={() => handleCartRemove(item)}>-</button><button onClick={() => handleCart(item)}>+</button></span></p>
                {/* <div className="bg-slate-500 w-fit rounded-sm AddCart"> */}
                  {/* </div> */}

                </div>
            </div>
            // </div>
            
            )})}
            
         </div>
         </div>  
    )
}