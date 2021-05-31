import React from "react";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  let history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Logout clicked!");
    sessionStorage.removeItem("token");
    history.push("/sign-in");
    window.location.reload();
  };

  return (
    <div>
      <button onClick={handleClick} className="btn btn-primary btn-block">
        Logout
      </button>
      <h3>This is the dashboard component</h3>
    </div>
  );
};

export default Dashboard;
