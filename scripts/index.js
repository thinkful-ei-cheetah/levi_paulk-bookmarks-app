'use strict';

$(document).ready(function() {
    handlers.bindEventListeners();

    api.getBookmarks()
        .then(bookmarks => {
            bookmarks.forEach((bookmark) => library.addBookmark(bookmark));
            handlers.render();
        })
        .catch(error => console.log(error));

    handlers.render();
});