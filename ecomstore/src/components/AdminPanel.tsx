import { useEffect, useState } from "react";

export const AdminPanel = () =>{
    interface Item {
        id: number;
        objectname: string;
        image: string;
        cost:string
      }
    const [name,setName] = useState('')
    const [image,setImage] = useState('')
    const [cost,setCost] = useState('')
    const [success,setSuccess] = useState(false)
    const [items,setItems] = useState<Item[]>([])

    useEffect(() =>{
        const localItem = localStorage.getItem("Items");
        if (localItem){
            try{
                setItems(JSON.parse(localItem));
            }
            catch(error){
                console.error('Admin Item Data Parsing Issue')
            }
            
        }
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
      


    },[])
    
    const HandleSubmit= async (e:any) =>{
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/Admin',{
                
                method:'POST',
                body: JSON.stringify({name,image,cost}),
                headers:{
                    'Content-Type': 'application/json'
                }
            }); 
            setImage('');
            setSuccess(true)
        }catch(error){
            console.log(error)
            setSuccess(false);
        }
        
        console.log(name,image)
        setImage('')
        setName('')
        setCost('')


        
    }

    return(
        <div>
            <h1 className="ml-auto mr-auto relative text-2xl mt-4 text-center  ">Add New Products </h1>
            <div className="formPost ml-auto mr-auto mt-40">

            <form onSubmit={HandleSubmit} method='POST'>
                
                <input type='text'  value={name} onChange={(e) => setName(e.target.value)} className="PostLabel" placeholder="Object Name"></input>
                <input type='text'  value={cost} onChange={(e) => setCost(e.target.value)} className="PostLabel" placeholder="Cost"></input>
                <input  type='text' value={image} onChange={(e) => setImage(e.target.value)} className="PostLabel" placeholder="Image-Url"></input>
                <button type='submit' className="PostLabel border-0 bg-red-700">Post</button>
            </form>
            <div>{success && <div className="Received bg-center text-white">Successfully Submitted!</div>} </div>
            </div>
        </div>
    )
}