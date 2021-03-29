app.component('book-display', {
    props: {
        book: {
            type: String,
            required: true,
            default: null
        }
    },
    template:
        /*html*/
        `<ul class="col-sm-12 col-md-6 col-xl-4">
        <a class="list-group-item list-group-item-action active" :href="this.bookObj.selfLink"> {{ this.bookObj.volumeInfo.title }} </a>
        <li class="list-group-item" v-if="this.bookObj.volumeInfo.authors != null" v-for="author in this.bookObj.volumeInfo.authors"> {{ author }} </li>
        <li class="list-group-item" v-if="this.bookObj.volumeInfo.publisher != null && this.bookObj.volumeInfo.publishedDate != null"> {{ this.bookObj.volumeInfo.publisher }}, {{ this.bookObj.volumeInfo.publishedDate }} </li>
        <li class="list-group-item" v-if="this.bookObj.volumeInfo.imageLinks.thumbnail != null"><img class="thumbnail" :src='this.bookObj.volumeInfo.imageLinks.thumbnail'/></li>
        <li class="list-group-item" v-if="this.bookObj.volumeInfo.description != null">{{ this.bookObj.volumeInfo.description }} </li>
        <li class="list-group-item" v-if="this.bookObj.volumeInfo.pageCount != null">{{ this.bookObj.volumeInfo.pageCount }} Pages</li>
        </ul>`,
    computed: {
        bookObj() {
            if (this.book != null)
                return JSON.parse(this.book)
            else
                return null;
        }
    }

})