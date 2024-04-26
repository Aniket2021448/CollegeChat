import { useState } from 'react'
import React from 'react'
import GenderComponent from './GenderComponent.jsx'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup.js'

const SignUp = () => {

  const [inputs, setInputs] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })
  
  const {loading, signup} = useSignup();
  const handleSubmit = async(e) =>{
    e.preventDefault(); // prevents submitting the form, 
    console.log(inputs)

    await signup(inputs);
  };

  const handleCheckboxChange = (gender) => {
    setInputs({...inputs, gender })
  } 


  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop:filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Signup
          <span className='text-blue-500'> CollgeChat</span>
        </h1>

        <form onSubmit={handleSubmit}>
        <div>
          <label className='label pt-3 pb-1'>
            <span className='text-base label-text'>Full name</span>
          </label>
          <input type='text' placeholder='Enter your Full name' className='w-full input input-bordered h-10' 
              value={inputs.fullName} 
              onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
            />
        </div>

        <div>
          <label className='label pt-3 pb-1'>
            <span className='text-base label-text'>Username</span>
          </label>
          <input type='text' placeholder='Enter your username' className='w-full input input-bordered h-10' 
              value={inputs.userName} 
              onChange = {(e) => setInputs({...inputs, userName: e.target.value})}
          />
        </div>

        <div>
          <label className='label pt-3 pb-1'>
            <span className='text-base label-text'>Password</span>
          </label>
          <input type='password' placeholder='Enter your Password' className='w-full input input-bordered h-10'
          
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
          />
        </div>

        <div>
          <label className='label pt-3 pb-1'>
            <span className='text-base label-text'>Confirm Password</span>
          </label>
          <input type='password' placeholder='Confirm your Password' className='w-full input input-bordered h-10' 
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
          
          />
        </div>

        <GenderComponent onCheckboxChange = {handleCheckboxChange} selectedGender={inputs.gender} />

        <Link to='/login' className='text-xs hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
        </Link>

        <div>

          <button className="btn btn-outline hover:bg-blue-600 w-full mt-4" disabled = {loading}>
            {loading ? <span className='loading loading-spinner'></span> : 'Sign up'}
            </button>
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
//             <span className='text-base label-text'>UserName</span>
//           </label>
//           <input type='text' placeholder='Enter your userName' className='w-full input input-bordered h-10' />
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

//         <Link to='#' className='text-xs hover:underline hover:text-blue-600 mt-2 inline-block'>
//             Already have an account?
//         </Link>

//         <div>

//           <button className="btn btn-outline hover:bg-blue-600 w-full mt-4">Sign up</button>
//         </div>

//         </form>

//       </div>
//     </div>
//   )
// }

// export default SignUp