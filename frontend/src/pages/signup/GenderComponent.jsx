import React from 'react';

const GenderComponent = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className='flex'>
      <div className="form-control">
        <label className={`label mt-2 cursor-pointer ${selectedGender === "male" ? "selected": ""}`}>
          <span className="label-text mr-2">Male </span> 
          <input
            type="checkbox"
            className="checkbox"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>

      <div className="form-control">
        <label className={`label mt-2 cursor-pointer ${selectedGender === "female" ? "selected": ""}`}>
          <span className="label-text mr-2">Female </span> 
          <input
            type="checkbox"
            className="checkbox"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderComponent;



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