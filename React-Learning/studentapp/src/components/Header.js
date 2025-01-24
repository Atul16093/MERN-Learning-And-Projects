import { Component } from "react";

class Header extends Component{
    constructor(){
        super();
    }
    render(){
        return <>
        <div className="bg-info container-fluid ">
            <h3 className="text-white text-center">Student App</h3>
        </div>
        </>
    }
}
export default Header;