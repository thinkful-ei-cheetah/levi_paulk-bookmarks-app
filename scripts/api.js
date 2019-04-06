'use strict';

const api = (function (){
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/levipaulk/';
  
    function getBookmarks(){
      return listApiFetch(BASE_URL + 'bookmarks');
    }
  
    function createBookmark(title, url, desc, rating) {
      const options = {
        method: 'POST',
        body: {
            "title": JSON.stringify({title}),
            "url": JSON.stringify({url}),
            "desc": JSON.stringify({desc}),
            "rating": JSON.stringify({rating})
        }
      };
      return listApiFetch(BASE_URL + 'bookmarks', options);
    }
  
    function updateBookmark(id, obj){
      const newObj = JSON.stringify(obj);

      const options = {
        method: 'PATCH',
        body: newObj
      };
      return listApiFetch(BASE_URL + `bookmarks/${id}`, options);
    }
  
    function deleteBookmark(id) {
      const options = {
        method: 'DELETE'
      };
      return listApiFetch(BASE_URL + `bookmarks/${id}`, options);
    }
  
    function listApiFetch(...args) {
      let error;
      return fetch(...args)
        .then(res => {
          if (!res.ok) {
            error = { code: res.status};
          }
          return res.json();
        })
        .then(data => {
          if (error) {
            error.message =  data.message;
            return Promise.reject(error);
          }
          return data;
        });
    }
  
    return {
        getBookmarks,
        createBookmark,
        updateBookmark,
        deleteBookmark,
        listApiFetch,
    };
  
  }() );