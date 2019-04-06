'use strict';

const api = (function (){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/levipaulk/bookmarks';

  function getBookmarks(){
    return listApiFetch(BASE_URL);
  }

  function createBookmark(title, url, desc, rating) {
    const newBookmark = JSON.stringify({title, url, desc, rating});
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: newBookmark
    };
    return listApiFetch(BASE_URL, options);
  }

  function updateBookmark(id, obj){
    const newObj = JSON.stringify(obj);

    const options = {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: newObj
    };
    return listApiFetch(BASE_URL + `/${id}`, options);
  }

  function deleteBookmark(id) {
    const options = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    return listApiFetch(BASE_URL + `/${id}`, options);
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