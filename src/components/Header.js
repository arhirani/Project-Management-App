import React from "react";
import { Jumbotron } from "reactstrap";

const Header = () => {
  return (
    <div>
      <Jumbotron
        style={{ background: "black", color: "white", padding: "30px 20px" }}
      >
        <h4>Projects/ENV1.5</h4>
        <h1>Releases</h1>
      </Jumbotron>
    </div>
  );
};

export default Header;
