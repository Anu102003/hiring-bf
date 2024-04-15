import React from "react";

export const Participant = ({ name, areaOfInterest,search }) => {
//   const filteredParticipant= name.filter((item) =>
//       item.email.toLowerCase().includes((search.search).toLowerCase())
//   );
  //     console.log(filteredParticipant)
  //    console.log(search.search)
  console.log({search})

  return (
    <div>
      <div className="add-component">
        <div className="add-participant-level">
          <div className="add-participant-item">
            <h2>Email :</h2>
            <h3 className="add-component-item-h2">{name}</h3>
          </div>
          <div className="add-participant-item">
            <h2>Area of Interest :</h2>
            <h3 className="add-component-item-h2">{areaOfInterest}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
// {filteredParticipant.map((a, index) => (
//     <>
//         <div className='add-component'>
//             <div className='add-participant-level'>
//                 <div className='add-participant-item'><h2>Email :</h2><h3 className='add-component-item-h2'>{name}</h3></div>
//                 <div className='add-participant-item'><h2>Area of Interest :</h2><h3 className='add-component-item-h2'>{areaOfInterest}</h3></div>
//             </div>
//         </div>
//     </>))}
// </>
// )
// }
