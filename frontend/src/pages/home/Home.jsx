import React from 'react'
import Sidebar from '../../components/siderbar/Sidebar.jsx'
import MessageContainer from '../../components/messages/MessageContainer.jsx'

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] overflow-hidden rounded-lg bg-gray-400 bg-clip-padding backdrop:filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home

