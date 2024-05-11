import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogin = () => {
    
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    
    const login = async(userName, password) =>{
        setLoading(true);
        try {
        
            const res = await fetch("/api/auth/Login", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userName, password})
            })

            const data = await res.json();

            if(data.error){
                throw new Error(data.message);
            }

            // login successfully
            // localStorage.setItem("authToken", data.token);
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false);
        }
    }
    return {loading, login}
}

export default useLogin