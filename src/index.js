import * as MODEL from "./model.js";

function initListeners() {
  $(window).on("hashchange", MODEL.changeRoute);
}

$(document).ready(function () {
  initListeners();
  MODEL.changeRoute();
});
