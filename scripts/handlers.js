'use strict';

/* global api handlers library*/

const handlers = (function(){

  function generateBookmarkElement(bookmark) {
    const editBtnStatus = bookmark.checked ? 'disabled' : '';

    let bookmarkDesc = `<p class="grid-item col-4 bookmark-description">${bookmark.desc}</p>`;
    if (bookmark.isEditing) {
      bookmarkDesc = `
        <form class="js-edit-bookmark">
          <input class="grid-item col-4 bookmark-description" type="text" value="${bookmark.desc}" />
        </form>
      `;
    }

    return `<li class="grid-row css-box bookmark" data-bookmark-id="${bookmark.id}">
            <span class="grid-item col-1 bookmark-title">${bookmark.title}</span>
            <div class="grid-item col-1 bookmark-rating">
              ${generateBookmarkRatingDisplay(bookmark.rating)}
            </div>
            <button class="grid-item col-1 bookmark-delete">Delete</button>
            <button class="grid-item col-1 bookmark-details">Details</button>
            <div class="grid-row col-4 bookmark-details hidden">
                <button class="grid-item col-1 bookmark-url-button" onclick="window.open('${bookmark.url}', '_blank'); return false;">Visit site</button>
                <button class="grid-item col-1 bookmark-edit-desc-button js-edit-bookmark" ${editBtnStatus}>Edit Description</button>
                ${bookmarkDesc}
            </div>
        </li>`;
  }
  
  function generateBookmarkRatingDisplay(rating) {
    if (rating === 5) {
      return `
        <input type="radio" id="star5" name="rate" value="5" checked/>
        <label for="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" />
        <label for="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" />
        <label for="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" />
        <label for="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" />
        <label for="star1" title="text">1 star</label>`;
    }
    if (rating === 4) {
      return `
        <input type="radio" id="star5" name="rate" value="5" />
        <label for="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" checked/>
        <label for="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" />
        <label for="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" />
        <label for="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" />
        <label for="star1" title="text">1 star</label>`;
    }
    if (rating === 3) {
      return `
        <input type="radio" id="star5" name="rate" value="5" />
        <label for="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" />
        <label for="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" checked/>
        <label for="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" />
        <label for="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" />
        <label for="star1" title="text">1 star</label>`;
    }
    if (rating === 2) {
      return `
        <input type="radio" id="star5" name="rate" value="5" />
        <label for="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" />
        <label for="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" />
        <label for="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" checked/>
        <label for="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" />
        <label for="star1" title="text">1 star</label>`;
    }
    if (rating === 1) {
      return `
        <input type="radio" id="star5" name="rate" value="5" />
        <label for="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" />
        <label for="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" />
        <label for="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" />
        <label for="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" checked/>
        <label for="star1" title="text">1 star</label>`;
    }
  }
  
  function generateLibraryBookmarksString(library) {
    const bookmarks = library.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }
  
  
  function render() {
    // Check if an error occured, if so display the error in the error display
    if (library.error) {
      $(".error-display").html(library.error.message);
      $(".error-display").removeClass('hidden');
      console.log(`render ran ` + library.error.message);
    }
    
    if (library.addBookmarkForm) {
      $('.new-bookmark-form').removeClass('hidden');
    }

    else {
      $(".error-display").html('');
      $(".error-display").addClass('hidden');
      $(".new-bookmark-form").addClass('hidden');

      let bookmarks = [ ...library.bookmarks ];
      let totalBookmarks = bookmarks.length();
      if (library.ratingFilter > 0) {
        bookmarks = bookmarks.filter(bookmark => bookmark > library.ratingFilter);
      }
      let displayedBookmarks = bookmarks.length;
    
      // render the bookmarks in the DOM
      console.log('`render` ran');
      const libraryBookmarkString = generateLibraryBookmarksString(bookmarks);
      
      // insert that HTML into the DOM
      $('.bookmarks').html(libraryBookmarkString);

      // display bookmark count
      $(".number-of-bookmarks-displayed").html(`${displayedBookmarks} out of ${totalBookmarks} Bookmarks`);
    }
  }
  
  
  function handleNewBookmarkSubmit() {
    $('#new-bookmark-form').submit(function (event) {
      event.preventDefault();
      const newBookmarkTitle = $('.new-bookmark-title').val();
      $('.new-bookmark-title').val('');

      const newBookmarkUrl = $('.new-bookmark-url').val();
      $('.new-bookmark-url').val('');

      const newBookmarkDesc = $('.new-bookmark-desc').val();
      $('.new-bookmark-desc').val('');

      const newBookmarkRating = $('input[new-bookmark-rating]:checked').val();
      $('input[new-bookmark-rating]:checked').attr('checked', false);

      library.error = null;
      
      api.createBookmark(newBookmarkTitle, newBookmarkUrl, newBookmarkDesc, newBookmarkRating)
        .then(bookmark =>{
          library.addBookmark(bookmark);
          render();
        })
        .catch(error => {
          library.error = error;
          console.log(library.error);
          render();
          library.error = null;
        });
        
      
    });
    
  }
  
  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.bookmark')
      .data('bookmark-id');
  }
  
  function handleBookmarkDetailsClicked() {
    $('.bookmarks').on('click', '.bookmark-details', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      library.toggleBookmarkDetails(id);
      render();
    });
  }

  function handleAddBookmarkFormClicked() {
    $('.add-bookmark-button').on('click', function() {
      library.addBookmarkForm = !library.addBookmarkForm;
      render();
    });
  }
  
  function handleDeleteBookmarkClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.bookmarks').on('click', '.bookmark-delete', event => {
      // get the index of the item in store.items
      const id = getBookmarkIdFromElement(event.currentTarget);
      // delete the item
      api.deleteBookmark(id)
        .then(response => {
          console.log(response);
          library.findAndDelete(id);
          render();
        })
        .catch(error => {
          library.error = error;
          console.log(library.error);
          render();
          library.error = null;
        });
    });
  }
  
  function handleEditBookmarkSubmit() {
    $('.bookmarks').on('submit', '.js-edit-bookmark', event => {
      event.preventDefault();
      const id = getBookmarkIdFromElement(event.currentTarget);
      const newDesc = $(event.currentTarget).find('.bookmark-description').val();
      api.updateBookmark(id, {desc: newDesc})
        .then(response => {
          console.log(response);
          library.findAndUpdate(id, {desc: newDesc});
          render();
        })
        .catch(error => {
          library.error = error;
          console.log(library.error);
          render();
          library.error = null;
        });
    });
  }
  
  function handleFilterByRating() {
    $('#filter-by-rating').change(function() {
      library.ratingFilter = $('#filter-by-rating').val();
      render();
    });
  }

  function handleBookmarkStartEditing() {
    $('.bookmarks').on('click', '.js-edit-bookmark', event => {
      const id = getBookmarkIdFromElement(event.target);
      library.setBookmarkIsEditing(id, true);
      render();
    });
  }

  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleBookmarkDetailsClicked();
    handleAddBookmarkFormClicked();
    handleDeleteBookmarkClicked();
    handleEditBookmarkSubmit();
    handleFilterByRating();
    handleBookmarkStartEditing();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());