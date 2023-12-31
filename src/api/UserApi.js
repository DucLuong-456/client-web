import {useState, useEffect} from "react";
import axios from 'axios';

function UserAPI(token){
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([])
    const [history,setHistory] = useState([])
    const fetchAPI='https://luong-food-be.onrender.com';
    
    useEffect(()=>{
        if(token){
            const getUser = async ()=>{
                try {
                    const res = await axios.get(fetchAPI+'/user/infor',{
                        headers: {Authorization: token}
                    })
                    console.log(res.data.role)
                    setIsLogged(true);
                    res.data.role === 1? setIsAdmin(true): setIsAdmin(false)
                    setCart(res.data.cart)                    
                } catch (error) {
                    alert(error.response.data.msg)
                }
            }
            getUser()
            //console.log(isLogged)
        }
    },[token])

    useEffect(()=>{
        if(token){
            const getHistory = async()=>{
                const res = await axios.get(fetchAPI+'/user/history',{headers: {Authorization: token}})
                setHistory(res.data)
            }
            getHistory()

        }
    },[token])

    const addCart = async(product)=>{
        if(!isLogged) return alert("Please login to buying!")

        const check = cart.every(item=> {
            return item._id !== product._id
        })

        if(check){
            setCart([...cart,{...product,quantity: 1}])
            await axios.patch(fetchAPI+'/user/addcart',{cart: [...cart,{...product,quantity: 1}]},{
                headers: {Authorization: token}
            })
        }
        else
            {
                alert("This product has been added to cart!")
            }

    }
    return{
        isLogged: [isLogged,setIsLogged],
        isAdmin: [isAdmin,setIsAdmin],
        cart: [cart,setCart],
        history: [history,setHistory],
        addCart: addCart
    }
}

export default UserAPI
