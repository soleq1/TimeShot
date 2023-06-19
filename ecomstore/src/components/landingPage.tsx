import { auth } from "../../firebase/firebaseConfig";
import { User, signOut } from "firebase/auth";
import { useState, useEffect, useRef, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CustomArrowProps } from "react-slick";
import { Link } from "react-router-dom";
import certifications from '../assets/data/certifications.json'
import Slider from "react-slick";
import { Footer } from "./Footer";
import { Login } from "./Login";

export const HomePageStore = () => {
  
  type Cert = {
    name:'string';
    logo:'string';
  }

  interface Item {
    id: number;
    objectname: string;
    image: string;
    cost:string
  }
  const [cart,setCart] = useState([])
  const [ItemChecker,setItemChecker] = useState<any>([])
  useEffect(() => {
    const localItem = JSON.parse(localStorage.getItem("Items"));
    const localCart = JSON.parse(localStorage.getItem('cart'))
    setCart(localCart)
    
    setCertImages(certifications.certifications)
    if (localItem) {
      setItems(localItem)
      // setStorageItem(JSON.parse(localItem));
      // setItemChecker(JSON.parse(localItem))
    }
    // api call to fetch product pictures and objects//
    
    // forces localstorage for testing purposes //
    if (!localItem) {
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
      // 
    }

    return () => {};
  }, []);

  const [storageItem, setStorageItem] = useState([]);
  const [items, setItems] = useState<Item[]>([]);
  
  const sliderRef = useRef<Slider>(null);
  const [certImages,setCertImages] = useState<Cert>([]);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="landing-container">
      <div className="image-container">
        <p className="LandingTitle mb-5 text-5xl">Save Those Memories Today</p>
        <p className="LandingTitle text-3xl ">To Never Forget</p>
        <div className="flex mt-20">
            <Link className="landingButton" to="/products">

          <button className="">Shop Products</button>
            </Link>
        </div>
      </div>
      <div className="bg-black flex" >
      
      <div className="certs">
      {certImages.map((certifications: Cert) =>(
        <div className=" " key={certifications.name}>
          {/* <p className="text-white" key={certifications.name}></p> */}
          <img  height='200' width='200'src={certifications.logo}></img>
          </div>
        ))}
        </div>
      
        <div className="coupon-container">
        <p className="text-white text-3xl coupon">UNLOCK EXCLUSIVE SAVINGS</p>
        <p className="text-white ml-10 text-2xl"> + On Top-Notch Camera Accessories with Our Limited-Time Coupon!</p>
        <p className="text-white mt-5 text-3xl coupon">CAPTURE EVERY ADVENTURE </p>
        <p className="text-white ml-10 text-2xl"> + With Reliable and Versatile Cameras! </p>
        </div>
          <div className="filler"></div>
      </div>
      {/* <div className="relative text-center ">
        

      </div> */}
        
      <div className="mt-20 mb-20">
        <div className="carouselArrow ">
          <div className="carouselButtonPosition">
            <button onClick={() => sliderRef.current?.slickPrev()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-arrow-left-circle left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                />
              </svg>
            </button>
            <button onClick={() => sliderRef.current?.slickNext()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-arrow-right-circle right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                />
              </svg>
            </button>
          </div>
          <Link to="/Products" className="idLink">
            Products &rarr;
          </Link>
          <Slider className="Carousel" {...settings} ref={sliderRef}>
            
            
            
              {items.map((item) => {
                return (
                  <div className="Products" key={item.id}>
                    <Link to={`/item/${item.id}`}>
                    <div className="imageCont">
                    <img height="300px" width='300px' src={item.image}></img>
                    </div>

                    </Link>
                    <div className="flex justify-between">
                      <div className="mr-4">{item.objectname}</div>
                      <div>${item.cost}</div>
                    </div>
                  </div>
                );
              })}
            
          </Slider>
        <Footer></Footer>
        </div>
        </div>
    </div>
  );
};
