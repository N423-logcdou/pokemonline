// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";

import * as game from "./game.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

let myp5;

export var test = "test";

// Sets page content depending on pageID & subpageID. Also can run app.js callback functions for event listeners.
export function changePage(pageID, subpageID, callback) {
  if (pageID == "" || pageID == "home") {
    $.get(`pages/home.html`, function (contents) {
      $("#content").html(contents);
      myp5.remove();
    });
  } else if (pageID == "play") {
    $.get(`pages/play.html`, function (contents) {
      $("#content").html(contents);
      myp5 = new p5(game.s);
    });
  } else if (pageID == "pokedex") {
    $.get(`pages/pokedex.html`, function (contents) {
      $("#content").html(contents);
      myp5.remove();
    });
  } else if (pageID == "storage") {
    $.get(`pages/storage.html`, function (contents) {
      $("#content").html(contents);
      myp5.remove();
    });
  } else if (pageID == "trainers") {
    $.get(`pages/trainers.html`, function (contents) {
      $("#content").html(contents);
      myp5.remove();
    });
  } else if (pageID == "login") {
    $.get(`pages/login.html`, function (contents) {
      $("#content").html(contents);
      myp5.remove();
    });
  }
}
