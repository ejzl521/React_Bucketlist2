import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBucketFB, updateBucketFB } from "./redux/modules/bucket";
import Button from '@material-ui/core/Button';


const Detail = (props) => {

    const dispatch = useDispatch();
    // url 파라미터에서 배열의 인덱스 가져오기
    let bucket_index = parseInt(props.match.params.index);
    const bucket_list = useSelector(state => state.bucket.list);

    return (
        <div>
            <h1>{bucket_list[bucket_index].text}</h1>

            <Button
                onClick={() => {
                    dispatch(deleteBucketFB(bucket_index));
                    props.history.goBack();
                }}
                variant="outlined"
            >
                삭제
            </Button>
            <Button
                onClick={() => {
                    dispatch(updateBucketFB(bucket_index));
                    props.history.goBack();
                }}
                variant="outlined"
            >
                완료
            </Button>
        </div>
    );
}

export default Detail;