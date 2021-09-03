import React from "react";

const PageNotFound = (props) => {
  return (
    <div>
      <h1>주소가 올바르지 않아요!</h1>
      <button onClick={props.history.goBack()}>뒤로가기</button>
    </div>
  );
};

export default PageNotFound;