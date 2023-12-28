// import React from "react";
// // import { doctors } from "./../../assets/data/doctors";
// import { BASE_URL, token } from "../../config";

// import DoctorCard from "./DoctorCard";
// const DoctorList =async() => {
//   try {
//     const res = await fetch(`${BASE_URL}/doctors`, {
//       method: "get",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(formData),
//     });
//     console.log(res);
//     const { message } = await res.json();

//     if (!res.ok) {
//       console.log("wrong");
//       throw new Error(message);
//     }

  
//     //  TransformStream.success()
//   } catch (error) {
//     toast.error(error.message);
   
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
//       {doctors.map((doctor) => (
//         <DoctorCard key={doctor.id} doctor={doctor} />
//       ))}
//     </div>
//   );
// };

// export default DoctorList;

import React, { useState, useEffect } from "react";
import DoctorCard from "./DoctorCard";

const DoctorList = ({ doctors }) => {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      
      {/* {doctors.map((doctor) => (
        
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
       */}
    </div>
  );
};

export default DoctorList;


