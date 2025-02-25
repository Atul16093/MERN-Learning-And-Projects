import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
function DashBoard(){
    const [product , setProduct] = useState([]);
    const API = "https://dummyjson.com/products";
    const getMovieData = async()=>{
        try{
            const res = await axios.get(API);
            console.log("run");
            
            setProduct(res.data.products);
            console.log(product);
            
            
        }catch(error){
            console.log(error)   
        }
    }
    useEffect(()=>{
        getMovieData();
    },[])

    return <>
    <h1>Hello It's a DashBoard Page </h1>
    <div className="container ">
    <table className="table table-bordered">
        <thead>
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            </tr>
        </thead>
        <tbody>
    {product.map((pro , index)=>{ return <tr key={index}>
       <td>{pro.id}</td>
       <td>{pro.title}</td>
       <td>{pro.description}</td>
       <td>{pro.category}</td>
       <td>{pro.price}</td>
    </tr>})}
    </tbody>
    </table>
    </div>
    </>
}
export default DashBoard;