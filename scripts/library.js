'use strict';

const library = (function(){
    const addBookmark = function(bookmark) {
      try {
        library.bookmarks.push(bookmark);
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
  
    const toggleRatingFilter = function() {
      this.ratingFilter = !this.ratingFilter;
    };
  
    const setBookmarkIsEditing = function(id, isEditing) {
      const bookmark = this.findById(id);
      bookmark.isEditing = isEditing;
    };

    const toggleBookmarkDetails = function(id) {
        const bookmark = this.findById(id);
        bookmark.details = !bookmark.details;
    };
   
    let error = null;
  
    return {
      bookmarks: [],
      ratingFilter: false,
      searchTerm: '',
      error,
  
      addBookmark,
      findById,
      findAndUpdate,
      findAndDelete,
      toggleRatingFilter,
      setBookmarkIsEditing,
      toggleBookmarkDetails,
    };
    
  }());