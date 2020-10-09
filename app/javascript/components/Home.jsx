import React from "react";
import { withRouter } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="home-main-container">
      <div>This is home</div>
      <button onClick={() => props.history.push("/login")}>Go to login</button>
      <button
        onClick={() =>
          props.history.push({ pathname: "/signup", state: { isModal: true } })
        }
      >
        Sign Up
      </button>
    </div>
  );
};

export default withRouter(Home);
