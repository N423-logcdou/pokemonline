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

// //FIREBASE TEST
// export async function getAllData() {
//   // gets all the data from the collection
//   const querySnapshot = await getDocs(collection(db, "Albums"));
//   let htmlStr = "";
//   querySnapshot.forEach((doc) => {
//     htmlStr += `<div class="album-item">
//       <img src="${doc.data().photo}">
//       <p class="name">Title: ${doc.data().title}</p>
//       <p class="name">Artist: ${doc.data().artist}</p>
//       <p class="name">Genre: ${doc.data().genre}</p>
//       </div>`
//   });
//   console.log(htmlStr);

//   return htmlStr;
// }

// Sets page content depending on pageID & subpageID. Also can run app.js callback functions for event listeners.
function changePage(pageID, subpageID, callback) {
  switch (pageID) {
    case "home":
      $.get(`pages/home.html`, function (contents) {
        $("#content").html(contents);
        if (myp5 != null) {
          myp5.remove();
        }
      })
      break;
    case "play":
      $.get(`pages/play.html`, function (contents) {
        $("#content").html(contents);
        myp5 = new p5(game.s);
      });
      break;
    case "pokedex":
      $.get(`pages/pokedex.html`, function (contents) {
        $("#content").html(contents);
        if (myp5 != null) {
          myp5.remove();
        }
      });
      break;
    case "storage":
      $.get(`pages/storage.html`, function (contents) {
        $("#content").html(contents);
        if (myp5 != null) {
          myp5.remove();
        }
      });
      break;
    case "trainers":
      $.get(`pages/trainers.html`, function (contents) {
        $("#content").html(contents);
        if (myp5 != null) {
          myp5.remove();
        }
      });
      break;
    case "login":
      $.get(`pages/login.html`, function (contents) {
        $("#content").html(contents);
        if (myp5 != null) {
          myp5.remove();
        }
      });
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

export function changeRoute() {
  let pageURL = window.location.hash.replace("#", "");
  //Splits the page url up by slashes and puts the pieces into an array
  let pageLayers = pageURL.split("/");

  //Takes each piece of the array and assigns them to pageID and subpageID respectively
  let pageID = pageLayers[0];
  let subpageID = pageLayers[1];

  changePage(pageID);
}
