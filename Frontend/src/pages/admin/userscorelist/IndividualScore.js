import React, { useEffect, useState } from "react";
import { request } from "../helper/axios_helper";
import { useParams } from "react-router-dom";
import ColumnbarChart from "./ColumnBarChart";

export const IndividualScore = () => {
  const [guest, setGuest] = useState([]);
  const [partObjects, setPartObj] = useState([]); // Initialize an empty array for parts
  const { id } = useParams();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
      const res = await request("GET", `/guest/getUserScore/${id}`);
      const userData = res.data.data;
      setGuest(userData);
      console.log(useState)
      const inputString = userData.mcqMarks;
      const partsArray = inputString.split(",").map((part) => part.trim());
      console.log(res.data.data.mcqMarks)

      const parts = partsArray.map((part) => {
        const [name, value] = part.split(":").map((item) => item.trim());
        return { name, value };
      });

      setPartObj(parts);
  };

  return (
    <>
    {
        guest ?
        (<div className='score-container'>
        <div className='score-card'>
            <div className='score-flex'>
                <div className='score-flex1'>
                                <h1>Score</h1>
                                <div className='individual-score'>
                                    <h2>Name :</h2>
                                    <h2 className='score-datas'>{guest.name}</h2>
                                </div>
                                <div className='individual-score'>
                                    <h2>Email :</h2>
                                    <h2 className='score-datas'>{guest.email}</h2>
                                </div>
                                <div className='individual-score'>
                                    <h2>Mcq Marks :</h2>
                                    <div className='mcq-list'>
                                    <ul>
                                        {partObjects.map((data) => (
                                            <li>
                                                <div className="name-value">
                                                    <h3 className="value-head">{data.name}</h3>
                                                    <div className="value">
                                                        <h4>{data.value}</h4>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    </div>
                                </div>
                                <div className='individual-score'>
                                    <h2>Code Marks:</h2>
                                    <h2 className='score-datas'>{guest.codeMarks}</h2>
                                </div>
                                <div className='individual-score'>
                                    <h2>Total Marks:</h2>
                                    <h2 className='score-datas'>{guest.totalMarks}</h2>
                                </div>
                </div>
                <div className='score-flex2'>
                    <ColumnbarChart mcq={partObjects} />
                </div>
            </div>
        </div>
    </div> ) : <div>Loading...</div>
    }
    </>
  );
};
