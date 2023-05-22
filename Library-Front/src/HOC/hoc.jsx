import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Hoc = (Component)=>{
    const Auth = (props)=>{
        const navigate = useNavigate()
        useEffect(() => {
            if(!localStorage.getItem("token")){
                console.log(localStorage.getItem("token"))
                return navigate("/login")
            }
          }, [navigate]);
        return <Component {...props}/>
    }
    return Auth
}