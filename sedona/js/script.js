document.documentElement
  .classList.add("js");

var open = document.querySelector(".btn-search-hotel");
var openSearch = document.querySelector(".modal-search-hotel");

open.addEventListener("click", function (evt) {
  evt.preventDefault();
  openSearch.classList.toggle("modal-search-hotel-open");
});
