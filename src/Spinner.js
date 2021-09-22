import React from "react";
import styled from "styled-components";
import {AccessTime} from "@material-ui/icons";

const Spinner = (props) => {

    return (
      <Outter>
        <AccessTime style={{ color: "yellow", fontSize: "300px" }} />
      </Outter>
    );
}

const Outter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ede2ff;
`;

export default Spinner;