import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";


const BucketList = (props) => {
  
  const my_lists = useSelector(state => state.bucket.list);
  return (
    <ListStyle>
      {my_lists.map((list, index) => {
        return (
          <ItemStyle
            key={index}
            // styled-component에 props로 색을 넘겨줌
            // 버킷리스트가 completed 되었다면 slateblue 아니면 aliceblue
            color={list.completed? "slateblue": "aliceblue"}
            // 버킷리스트가 completd 되었다면 글씨 색깔이 흰색!
            font_color={list.completed? "#fff": "black"}
            onClick={() => {
              // 배열의 몇번째 항목을 선택했는 지, url 파라미터로 넘겨줌!
              props.history.push("/detail/" + index);
            }}>
            {list.text}
          </ItemStyle>
        );
      })}
    </ListStyle>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  overflow-y: auto;
`;

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  background-color: ${props => props.color};
  color: ${props => props.font_color};
  font-weight: bold;
`;

export default BucketList;