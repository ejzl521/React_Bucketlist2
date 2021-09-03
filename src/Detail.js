import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBucketFB, updateBucketFB } from "./redux/modules/bucket";
const Detail = (props) => {

    const dispatch = useDispatch();
    // url 파라미터에서 배열의 인덱스 가져오기
    let bucket_index = parseInt(props.match.params.index);
    const bucket_list = useSelector(state => state.bucket.list);

    return (
        <div>
            <h1>{bucket_list[bucket_index].text}</h1>
            <button onClick={() => {
                dispatch(deleteBucketFB(bucket_index));
                props.history.goBack();
            }}>
                삭제
            </button>
            <button onClick={() => {
                dispatch(updateBucketFB(bucket_index));
                props.history.goBack();
            }}>
                완료
            </button>
        </div>
    );
}

export default Detail;