//progress bar

import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

const Progress = (props) => {
    const bucket_list = useSelector(state => state.bucket.list);
    //완료된 버킷리스트 갯수 세기
    let completed = bucket_list.filter(item => item.completed === true).length;

    return (
        <ProgressBar>
            {/*전체 버킷리스트에서 몇퍼센트 완료했는지 props로 넘겨줘서 하이라이트 처리*/}
            <Highlight width={(completed/bucket_list.length)*100 + "%"}/>
            <Dot/>
        </ProgressBar>
    )
}



const ProgressBar = styled.div`
    background: #eee;
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    border-radius: 10px
`;

// transition을 사용해서 progressbar가 부드럽게 차오르게 함.
const Highlight = styled.div`
    background: blue;
    height: 100%;
    width: ${props => props.width};
    transition: width 1s;
    border-radius: 10px;
`;

// 프로그레스 바에 동그라미 달아서 프로그레스 바가 차오를때 같이 움직이게 함
const Dot = styled.div`
    background: #fff;
    border: 5px solid blue;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    box-sizing: border-box;
    margin-left: -10px;
`

export default Progress