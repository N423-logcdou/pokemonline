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
  or,
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

let pokedexList = [
  { name: "pidgey", encountered: false },
  { name: "sentret", encountered: false },
  { name: "wurmple", encountered: false },
  { name: "zigzagoon", encountered: false },
  { name: "oddish", encountered: false },
  { name: "paras", encountered: false },
  { name: "gligar", encountered: false },
  { name: "tentacruel", encountered: false },
  { name: "jumpluff", encountered: false },
  { name: "drifblim", encountered: false },
  { name: "ditto", encountered: false },
];

let selectedPokemon = null;

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
          pokedexLoad();
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
          storageLoad();
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
          trainersLoad();
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

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearPokedex() {
  pokedexList.forEach((dex) => {
    dex.encountered = false;
  });
}

function storageLoad() {
  $(".storage").html("");
  userData.pokemon.forEach((pokemon, index) => {
    $(".storage").append(
      `<div class="storage-box" id="storage-box-${index}">
        <div class="storage-img-box">
  
      <img src="./images/game-images/pokemon/${pokemon.name}.png">
      </div>
      <h6>Lvl. ${pokemon.level}<h6>
      <div class="nickname-box">
      <h5>${pokemon.nickname}</h5>
      <button type="button" class="btn btn-primary edit-nickname-btn" id="edit-nickname-btn-${index}" data-bs-toggle="modal" data-bs-target="#edit-name-${index}">
      <i class="fa-solid fa-pencil"></i>
      </button>
      </div>
      
      <button type="button" class="btn btn-danger delete-pokemon-btn" id="delete-pokemon-btn-${index}" data-bs-toggle="modal" data-bs-target="#delete-pokemon-modal-${index}">
        Release
      </button>
      <div class="storage-type-box" id="storage-type-box-${index}"></div>
      </div>

      <!-- The Modal -->
      <div class="modal" id="edit-name-${index}">
        <div class="modal-dialog">
          <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Rename Pokémon</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
      <input type="text" id="nickname-field-${index}" class="form-control" value="${pokemon.nickname}"/>
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-primary nickname-confirm" data-bs-dismiss="modal" id="nickname-confirm-${index}">Confirm</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div>
      </div>
      </div>
      </div>


      <!-- The Modal -->
      <div class="modal" id="delete-pokemon-modal-${index}">
        <div class="modal-dialog">
          <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Release Pokémon?</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
      <p>Are you sure you want to release this Pokémon? You can't reverse this.</p>
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-danger release-confirm" data-bs-dismiss="modal" id="release-confirm-${index}">Confirm</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>
      `
    );
  });

  $(".edit-nickname-btn").on("click", function () {
    selectedPokemon = $(this).attr("id").substring(18);
    console.log(selectedPokemon);
  });

  $(".nickname-confirm").on("click", function () {
    userData.pokemon[selectedPokemon].nickname = $(
      `#nickname-field-${selectedPokemon}`
    ).val();
    updateUserInfo();
    storageLoad();
  });

  $(".delete-pokemon-btn").on("click", function () {
    selectedPokemon = $(this).attr("id").substring(19);
    console.log(selectedPokemon);
  });

  $(".release-confirm").on("click", function () {
    userData.pokemon.splice(selectedPokemon, 1);

    updateUserInfo();
    storageLoad();
  });
}

async function trainersQuery() {
  let searchTrainer = $("#trainer-search").val();
  const q = query(
    collection(db, "Users"),
    where("username", ">=", searchTrainer),
    where("username", "<=", searchTrainer + "\uf8ff")
  );
  $("#trainers").html("");
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    querySnapshot.forEach((doc) => {
      $("#trainers").append(`
    <div class="trainer">
        <div class="trainer-info-left">
            <div class="trainer-icon">
                <img src="./images/game-images/pokemon/missing.png" alt="">
            </div>
            <h4>${doc.data().username}</h4>
        </div>
        
        <div class="trainer-info-right">
            <p>Pokemon Caught: ${doc.data().pokemon.length}</p>
            <p>Pokédex: ${doc.data().pokedex.length}</p>
        </div>
       
    </div>`);
    });
  } else {
    console.log("no data");
  }
}

async function trainersLoad() {
  $("#trainer-search-submit").on("click", function (event) {
    event.preventDefault();
    trainersQuery();
  });
  $("#trainers").html("");
  const querySnapshot = await getDocs(collection(db, "Users"));
  querySnapshot.forEach((doc) => {
    $("#trainers").append(`
    <div class="trainer">
        <div class="trainer-info-left">
            <div class="trainer-icon">
                <img src="./images/game-images/pokemon/missing.png" alt="">
            </div>
            <h4>${doc.data().username}</h4>
        </div>
        
        <div class="trainer-info-right">
            <p>Pokemon Caught: ${doc.data().pokemon.length}</p>
            <p>Pokédex: ${doc.data().pokedex.length}</p>
        </div>
       
    </div>`);
  });
}

async function pokedexLoad() {
  userData.pokedex.forEach((pokemon) => {
    pokedexList.forEach((dex) => {
      if (pokemon.name == dex.name) {
        dex.encountered = true;
      }
    });
  });

  console.log(pokedexList);

  await pokedexList.forEach((dex, index) => {
    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${dex.name}`, function (data) {
      if (dex.encountered) {
        $(".pokedex").append(
          `<div class="pokedex-box" id="pokedex-box-${index}">
            <div class="pokedex-img-box">
  
          <img src="./images/game-images/pokemon/${data.name}.png">
          </div>
          <h6>#${index + 1}<h6>
          <h5>${capitalizeFirstLetter(dex.name)}</h5>
          <div class="pokedex-type-box" id="pokedex-type-box-${index}"></div>
          </div>
          `
        );

        data.types.forEach((type) => {
          $(`#pokedex-type-box-${index}`).append(
            `<p class="type-text, ${type.type.name}">${capitalizeFirstLetter(
              type.type.name
            )}</p>`
          );
        });
      } else {
        $(".pokedex").append(
          `<div class="pokedex-box" id="pokedex-box-${index}">
            <div class="pokedex-img-box">
    
          <img src="./images/game-images/pokemon/missing.png">
          </div>
          <h6>#${index + 1}<h6>
          <h5>?????</h5>
          <div class="pokedex-type-box" id="pokedex-type-box-${index}"></div>
          </div>
          `
        );
      }
    });
  });
}

export async function updateUserInfo() {
  await setDoc(
    doc(db, "Users", currentDocID),
    {
      items: userData.items,
      pokemon: userData.pokemon,
      pokedex: userData.pokedex,
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
  clearPokedex();
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
    pokemon: [],
    pokedex: [],
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
