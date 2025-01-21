import { Component } from "react";
import ProductData from "./data";
class Product extends Component{
    constructor(){
        super();
        this.state ={
            productList : ProductData,
        }
    }
    render(){
        return <>
          <div className="container-fluid">
             <table className="table">
               <thead>
                  <tr>
                   <th>Id</th>
                   <th>Image</th>
                   <th>Title</th>
                   <th>Price</th>
                  </tr>
               </thead>
               <tbody>
                   {this.state.productList.map((product,index)=>{return <tr key={index}>
                       <td>{product.id}</td>
                       <td><img src={product.thumbnail} width="100px" height="100px"/></td>
                       <td>{product.title}</td>
                       <td>{product.price}</td>
                   </tr>})}
               </tbody>
             </table>        
          </div>
        </>
      }
}
export default Product;