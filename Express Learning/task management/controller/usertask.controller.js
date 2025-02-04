import usertask from "../model/user.model.js"
export const showTask = async (request ,response , next)=>{
    try{
    let userRecord = await(usertask.showTask());
    // console.log(userRecord);
    
    return response.render("user/all-task.ejs" ,{userRecord});
    }catch(err){
        console.log(err);
    }
    
}
export const completeTask =  async (request ,response , next)=>{
    try{
    let taskId = request.params.id;
    let status= await(usertask.setStatus(taskId));
    return response.redirect("/usertask/show");
    }catch(err){
        console.log(err);       
    }
}
export const completed =  async (request ,response , next)=>{
    try{
        let userRecord = await(usertask.completedTask());
    return response.render("user/completed.ejs" ,{userRecord});
    }catch(err){
        console.log(err);       
    }
}
