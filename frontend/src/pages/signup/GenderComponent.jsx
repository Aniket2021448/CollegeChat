import React from 'react'

const GenderComponent = () => {
  return (
    <div className='flex'>

        <div className="form-control">
        <label className="label mt-2 cursor-pointer">
            <span className="label-text mr-2">Male </span> 
            <input type="checkbox" defaultChecked className="checkbox" />
        </label>
        </div>

        <div className="form-control">
        <label className="label mt-2 cursor-pointer">
            <span className="label-text mr-2">Female </span> 
            <input type="checkbox" defaultChecked className="checkbox" />
        </label>
        </div>


    </div>
  )
}

export default GenderComponent


// started code


// const GenderComponent = () => {
//   return (
//     <div className='flex'>

//         <div className="form-control">
//         <label className="label mt-2 cursor-pointer">
//             <span className="label-text mr-2">Male </span> 
//             <input type="checkbox" defaultChecked className="checkbox" />
//         </label>
//         </div>

//         <div className="form-control">
//         <label className="label mt-2 cursor-pointer">
//             <span className="label-text mr-2">Female </span> 
//             <input type="checkbox" defaultChecked className="checkbox" />
//         </label>
//         </div>


//     </div>
//   )
// }

// export default GenderComponent