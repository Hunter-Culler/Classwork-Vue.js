const app = Vue.createApp({
    data() {
        return {
            keyword: '',
            result: null
        };
    },

    methods: {
        searchGoogleBooks() {
            fetch('https://www.googleapis.com/books/v1/volumes?q='+ this.keyword + '&startIndex=0&maxResults=20')
                .then(response => response.json())
                .then(json =>  {
                    this.result = json;
                    this.createPagination(this.result, 0, 20);
                });
        },
        createPagination(response, startIndex, maxResults) {
            var totalResults = response.totalItems;
            
            if(startIndex == 0 && totalResults > maxResults) {
                var previousIndex = startIndex;
                this.cleanPagination();
                $("#pagination").append("<button href='#' id='next' class='btn btn-primary'>Next</button>");
                $("#next").click(function() {
                    var newStartIndex = startIndex + maxResults;
                    document.getElementById("console").innerHTML = "new start: " + newStartIndex;
                    this.subsequentSearch(newStartIndex);
                });
            }
            else {
                if(startIndex != 0 && startIndex < totalResults && response.items.length == maxResults) {
                    this.cleanPagination();
                    $("#pagination").append("<button href='#' id='prev' class='btn btn-primary'>Prev</button><button href='#' id='next' class='btn btn-primary'>Next</button>");
                    $("#next").click(function() {
                        var newStartIndex = startIndex + maxResults;
                        this.subsequentSearch(newStartIndex);
                    });
                    $("#prev").click(function() {
                        var newStartIndex = startIndex - maxResults;
                        this.subsequentSearch(newStartIndex);
                    });
                }
                else {
                    if(startIndex != 0) {
                        this.cleanPagination();
                        $("#pagination").append("<button href='#' id='prev' class='btn btn-primary'>Prev</button>");
                        $("#prev").click(function() {
                            var newStartIndex = startIndex - maxResults;
                            this.subsequentSearch(newStartIndex);
                        });
                    }
                }
            }
        },
        subsequentSearch(newStartIndex) {
            document.getElementById("console").innerHTML = "starting at 20";
            fetch('https://www.googleapis.com/books/v1/volumes?q='+ this.keyword + '&startIndex=' + newStartIndex + '&maxResults=20')
                .then(response => response.json())
                .then(json =>  {
                    this.result = json;
                    this.createPagination(response, newStartIndex, 20);
                });
                
        },
        cleanPagination() {
            $("#pagination").empty();
        }
    }
})