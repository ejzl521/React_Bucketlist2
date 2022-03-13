//firebase.js
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC6hC9Rpa0ZuONMHhjK89iKWouRDj7SXOA",
    authDomain: "bucketlist-9f03f.firebaseapp.com",
    projectId: "bucketlist-9f03f",
    storageBucket: "bucketlist-9f03f.appspot.com",
    messagingSenderId: "997397908951",
    appId: "1:997397908951:web:4faf41010604286bfacf92",
    measurementId: "G-0H7W5H3VFH"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
// 다른 곳에서 불러올때 firestore로 불러와야 함!!
export { firestore };