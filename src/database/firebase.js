import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";
import 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBfrlDiK0GZu0hn9hOg1EhBxgBdiPTu6P4",
    authDomain: "botanybuddies-23689.firebaseapp.com",
    databaseURL: "https://botanybuddies-23689-default-rtdb.firebaseio.com",
    projectId: "botanybuddies-23689",
    storageBucket: "botanybuddies-23689.appspot.com",
    messagingSenderId: "671647057928",
    appId: "1:671647057928:web:d5c99068dedf58b6ada9bd",
    measurementId: "G-2FNSPQHKEN"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var user = null;

export const auth = firebase.auth();
export const storage = firebase.storage()
const googleProvider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = (setUser) => {
  auth.signInWithPopup(googleProvider).then((res) => {
    const { displayName, email, uid, photoURL, metadata } = res.user;
    let user = {
      displayName, email, uid, photoURL, metadata
    }
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user))
    setUser("logged in");
  }).catch((error) => {
    console.log(error.message)
  })
}

export const getUser = () => {
  auth.onAuthStateChanged(async userData => {
    const { displayName, email, uid, photoURL} = userData;
    let user = {
      displayName, email, uid, photoURL
    }
    console.log(user);
    return user;
  })
}

export const logOut = (setuser) => {
  auth.signOut().then(()=> {
    localStorage.setItem("user", null)
    setuser("not logged in");
    user = null;
  }).catch((error) => {
    console.log(error.message)
  })
}

export const writePost = (data) => {
  var defaultDatabase = firebase.database();
  let ref = defaultDatabase.ref("/")
  let newWorkout = ref.child(`posts/${data.user}`).push();
  newWorkout.set(data)
  console.log(data);
}

export const getPost = (user, callback) => {
  var defaultDatabase = firebase.database();
  let ref = defaultDatabase.ref("/");
  let posts = ref.child(`posts/${user.uid}`);
  posts.on('value', (snapshot) => {
    callback(snapshot.val());
  })
  // ref.on("value", snapshot => {
  //   const state = snapshot.val();
  //   this.setState(state);
  // });
};

export const newImage = (user, imgLink) => {
  var defaultDatabase = firebase.database();
  let ref = defaultDatabase.ref("/")
  let newImage = ref.child(`images/${user.uid}`).push();
  newImage.set({link: imgLink})
}

export const getImages = (user, callback) => {
  var defaultDatabase = firebase.database();
  let ref = defaultDatabase.ref("/");
  let images = ref.child(`images/${user.uid}`);
  images.on('value', (snapshot) => {
    callback(snapshot.val());
  })
  // ref.on("value", snapshot => {
  //   const state = snapshot.val();
  //   this.setState(state);
  // });
}
