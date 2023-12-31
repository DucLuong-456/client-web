import { useState, useEffect } from "react";
import axios from "axios";


function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)
    const fetchAPI='https://luong-food-be.onrender.com';
    
    useEffect(() =>{
        const getCategories = async () =>{
            const res = await axios.get(fetchAPI+'/api/category')
            setCategories(res.data)
        }

        getCategories()
    },[callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI