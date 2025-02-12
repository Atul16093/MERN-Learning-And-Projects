import { Component } from "react";
import data from "./Data.js"
class Product extends Component{
    constructor(){
        super();
        this.state = {
            ProductList : data
        }
    }
    render(){
            console.log(this.state.ProductList);
          let  count = 1;
        return<>
        <div className="d-flex justify-content-center ">
        <h3 className="fw-bold">All Product</h3>
        </div>
            <table className="table table-dark table-striped table-bordered text-center">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>thumbnail</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.ProductList.map((product , index)=>{return <tr key={index}>
                        <td >{count++}</td>
                        <td>{product.title}</td>
                        <td>{product.description}</td>
                        <td>{product.category}</td>
                        <td><img src={product.thumbnail} alt=""  width={145}/></td>
                    </tr>})}
                </tbody>
            </table>
        </>
    }
}
export default Product;