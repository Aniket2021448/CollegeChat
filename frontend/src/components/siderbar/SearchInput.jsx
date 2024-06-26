import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import useConversation from "../../zustand/useConversation";
import useGetConversations from '../../hooks/useGetConversations'
import { toast } from 'react-hot-toast'
import { IoPersonAdd } from "react-icons/io5";

const SearchInput = () => {
  const [search, setSearch] = useState('')
  const {setSelectedConversation} = useConversation()
  const {conversations} = useGetConversations()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;

    if(search.length < 3){
      toast.error('Search query must be at least 3 characters long')
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))
    if(conversation){
      setSelectedConversation(conversation)
      setSearch('') 
    }
    else{
      toast.error('No such user found!')
    }

  }

  return (
<div className='flex items-center gap-2'>
  <form onSubmit={handleSubmit} className='flex items-center gap-2'>
          <input type="text" placeholder='Search All users...' className='input input-bordered rounded-full' 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
          <IoSearchSharp className='w-6 h-6'/>
          </button>
          
      </form>
    
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
          <IoPersonAdd className='w-6 h-6'/>
          </button>

</div>
  )
}

export default SearchInput