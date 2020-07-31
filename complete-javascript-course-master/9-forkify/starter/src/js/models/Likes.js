export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push(like);
        // persist to local storage
        this.persistLikesToLocalStorage();
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
        // persist to local storage
        this.persistLikesToLocalStorage();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    // store likes in local storage
    persistLikesToLocalStorage() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    // read likes from local storage
    loadLikesFromLocalStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        if (storage) this.likes = storage;
    }

}