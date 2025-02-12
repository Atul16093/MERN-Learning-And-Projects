import { Component } from "react";
import data from "./Data";
export default class Title extends Component{
    constructor(){
        super();
        this.state = {
            ProductList : data
        }
    }
    render(){
        return <>
            <div className="d-flex justify-content-center ">
                <h3>Title of the product</h3>
            </div>
                <table className="text-center table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ProductList.map((Product , index)=>{return <tr key={index}>
                            <td>{++index}</td>
                            <td>{Product.title}</td>
                        </tr>})}
                    </tbody>
                </table>
        </>
    }
}