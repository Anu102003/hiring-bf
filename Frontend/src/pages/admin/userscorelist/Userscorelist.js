import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/admin/userscore/userscorelist.css";
import { score } from "../../../database/score";
import { request } from "../helper/axios_helper";
import { useNavigate, useParams } from "react-router-dom";
import RadialBarChart from "./RadialBarChart";
export const Userscorelist = () => {
  const nav = useNavigate();

  const [searchScoreText, setSearchScoreText] = useState("");
  const [data, setData] = useState(score);
  const [sortedUsers, setSortedUsers] = useState();
  const filteredScoreData = data.filter((item) =>
    item.name.toLowerCase().includes(searchScoreText.toLowerCase())
  );

  const [chart, setChart] = useState({
    participants: 0,
    pass: 0,
    fail: 0,
    Na: 0,
  });
  const [contest, setContest] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const { id } = useParams();
  const [users, setUsers] = useState([]);

  const handleSearchScoreChange = (e) => {
    setSearchScoreText(e.target.value);
  };

  const [clickedCard, setClickedCard] = useState("");
  const handlescoreclick = (e) => {
    setClickedCard(e);
    nav(`/individualscore/${e}`);
  };

  const [passPercentage, setPassPercentage] = useState(0);
  const handlePassPercentageChange = (e) => {
    setPassPercentage(e.target.value);
  };

  const loadUsers = async () => {
    request("GET", `/admin/getUser/${id}`).then((res) => {
      const sortedUsers = res.data.data.sort(
        (a, b) => b.totalMarks - a.totalMarks
      );
      setUsers(res.data.data);
      console.log(res.data.data);
      setSortedUsers(sortedUsers);
      sortedUsers.forEach((user, index) => {
        user.rank = index + 1;
      });
    });

    request("GET", `/admin/getContest/${id}`).then((res) => {
      setContest(res.data.data);
    });

    request("GET", `/admin/pass/${id}/${passPercentage}`).then((res) => {
      setChart(res.data.data);
      console.log(res.data.data);
    });
  };
  const handlePassPercentageSubmit = (e) => {
    e.preventDefault();
    console.log(passPercentage);
    loadUsers();
  };
  return (
    <>
      <div className="score-container">
        <div className="score-card">
          <h1>Candidate Score</h1>
          <div className="score-details">
            <h2>Contest Name :</h2>
            <h4 className="contest-names">{contest.name}</h4>
          </div>
          <div className="score-chart">
            <RadialBarChart chart={chart} />
          </div>
          {/* <div className="score-details">
                            <h2>Total No of Participant :</h2>
                            <h4 className='contest-names'>45</h4>
                        </div>
                        <div className="score-details">
                            <h3>Pass :</h3>
                            <h4 className='contest-name'>10</h4>
                        </div>
                        <div className="score-details">
                            <h3>Fail :</h3>
                            <h4 className='contest-name'>29</h4>
                        </div>
                        <div className="score-details">
                            <h3>Absentence :</h3>
                            <h4 className='contest-name'>12</h4>
                        </div> */}
          <div className="score-list">
            <div className="score-details">
              <h3>Pass Percentage :</h3>
              <input
                type="text"
                className="inputs"
                placeholder="Enter Contest Name"
                name="contestName"
                onChange={(e) => handlePassPercentageChange(e)}
              />
              <button
                onClick={(e) => {
                  handlePassPercentageSubmit(e);
                }}
              >
                Submit
              </button>
            </div>
          </div>
          <h2>Leaderboard:</h2>
          <div className="search-container">
            <div className="search-bar">
              <span className="search-icon">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
              <input
                className="nav-card__search-input"
                type="text"
                placeholder="Enter the Candidate Name"
                value={searchScoreText}
                onChange={handleSearchScoreChange}
              />
            </div>
          </div>

          <div class="table table-user">
            <div class="header">
              <div class="cell">Rank</div>
              <div class="cell">Name</div>
              <div class="cell">MCQ Score</div>
              <div class="cell">Programming Score</div>
            </div>
            {users.map((item, index) => {
              const mcqMarks = item.mcqMarks
                .split(",")
                .map((part) => part.trim());
              let totalMCQScore = 0;

              mcqMarks.forEach((part) => {
                const [category, value] = part
                  .split(":")
                  .map((item) => item.trim());
                totalMCQScore += parseInt(value);
              });

              return (
                <div class="row" onClick={() => handlescoreclick(item.userId)}>
                  <div class="cell">{item.rank}</div>
                  <div class="cell">{item.name}</div>
                  <div class="cell">{totalMCQScore}</div>
                  <div class="cell">{item.codeMarks}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
