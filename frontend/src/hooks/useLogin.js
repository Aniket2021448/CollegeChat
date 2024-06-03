import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (userName, password) => {
        setLoading(true);
        console.log("From useLogin.js", userName, password);
        try {
            const res = await fetch("/api/auth/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userName, password })
            });

            const data = await res.json();
            console.log("Response:", res.status, data);

            if (res.status !== 200) {
                throw new Error(data.error || "Login failed");
            }

            // Login successfully
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            console.error("Login error:", error); // Log the error
            toast.error(error.message || "Unknown error occurred"); // Provide a default error message
        } finally {
            setLoading(false);
        }
    }
    return { loading, login };
}

export default useLogin;
