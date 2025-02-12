import { Component } from "react";
import Product from "./components/Product.jsx";
import Category from "./components/Category.jsx";
import Title from "./components/Title.jsx";
class App extends Component{
  constructor(){
    super();
    this.state = {
      showComponent : false}
  }
  categroyComponent = ()=>{
     this.setState({
      showComponent : "category"
    });
  }
  productComponent = ()=>{
    this.setState({
      showComponent : "product"
    });
  }
  titleComponent = ()=>{
    this.setState({
      showComponent : "title"
    })
  }

  render(){
  return <>
      <div>
      <button className="m-3 btn btn-warning"  onClick={this.categroyComponent}>Category</button>
      <button className="m-3 btn btn-warning" onClick={this.productComponent}>Product</button>
      <button className="m-3 btn btn-warning" onClick={this.titleComponent}>Title</button>
        {this.state.showComponent== "product" ? <Product/> : this.state.showComponent=="category"? <Category/> : this.state.showComponent == "title"? <Title/> : <Product/> }
        {/* <Title/> */}
      {/* <Product/> */}
      </div>
      {/* <Category/> */}
  </>}
}
export default App;