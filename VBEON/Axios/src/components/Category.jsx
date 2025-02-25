import { useEffect } from "react";
import { getData } from "../API/api";
export const Category = ()=>{

    const getCategory = async ()=>{
        try{
        const res = await getData();
        console.log(res);
        
        }catch(error){
            console.log(error);  
        }
    }
    useEffect(()=>{
        getCategory();
    },[])
}