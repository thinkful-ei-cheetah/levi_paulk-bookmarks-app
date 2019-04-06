'use strict';

const bookmark = (function() {
    const create = function(id, title, url, desc, rating) {
        return {
            id,
            title,
            url,
            desc,
            rating,
            details: false
        };
    };

    return {
        create
    };
}());