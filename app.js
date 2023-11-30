import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
    import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
    import { getFirestore,doc, setDoc ,getDoc  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
    // firestore

    const firebaseConfig = {
      apiKey: "AIzaSyCITZ4JaopBdwHUmD_KcV5JPf1nk22qiKE",
      authDomain: "signup-and-login-18814.firebaseapp.com",
      projectId: "signup-and-login-18814",
      storageBucket: "signup-and-login-18814.appspot.com",
      messagingSenderId: "761955324033",
      appId: "1:761955324033:web:650f3ca9b0849ec453bd80",
      measurementId: "G-ZFLC2N7BXB"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

// ===================== Authentication with Google ===================== //
    document.querySelector('#loginwithGoogle').addEventListener('click', () => {
      const provider = new GoogleAuthProvider();     
        signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user;

      let userData = {
        Name: user.displayName,
        Email: user.email,
      };

      await setDoc(doc(db, "users", user.uid), {
        // collection name,   unique id of user
        ...userData, // setting array in a database
        userid: user.uid, // also user id in the database
      });

      localStorage.setItem("userUid", user.uid);

      // location.href = "../index.html";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
    //   localStorage.setItem("userUid", user.uid);
      console.log('hi')
    })
let userCurrentId = localStorage.getItem('userUid')

document.querySelector('#show').addEventListener('click',async ()=>{

    let usersRef = doc(db, "users", userCurrentId);
    const userSnap = await getDoc(usersRef);
    // console.log(userSnap.data().sname)
    
//   console.log('hi')
})
let nameed = document.querySelector('#nameed')
let email = document.querySelector('#email')
onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      //   const uid = user.uid;
      let usersRef = doc(db, "users", userCurrentId);
    const userSnap = await getDoc(usersRef);
      if (userSnap.exists()) {
        // console.log(userSnap.data().Email)
    //    document.write(userSnap.data().Name , " " ,userSnap.data().Email)
    nameed.textContent = userSnap.data().Name ;

    email.innerHTML = userSnap.data().Email
    //     console.log(userSnap.data().Name)
    // console.log(userSnap.data().Email)
        // gname.innerHTML = "Name :" + userSnap.data().Name;
        // gemail.innerHTML = "Email :" + userSnap.data().Email;
        // gphone.innerHTML = "Phone No :" + userSnap.data().Phone_NO
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      // ...
    } else {
      // User is signed out
      alert('wrong')
    //   window.location ='../signup/signup.html'
      // ...
    }
  });
  