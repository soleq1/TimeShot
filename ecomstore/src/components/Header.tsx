import { Routes, Route, Link,useNavigate, json} from "react-router-dom";
import { useEffect, useState,lazy,Suspense } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { User, signOut } from "firebase/auth";

export const Header = () => {

  interface Item {
    id: number;
    objectname: string;
    image: string;
    cost:string
  }
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<User | null>(null);
  

  const [navbaropen,setNavBaropen] = useState(false)
  const [burger,setBurger] = useState(false)
  const emailRender = localStorage.getItem('email')
  const [email,setEmail] = useState(null)
  useEffect(() =>  {
    const localEmail = localStorage.getItem('email');



    if (localEmail){
      setEmail(localEmail);
    }

    // FIREBASE AUTH CODE ****  //
    //   const unsubscribe =  auth.onAuthStateChanged((user) => {
      
    //   if (user) {
    //     setLoggedIn(user);
    //     setNavBaropen(false)
    //     setBurger(false)
        
        
    //   } else {
    //     setLoggedIn(null);
    //   }
      
    // });
    // return () => {
    //   unsubscribe()
    // }
  },[]);
    

  const signout = () => {

    localStorage.removeItem('email')
    navigate('/')

    //   auth
  //     .signOut()
  //     .then(() => {
  //       setLoggedIn(null);
  //       localStorage.removeItem("user");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  };
 // FOR FIREBASE SWITCH TO !loggedIN 
  return (
    <div className=" flex flex-row headercontainer">
      {!emailRender ? <div></div>:<button className="text-white absolute ml-3 mt-3 bg-slate-600 p-1 w-20"><Link to='Admin'>Post</Link></button>}
      <div className="LogoPlacement">
        <h1>
          <Link to="/">TimeShot</Link>
        </h1>
      </div>
      

        <div className="flex ml-auto personalItem">
      <div className="LoginMobile">
        
        {!emailRender ? (
          <button  className="flex-shrink loginButton2 ">
            <Link to="/login">Login</Link>
          </button>
        ) : (
          <div className='photoIcon text-white'onMouseEnter={() => setNavBaropen(true)} onMouseLeave={() => setNavBaropen(false)}>
            
        <h1 className="headerEmail">{emailRender}</h1>
          </div>
          
        )}
          <button className=" signoutButton "  >
           {navbaropen && <div className="py-1" onMouseLeave={() => setNavBaropen(false)} onMouseEnter={() =>setNavBaropen(true)}>
              <a  className="block px-4 py-2 text-sm"href='#' onClick={signout}>Signout</a>
            </div>}
          </button>
      </div>
        
        <button className=" flex-shrink-0 cartButton">
          <p>
          
            {!email? <Link to='/login'>Cart</Link>:<Link to="/checkout"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg></Link>}
          </p>
        </button>
      </div>
      
    </div>
  );
};
