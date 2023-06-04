(function () {
    const newBookmarkForm = document.getElementById("bookmark-item-input-form");
    const bookmarkItemList = document.getElementById("bookmark-list");

    let bookmarkList = [];
    if (localStorage.getItem("bookmarkList")) {
        bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
    } else {
        localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
    }

    const addBookmarkItem = () => {
        let bookmarkList = [];
        if (localStorage.getItem("bookmarkList")) {
            bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
        }
        let name = document.getElementById("new-bookmark-name-input").value;
        let url = document.getElementById("new-bookmark-url-input").value;
        let createAt = Date.now();
        bookmarkList.push({ name: name, url: url, createAt: createAt });
        localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
        document.getElementById("new-bookmark-name-input").value = "";
        document.getElementById("new-bookmark-url-input").value = "";
        setBookmarkItem({ name: name, url: url, createAt: createAt });
        newBookmarkToggle();
    }

    let isAddBtnClick = false;
    newBookmarkForm.style.display = "none";

    const newBookmarkToggle = () => {
        isAddBtnClick = !isAddBtnClick;
        isAddBtnClick ? (newBookmarkForm.style.display = "block") : (newBookmarkForm.style.display = "none");
    }

    const deleteBookmarkItem = (id) => {
        const isDelete = window.confirm("정말 삭제하시겠습니까?");
        if (isDelete) {
            let bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
            let nowBookmarkList = bookmarkList.filter((elm) => elm.createAt !== id);
            localStorage.setItem("bookmarkList", JSON.stringify(nowBookmarkList));
            document.getElementById(`bookmark-item-${id}`).remove();
        }
    }

    const setBookmarkItem = (item) => {
        const bookmarkItem = document.createElement("div");
        bookmarkItem.classList.add("bookmark-item");
        bookmarkItem.id = `bookmark-item-${item.createAt}`;

        const bookmarkInfo = document.createElement("div");
        bookmarkInfo.classList.add("bookmark-info");
        const bookmarkUrl = document.createElement("a");
        bookmarkUrl.classList.add("bookmark-url");
        bookmarkUrl.href = item.url;

        const urlIcon = document.createElement("div");
        urlIcon.classList.add("url-icon");

        const urlIconImg = document.createElement("img");
        urlIconImg.src = `https://www.google.com/s2/favicons?domain_url=${item.url}`;

        const nameElement = document.createElement("div");
        nameElement.classList.add("name");
        nameElement.textContent = item.name;

        const bookmarkDelBtn = document.createElement("div");
        bookmarkDelBtn.textContent = "삭제";
        bookmarkDelBtn.classList.add("del-btn");
        bookmarkDelBtn.addEventListener("click", () => {
            deleteBookmarkItem(item.createAt);
        });

        bookmarkItem.appendChild(bookmarkInfo);
        bookmarkItem.appendChild(bookmarkDelBtn);
        bookmarkInfo.appendChild(bookmarkUrl);
        bookmarkUrl.appendChild(urlIcon);
        bookmarkUrl.appendChild(nameElement);
        urlIcon.append(urlIconImg);

        bookmarkItemList.appendChild(bookmarkItem);
    }

    const setBookmarkList = () => {
        bookmarkList.forEach((item) => {
            setBookmarkItem(item);
        })
    }

    document.getElementById("bookmark-item-add-btn").addEventListener("click", newBookmarkToggle);
    document.getElementById("add-btn").addEventListener("click", addBookmarkItem);
    document.getElementById("cancel-btn").addEventListener("click", newBookmarkToggle);
    setBookmarkList();
})();