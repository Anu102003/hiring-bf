import React, { useEffect, useState } from 'react';
import "../../assets/user/contestdetails.css";
import { Link, useParams } from 'react-router-dom';
import { getAuthToken, request } from '../admin/helper/axios_helper';

export const Contestdetails = () => {
  const { id } = useParams();
  const [contest, setContest] = useState();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const token = getAuthToken();
    await request("GET", `/guest/contests/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setContest(res.data[0]);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Format date without time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };

  return (
    <>
      {contest ? (
        <>
          <div className='contest-heading'>
            <h1>Contest</h1>
          </div>
          <div className='contest-card'>
            <div className='contest-title'>
              <h2>{contest.name}</h2>
              <p>
                {formatDate(contest.startTime)} to {formatDate(contest.endTime)}
              </p>
            </div>
            <div className='contest-details'>
              <h3>Description :</h3>
              <p>{contest.details}</p>
              <h3>Rules :</h3>
              <ul>
                {contest.rules.split('\n').map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
              <div className='contest-score'>
                <h3>Total Score :</h3>
                <p>{contest.totalScore}</p>
              </div>
            </div>
            <div className='contest-enter-btn'>
              <Link to={`/mcq/${id}`}>
                <button>Enter Contest</button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div> Loading... </div>
      )}
    </>
  );
};
