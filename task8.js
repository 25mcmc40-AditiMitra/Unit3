let booksJSON = [];

$(document).ready(function(){

    // Load XML file using AJAX
    $.ajax({
        type: "GET",
        url: "task4.xml",
        dataType: "xml",
        success: function(xml){

            $(xml).find("book").each(function(){

                let book = {
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    publication_date: $(this).find("publication_date").text()
                };

                booksJSON.push(book);
            });

            populateFilters();
            displayBooks(booksJSON);
        }
    });

});

// Display Books in Table
function displayBooks(data){

    $("#bookTable tbody").empty();

    $.each(data, function(index, book){

        $("#bookTable tbody").append(`
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.price}</td>
                <td>${book.publication_date}</td>
            </tr>
        `);
    });
}

// Populate Filters
function populateFilters(){

    let genres = [...new Set(booksJSON.map(b => b.genre))];
    let authors = [...new Set(booksJSON.map(b => b.author))];

    genres.forEach(g => {
        $("#genreFilter").append(`<option value="${g}">${g}</option>`);
    });

    authors.forEach(a => {
        $("#authorFilter").append(`<option value="${a}">${a}</option>`);
    });
}

// Filtering Logic
$("#genreFilter, #authorFilter, #priceFilter").change(function(){

    let selectedGenre = $("#genreFilter").val();
    let selectedAuthor = $("#authorFilter").val();
    let selectedPrice = $("#priceFilter").val();

    let filtered = booksJSON.filter(function(book){

        let genreMatch = selectedGenre === "all" || book.genre === selectedGenre;
        let authorMatch = selectedAuthor === "all" || book.author === selectedAuthor;

        let priceMatch = true;

        if(selectedPrice !== "all"){
            let range = selectedPrice.split("-");
            let min = parseFloat(range[0]);
            let max = parseFloat(range[1]);
            priceMatch = book.price >= min && book.price <= max;
        }

        return genreMatch && authorMatch && priceMatch;
    });

    displayBooks(filtered);
});
