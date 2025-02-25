import { useRef } from "react"

export const SignUp = ({signUpInfo})=>{
    let emailInput = useRef();
    let passwordInput = useRef();

    const handleSubmit = (e)=>{
        e.preventDefault();
        
    }
    return <>
     <div className="container d-flex justify-content-center align-items-center" style={{height : '650px'}}>
        <div className="" style={{width : '350px', height : '300px', boxShadow : '10px 10px 10px 10px Grey'}}>
            <div className="p-1 d-flex justify-content-center align-items-center bg-secondary">
                <h3>Sign UP</h3>
            </div>
            <form className=" form-group" onSubmit={handleSubmit}>
                <div className="mt-3 p-2">
                <input ref={emailInput} className="form-control" type="text" placeholder="Enter your email" />
                </div>
                <div className="mt-3 p-2">
                <input ref={passwordInput} className="form-control" type="password" placeholder="Enter your password" />
                </div>
                <div className="text-center mt-3">
                    <button onClick={()=>{signUpInfo(emailInput , passwordInput)}} className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
     </div>
    </>
}