//firebase.js
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBB-NZ_Hd-Y8LCgdeJZdiUzqstqSU_6W78",
    authDomain: "duckgugong-react.firebaseapp.com",
    projectId: "duckgugong-react",
    storageBucket: "duckgugong-react.appspot.com",
    messagingSenderId: "455138718008",
    appId: "1:455138718008:web:0e234daddc7a1cf4ac91cd",
    measurementId: "G-3DSJ5X279T"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
// 다른 곳에서 불러올때 firestore로 불러와야 함!!
export { firestore };