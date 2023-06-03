const newBookmarkForm = document.getElementById("bookmark-item-input-form");

const bookmarkList = [];
if (localStorage.getItem("bookmarkList")) {
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
} else {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
}

let isAddBtnClick = false;
newBookmarkForm.style.display = "none";