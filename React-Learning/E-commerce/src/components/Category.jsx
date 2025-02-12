import { Component } from "react";
import data from "./Data";

export default class Category extends Component{
    constructor(){
        super();
        this.state = {
            ProductList : data
        }
    }
    render(){
        console.log("Hello");
        
       return <>
           <table className="table table-dark table-striped table-bordered text-center">
                <thead className="fw-bold">
                    <tr>
                        <td>S.No</td>
                        <td>Category</td>
                        <td>Thumbnail</td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.ProductList.map((product , index)=>{return <tr key={index}>
                        <td>{++index}</td>
                        <td>{product.category}</td>
                        <td><img src={product.thumbnail} alt="img"  width={145}/></td>
                    </tr>})}
                </tbody>
            </table>
        </>
    }
}