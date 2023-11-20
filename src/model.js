// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import * as game from "./game.js";

const firebaseConfig = {
  apiKey: "AIzaSyAkOmRBIrS0ALZKZB5fPfAvgMVBabqC_SY",
  authDomain: "logcdoug-fb.firebaseapp.com",
  projectId: "logcdoug-fb",
  storageBucket: "logcdoug-fb.appspot.com",
  messagingSenderId: "599654783924",
  appId: "1:599654783924:web:bb770925b9c5374b53f0e1",
  measurementId: "G-PSV6CK7MW8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let currentUID;
let currentDocID;

export let userData = {};

let myp5;

export var test = "test";

// Sets page content depending on pageID & subpageID. Also can run app.js callback functions for event listeners.
function changePage(pageID, subpageID, callback) {
  switch (pageID) {
    case "home":
      $.get(`pages/home.html`, function (contents) {
        $("#content").html(contents);
        if (myp5 != null) {
          myp5.remove();
        }
      });
      break;
    case "play":
      if (currentUID != null) {
        $.get(`pages/play.html`, function (contents) {
          $("#content").html(contents);
          myp5 = new p5(game.s);
        });
      } else {
        window.location.hash = "#home";
      }
      break;
    case "pokedex":
      if (myp5 != null) {
        myp5.remove();
      }
      if (currentUID != null) {
        $.get(`pages/pokedex.html`, function (contents) {
          $("#content").html(contents);
        });
      } else {
        window.location.hash = "#home";
      }
      break;
    case "storage":
      if (myp5 != null) {
        myp5.remove();
      }
      if (currentUID != null) {
        $.get(`pages/storage.html`, function (contents) {
          $("#content").html(contents);
        });
      } else {
        window.location.hash = "#home";
      }
      break;
    case "trainers":
      if (myp5 != null) {
        myp5.remove();
      }
      if (currentUID != null) {
        $.get(`pages/trainers.html`, function (contents) {
          $("#content").html(contents);
        });
      } else {
        window.location.hash = "#home";
      }

      break;
    case "login":
      if (myp5 != null) {
        myp5.remove();
      }
      $.get(`pages/login.html`, function (contents) {
        $("#content").html(contents);
      });
      break;
    case "logout":
      if (myp5 != null) {
        myp5.remove();
      }
      logout();
      window.location.hash = "#home";
      break;
    default:
      $.get(`pages/home.html`, function (contents) {
        $("#content").html(contents);
        if (myp5 != null) {
          myp5.remove();
        }
      });
  }
}

export async function updateUserInfo() {
  await setDoc(
    doc(db, "Users", currentDocID),
    {
      items: userData.items,
      pokemon: userData.pokemon,
      pokedex: userData.pokedex
    },
    { merge: true }
  );
}

async function collectUserInfo(uid) {
  const q = query(collection(db, "Users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs);
  userData = querySnapshot.docs[0].data();
  currentDocID = querySnapshot.docs[0].id;

  console.log(currentDocID);
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("user id: ", uid);
    $("#login-zone").html(`<a href="#logout" class="nav-user-btn">
    <i class="fa-regular fa-user"></i>
    <p>Log Out</p>
</a>`);
    currentUID = uid;
    collectUserInfo(uid);
  } else {
    console.log("signed out");
    $("#login-zone").html(`<a href="#login" class="nav-user-btn">
    <i class="fa-regular fa-user"></i>
    <p>Log In</p>
</a>`);
    userData = {};
    currentUID = null;
  }
});

export async function addUser(uid, username) {
  let userObj = {
    uid: uid,
    username: username,
    items: {
      pokeballs: {
        poke: 50,
        great: 50,
        ultra: 50,
        master: 50,
      },

      berries: {
        razz: 50,
        nanab: 50,
        pinap: 50,
      },
    },
    pokemon: [

    ],
    pokedex: [

    ]
  };

  try {
    const docRef = await addDoc(collection(db, "Users"), userObj);
    console.log("Doc id: ", docRef.id);
  } catch (e) {
    console.log(e);
  }
}

export function createAccount() {
  console.log("account created");
  let uName = $("#uNameC").val();
  let email = $("#emailC").val();
  let pw = $("#pwC").val();
  createUserWithEmailAndPassword(auth, email, pw)
    .then((userCredentials) => {
      console.log("created ", userCredentials.user.uid);
      addUser(userCredentials.user.uid, uName);
    })
    .catch((error) => {
      console.log("error ", error.message);
    });
}

window.createAccount = createAccount;

export function login() {
  console.log("sign in");
  let email = $("#email").val();
  let pw = $("#pw").val();

  signInWithEmailAndPassword(auth, email, pw)
    .then((userCredentials) => {
      console.log("signed in as ", userCredentials.user);
    })
    .catch((error) => {
      console.log("error ", error.message);
    });
}
window.login = login;

export function logout() {
  signOut(auth)
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      console.log("error ", error.message);
    });
}

export function changeRoute() {
  let pageURL = window.location.hash.replace("#", "");
  //Splits the page url up by slashes and puts the pieces into an array
  let pageLayers = pageURL.split("/");

  //Takes each piece of the array and assigns them to pageID and subpageID respectively
  let pageID = pageLayers[0];
  let subpageID = pageLayers[1];

  changePage(pageID);
}
