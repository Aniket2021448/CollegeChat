import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg" alt="user avatar" />

            </div>
        </div>

        <div className={`chat-bubble text-white bg-blue-500`}> Hey, what's up?</div>
        <div className='chat-footer opacity-50 text-xs flex gapp-1 items-center'>12:42</div>
    </div>
  )
}

export default Message