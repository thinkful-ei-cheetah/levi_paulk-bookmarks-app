'use strict';

const library = (function(){
    const addBookmark = function(bookmark) {
      const newBookmark = { bookmark , details: false };
      try {
        library.bookmarks.push(newBookmark);
      } catch(e) {
        console.log(e.message);
      }
    };
  
    const findById = function(id) {
      return this.bookmarks.find(bookmark => bookmark.id === id);
    };
  
  
    const findAndDelete = function(id) {
      const bookmarkIndex = this.bookmarks.findIndex(bookmark => bookmark.id === id);
      this.bookmarks.splice(bookmarkIndex, 1);
    };
  
    const findAndUpdate = function(id, newData) {
        Object.assign(library.bookmarks.find(bookmark => bookmark.id === id), newData);
    };
  
    const setBookmarkIsEditing = function(id, isEditing) {
      const bookmark = this.findById(id);
      bookmark.isEditing = isEditing;
    };

    const toggleBookmarkDetails = function(id) {
        const bookmark = this.findById(id);
        bookmark.details = !bookmark.details;
    };

    return {
      bookmarks: [],
      ratingFilter: 0,
      error: null,
      addBookmarkForm: false,
  
      addBookmark,
      findById,
      findAndUpdate,
      findAndDelete,
      setBookmarkIsEditing,
      toggleBookmarkDetails,
    };
    
  }());