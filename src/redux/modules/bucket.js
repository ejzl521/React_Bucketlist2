import { firestore } from "../../firebase";

// Action
const LOAD = 'bucket/LOAD';
const CREATE = 'bucket/CREATE';
const DELETE = 'bucket/DELETE';
const UPDATE = 'bucket/UPDATE';
const LOADED = 'bucket/LOADED';
// initialState 
const initialState = {
  loaded: false,
  list: [
    /*
    { text: "치킨 먹기", completed: false },
    { text: "컴퓨터 게임하기", completed: false },
    { text: "여행가기", completed: false }
    */
  ]
};

// Action Creators
export const loadBucket = (bucket) => {
  // 불러오는 기능은 어떤 데이터를 줄 필요가 없지만 아래와 모양새를 맞추기 위해 추가.
  return { type: LOAD, bucket };
}

export const createBucket = (bucket) => {
  // 타입뿐만 아니라 데이터도 필요하다. 
  //CreateBucket 같은 경우에는 추가할 값이 필요하다.
  return { type: CREATE, bucket };
}

export const updateBucket = (index) => {
  return { type: UPDATE, index };
}

export const deleteBucket = (index) => {
  // 타입뿐만 아니라 데이터도 필요하다. 
  return { type: DELETE, index };
}

export const loaded = (loaded) => {
  return { type: LOADED, loaded }
}

// Firestore에서 collection을 가져옴
const bucket_db = firestore.collection("bucket");

// Firebase와 통신하는 함수. 함수를 반환한다.
// Firebase에서 데이터를 가져오는 부분 (LOAD)
export const loadBucketFB = () => {
  // 함수를 반환하는 미들웨어 부분
  return function (dispatch) {

    dispatch(loaded(false))
    bucket_db.get().then((docs) => {

      // Firestore에서 가져온 데이터를 저장할 변수
      let bucket_data = [];
      // "bucket" 콜렉션의 모든 문서에서 데이터와 id를 가져옴!
      docs.forEach((doc) => {
        if (doc.exists) {
          bucket_data = [...bucket_data, { id: doc.id, ...doc.data() }]
        }
      })
      // firestore에서 가져온 데이터를 action에 넣어서 dispatch 해준다!
      // 리덕스 모듈에서 action을 dispatch 해주므로 컴포넌트에서는 firestore와
      // 통신하는 함수를 불러주면 된다!
      dispatch(loadBucket(bucket_data))
      dispatch(loaded(true));
    });
  }
}

// Firebase에 데이터를 추가하는 부분 (CREATE)
export const createBucketFB = (bucket) => {
  return function (dispatch) {
    dispatch(loaded(false));
    let bucket_data = { text: bucket, completed: false };
    bucket_db
      .add(bucket_data)
      .then((docRef) => {
        // id와 data를 추가한다!
        bucket_data = { id: docRef.id, ...bucket_data };
        // firestore에 데이터 추가를 성공했을 때는? 액션 디스패치!
        dispatch(createBucket(bucket_data));
        dispatch(loaded(true));
      })
      .catch((err) => {
        // 여긴 에러가 났을 때 들어오는 구간입니다!
        console.log(err);
        window.alert('오류가 났네요! 나중에 다시 시도해주세요!');
        dispatch(loaded(true));
      });
  };
}

// Firebase 데이터 수정하는 부분 (UPADTE)
// 파라미터 bucket을 인덱스로 사용
export const updateBucketFB = (index) => {
  return function (dispatch, getState) {

    // state에 있는 값을 가져옵니다!
    // 아래에서 getState()뒤 bucket은 스토어에서 불러온 리덕스 모듈 이름
    let bucket_data = getState().bucket.list[index];

    // id가 없으면? 바로 끝내버립시다.
    if (!bucket_data.id) {
      return;
    }

    bucket_db
      .doc(bucket_data.id)
      .update({ completed: true }) // index에 해당하는 firestore 문서의 text 변경
      .then((res) => {
        dispatch(updateBucket(index));
      })
      .catch((err) => {
        console.log("err");
      });
  };
};

// Firestore에서 데이터를 삭제하는 부분 (DELETE)
export const deleteBucketFB = (index) => {
  return function (dispatch, getState) {
    const bucket_data = getState().bucket.list[index];
    // id가 없으면? 바로 끝내버립시다.
    if (!bucket_data.id) {
      return;
    }
    // 삭제하기
    bucket_db
      .doc(bucket_data.id)
      .delete()
      .then((res) => {
        dispatch(deleteBucket(index));
      })
      .catch((err) => {
        console.log("err");
      });
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "bucket/LOAD":
      // Firestore에 데이터가 있을때 리턴
      if (action.bucket.length > 0) {
        return { ...state, list: action.bucket };
      }
      // 없으면 initialState를 리턴해줌
      return state;

    case "bucket/CREATE":
      const new_bucket_list = [...state.list, action.bucket];
      return { ...state, list: new_bucket_list };

    case "bucket/UPDATE":
      const update_bucket_list = state.list.map((item, index) => {
        if (index === action.index) {
          return { ...item, completed: true };
        }
        return item;
      })
      return { ...state, list: update_bucket_list };

    case "bucket/DELETE":
      const deleted_bucket_list = state.list.filter((item, index) => index !== action.index);
      return { ...state, list: deleted_bucket_list };
      
    case "bucket/LOADED":
      return { ...state, loaded: action.loaded }

    default:
      return state;
  }
}