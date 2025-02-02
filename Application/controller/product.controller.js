import { request, response } from "express";
import { product } from "../model/product.js";

export const addProductPage = (request , response , next)=>{
    response.render("add-Product.ejs");
}
export const addProductAction = async (request , response , next)=>{
    let {title , price} = request.body;
    console.log("Result "+ title , price);
    let p = new product(null , title , price);
    try{
    let result = await p.save();
        response.redirect("/product/add-product");
    }catch(err){
        console.log(err);
    }
    // .then(result=>{
    //     response.redirect("/product/add-product");
    // }).catch(err=>{
    //     console.log(err);
        
    // })
}
export const viewProduct = async (request , response , next)=>{
    try{
    let result = await product.getProduct();
    return response.render("view-product.ejs",{productList: result});
    }catch(err){
        console.log(err);   
    }
}
export const removeData = (request , response , next)=>{
    let productId = request.params.productId;
    product.remove(productId)
    .then(result=>{
        return response.redirect("/product/view-product");
    }).catch(err=>{
        console.log(err);
    })
}
export const edit = (request , response , next)=>{
    let productId = request.params.productId;
    console.log(productId);
    
       response.render("edit-data.ejs" , {productId});
}
export const updateAction = (request , response , next)=>{
    let {id ,title, price} = request.body;
    // let productId = request.params.productId;
    console.log(`Result : ${title} , ${price}`);
    product.update(id , title , price)
    .then(result=>{
        console.log(result);
        response.redirect("/product/view-product");
    })
    .then(err=>{
        console.log(err);
        
    })

}
