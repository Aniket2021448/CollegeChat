import React from 'react'
import GenderComponent from './GenderComponent.jsx'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop:filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Signup
          <span className='text-blue-500'> CollgeChat</span>
        </h1>

        <form>
        <div>
          <label className='label pt-3 pb-1'>
            <span className='text-base label-text'>Full name</span>
          </label>
          <input type='text' placeholder='Enter your Full name' className='w-full input input-bordered h-10' />
        </div>

        <div>
          <label className='label pt-3 pb-1'>
            <span className='text-base label-text'>Username</span>
          </label>
          <input type='text' placeholder='Enter your username' className='w-full input input-bordered h-10' />
        </div>

        <div>
          <label className='label pt-3 pb-1'>
            <span className='text-base label-text'>Password</span>
          </label>
          <input type='password' placeholder='Enter your Password' className='w-full input input-bordered h-10' />
        </div>

        <div>
          <label className='label pt-3 pb-1'>
            <span className='text-base label-text'>Confirm Password</span>
          </label>
          <input type='password' placeholder='Confirm your Password' className='w-full input input-bordered h-10' />
        </div>

        <GenderComponent/>

        <a href='#' className='text-xs hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
        </a>

        <div>

          <button className="btn btn-outline hover:bg-blue-600 w-full mt-4">Sign up</button>
        </div>

        </form>

      </div>
    </div>
  )
}

export default SignUp




// STARTED CODE


// const SignUp = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop:filter backdrop-blur-lg bg-opacity-0'>
//         <h1 className='text-3xl font-semibold text-center text-gray-300'>
//           Signup
//           <span className='text-blue-500'> CollgeChat</span>
//         </h1>

//         <form>
//         <div>
//           <label className='label pt-3 pb-1'>
//             <span className='text-base label-text'>Full name</span>
//           </label>
//           <input type='text' placeholder='Enter your Full name' className='w-full input input-bordered h-10' />
//         </div>

//         <div>
//           <label className='label pt-3 pb-1'>
//             <span className='text-base label-text'>Username</span>
//           </label>
//           <input type='text' placeholder='Enter your username' className='w-full input input-bordered h-10' />
//         </div>

//         <div>
//           <label className='label pt-3 pb-1'>
//             <span className='text-base label-text'>Password</span>
//           </label>
//           <input type='password' placeholder='Enter your Password' className='w-full input input-bordered h-10' />
//         </div>

//         <div>
//           <label className='label pt-3 pb-1'>
//             <span className='text-base label-text'>Confirm Password</span>
//           </label>
//           <input type='password' placeholder='Confirm your Password' className='w-full input input-bordered h-10' />
//         </div>

//         <GenderComponent/>

//         <a href='#' className='text-xs hover:underline hover:text-blue-600 mt-2 inline-block'>
//             Already have an account?
//         </a>

//         <div>

//           <button className="btn btn-outline hover:bg-blue-600 w-full mt-4">Sign up</button>
//         </div>

//         </form>

//       </div>
//     </div>
//   )
// }

// export default SignUp