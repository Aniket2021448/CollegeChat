import {useState, useEffect} from 'react'

const useGetConversations = () => {

    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(()=>{
        const getConversations = async() =>{
            setLoading(true);
            try {
                const res = await fetch("/api/users/")
                
                const data = await res.json();
                // console.log("Users from useGetConversations.js", data)
                if(data.error){
                    throw new Error(data.message);
                }
                
                setConversations(data);

                const res2 = await fetch("/api/users/usersForSidebar");
                const data2 = await res2.json();

                if(data2.error){
                    throw new Error(data2.message);
                }  
                setFriends(data2);



            } catch (error) {
                toast.error(error.message)
            }
            finally{
                setLoading(false);
            }
        }

        getConversations();
    }, [])
    return {loading, conversations, friends};
}

export default useGetConversations