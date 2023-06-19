import { useEffect, useState } from "react"
import { Footer } from "./Footer";
import { json } from "react-router-dom";
 const Cart = () =>{

  interface Item {
    id: number;
    objectname: string;
    image: string;
    cost:string
  }
  const [cart,setCart] = useState([]);
    useEffect(() => {
      const cart = JSON.parse(localStorage.getItem('cart'))
      if (cart){
        setCart(cart)

      }
      // else{
      //   setCart([])
      
      // }
    },[])
    const cartRemove = (item: Item) => {
      const index = cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        const updatedItems = [...cart];
        updatedItems.splice(index, 1);
        setCart(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
      }
    }
    const totalCost = cart.reduce((total, item) => total + +item.cost, 0)


    return(
        <div>

        {cart.map((item:any) =>{
          return (
            <div className="cartProduct">
            <img className='cartImage' width='200' src={item.image}></img>
            <p>{item.objectname}</p>
            <p key={item.length}>Price : ${item.cost}</p>
            <button onClick={() => cartRemove(item)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg></button>
            </div>

          )
        })}
        <div className="cartCheckout">
          <div> Total:{totalCost} $</div>
        <button className="cartButtonCheckout">Checkout</button>
        </div>
          <Footer></Footer>
          </div>
    )
}
export default Cart