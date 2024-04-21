import React from 'react'

const Conversation = () => {
  return (
    <>
    <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
        {/* // functionality later */}
        {/* AVATAR */}
        <div className='avatar online'>
            <div className='w-12 rounded-full '>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg" alt="user avatar" />
            </div>
        </div>
        
        {/* USER NAME AND EMOJI */}
        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200'>John doe</p>
                <span className='text-xl'>🎃</span>
            </div>
        </div>

    </div>
    

    <div className='divider my-0 py-0 h-1'></div>
    </>
  )
}

export default Conversation
