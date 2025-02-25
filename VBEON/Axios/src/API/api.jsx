import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000"
})

export const getData = ()=>{
    return api.get("/task/list");
}