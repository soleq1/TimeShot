import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithCredential,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
export const Login = () => {
  const navigate = useNavigate()


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedin, setLoggedIn] = useState<User | null>(null);
  // Fake Login //


  useEffect(() => {
    
    console.log(email)

    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     setLoggedIn(user);
    //     localStorage.setItem("isLoggedIn", "true");
    //     navigate('/')
    //   } else {
    //     setLoggedIn(null);
    //     localStorage.removeItem("isLoggedIn");
    //   }
    // });

    // const isLoggedIn = localStorage.getItem("isLoggedIn");
    // if (isLoggedIn) {
    //   setLoggedIn(auth.currentUser);
    // }
    // return () => unsubscribe();
  }, [email]);
  const signUp = () => {
    
    
    localStorage.setItem('email',email);

    navigate('/')
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     console.log(user);
    //     localStorage.setItem("user", JSON.stringify(user));
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;

    //     // const errorMessage = error.message;
    //     setErrorMessage(errorCode);
    //     console.log(errorCode);
    //   });
  };

  const signIn = () => {
    

  localStorage.setItem('email', email);

  navigate('/');

    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
        
    //     const user = userCredential.user;
    //     console.log(user);
    //     localStorage.setItem("user", JSON.stringify(user));
        
        
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     alert(errorCode);
    //   });
  };
  
  const signout = () => {


    // auth
    //   .signOut()
    //   .then(() => {
    //     setLoggedIn(null);
    //     localStorage.removeItem("user");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
  //GOOGLE SIGN IN ***//
  // const handleGoogle = async (e: any) => {
  //   const provider = new GoogleAuthProvider();
  //   return signInWithPopup(auth, provider);
  // };
  return (
    <div className="App">
      {/* <img
        src={loggedin?.65 URL || ""}
        width="100"
        height="100"
        alt={loggedin?.displayName || ""}
      ></img> */}

      {/* {loggedin ? (
        <div>
          <p>Hello {loggedin.email} </p>
        </div>
      ) : (
        <p>Log in please</p>
      )} */}

<h1 className="ml-auto mr-auto relative text-2xl mt-3 mb-1 text-center ">Sign Up! </h1>

      <form className="formPost ml-auto mr-auto mt-40" onSubmit={(e) => e.preventDefault()}>
        <input className="PostLabel"
          type={"email"}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="PostLabel"
          type={"password"}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {!loggedin? (
          <div>
            
            <button className="rounded bg-neutral-500" onClick={signUp}>
              sign up
            </button>
            <button className="rounded bg-neutral-500" onClick={signIn}>
              Sign In
            </button>
          </div>
        ) : (
          <div>
            
          </div>

          // <button className="rounded bg-neutral-500" onClick={signout}>
          //   sign out
          // </button>
        )}
      </form>
      </div>

  );
};
