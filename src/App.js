import React from 'react';
import styled from "styled-components";
import BucketList from './BucketList';
import Progress from './Progress';
import Spinner from './Spinner';
import Detail from "./Detail";
import PageNotFound from './PageNotFound';
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createBucketFB, loadBucketFB } from './redux/modules/bucket';
import { Switch } from 'react-router';
import './App.css';


const App = (props) => {

  const text = React.useRef();
  const loaded = useSelector(state => state.bucket.loaded);

  // Firestore에서 데이터 불러오기
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadBucketFB())
  }, [])

  const addBucketList = () => {
    const new_item = text.current.value;
    dispatch(createBucketFB(new_item));
  }

  return (
    <div className="App">
      <Container>
        <Title>내 버킷리스트</Title>
        <Progress />
        <Line />
        {loaded ? (       
          <Switch>
            {/*props가 있는 라우터는 history 객체를 props로 다시 받아줘야 함!!*/}
            <Route exact path="/" render={(props) => (<BucketList history={props.history} />)} />
            <Route path="/detail/:index" component={Detail} />
            <Route component={PageNotFound} />
          </Switch>
        ) : (
          <Spinner />
        )}
      </Container>
      <Input>
        <input type="text" ref={text} />
        <button onClick={addBucketList}>추가하기</button>
      </Input>
    </div>
  );
}

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 10px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;

  & * {
    padding: 5px;
  }

  & input{
    margin-right: 5px;
    &:focus{
      border: 3px solid slateblue;
    }
  }

  & button {
    width: 25%;
    color: #fff;
    background-color: slateblue;
    border-radius: 10px;
    border: 0;
    font-weight: bold;
  }
`;

const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

export default withRouter(App);