import * as MODEL from "./model.js";

function initListeners() {
  $(window).on("hashchange", MODEL.changeRoute);

  $("#logout").on("click", MODEL.logout);
}

$(document).ready(function () {
  initListeners();
  MODEL.changeRoute();
});
