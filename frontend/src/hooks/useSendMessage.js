import React, { useState } from 'react'
import useConversation from '../zustand/useConversation.js';
import toast from 'react-hot-toast';


const useSendMessage = () => {
    // create loading state
    const [loading, setLoading] = useState(false);
    // extract zustand multistate store
    const {messages, setMessages, selectedConversation} = useConversation();

    // create a function to send message
    const sendMessage = async(message)=>{

        // set loading state to true
        setLoading(true);
        try {
            // make post request to the endpoint
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
            
            // const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {

                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },                                                                                                                                                                                                           
                body: JSON.stringify({message}),
                
            })

            const data = await res.json(); // extracted the fetched data
            if(data.error){
                throw new Error(data.error);
            }
            setMessages([...messages, data]);

            
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }
    return {loading, sendMessage}
}

export default useSendMessage