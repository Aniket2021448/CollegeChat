import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';



const useSignup = () => {
    const [loading, setLoading] = useState(false);

    const {setAuthUser}= useAuthContext();

    const signup = async ({fullName, userName, password, confirmPassword, gender}) => {
        const success = handleInputErrors({ fullName, userName, password, confirmPassword, gender });

        if (!success) return;
        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, userName, password, confirmPassword, gender }),
            });

            const data = await res.json();
            console.log(data);
            
            if (!res.ok) {
                throw new Error(error.message);
            } else {
                toast.success('Signup successful');
            }

            // save the user to local storage, to check whether the user is logged in or not
            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};



export default useSignup;


function handleInputErrors({ fullName, userName, password, confirmPassword, gender }) {
    console.log(`From handleInputErrors funciotn ${fullName}`);
    
    
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }

    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error('Please fill all fields');
        return false;
    }


    if (password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return false;
    }

    // Additional gender validation if needed

    return true;
}

