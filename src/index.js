import * as MODEL from "./model.js";
import * as game from "./game.js";

function changeRoute() {
  let pageURL = window.location.hash.replace("#", "");
  //Splits the page url up by slashes and puts the pieces into an array
  let pageLayers = pageURL.split("/");

  //Takes each piece of the array and assigns them to pageID and subpageID respectively
  let pageID = pageLayers[0];
  let subpageID = pageLayers[1];

  //Loads different model functions depending on the pageID
  if (pageID == "" || pageID == "home") {
    MODEL.changePage(pageID);
  } else {
    MODEL.changePage(pageID);
  }
}

function initListeners() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}

$(document).ready(function () {
  initListeners();
});
