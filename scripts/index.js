'use strict';

$(document).ready(function() {
    handlers.bindEventListeners();

    api.getBookmarks()
        .then(bookmarks => {
            bookmarks.forEach((bookmark) => library.addbookmark(bookmark));
            handlers.render();
        })
        .catch(error => console.log(error));
});