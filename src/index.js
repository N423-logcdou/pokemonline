import * as MODEL from "./model.js";

function initListeners() {
  $(window).on("hashchange", MODEL.changeRoute);

  $("#logout").on("click", MODEL.logout);
  $("#nav-hamburger-btn").on("click", MODEL.toggleHamburger);
}

$(document).ready(function () {
  initListeners();
  MODEL.changeRoute();
});
