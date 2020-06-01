'use strict';

class Book{
    constructor(isbn, title, author, img){
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.img = img;
    }

    toString(){
        return this.isbn + ' - ' + this.title + ' - ' + this.author;
    }
}

const bookData = [
    { isbn: '978-3-16-148410-0',  title: "12 Years A Slave", author: "Solomon Northrup", img: "assets/img/12yearsaslave.jpg"},
    { isbn: '543-3-16-148410-0',  title: "The Age of Innocence", author: "Edith Wharton", img: "assets/img/theageofinnocence.jpeg"},
    { isbn: '858-3-16-148410-0',  title: "Akira", author: "Kathsuhiro Otomo", img: "assets/img/akira.jpg"},
    { isbn: '554-3-16-148410-0',  title: "American Gods", author: "Neil Gaiman", img: "assets/img/americangods.jpg"},
    { isbn: '445-3-16-148410-0',  title: "Anne Of Green Gables", author: "L. M. Mongomery", img: "assets/img/annegreenofgables.jpeg"},
    { isbn: '234-3-16-148410-0',  title: "Beloved", author: "Toni Morrison", img: "assets/img/beloved.jpg"},
    { isbn: '765-3-16-148410-0',  title: "Cloud Atlas", author: "David Mitchell", img: "assets/img/akira.jpg"},
    { isbn: '544-3-16-148410-0', title: "Dead Until Dark", author: "Charlaine Harris", img: "assets/img/americangods.jpg"},
    { isbn: '213-3-16-148410-0', title: "Fingersmith",author: "Sarah Waters", img: "assets/img/annegreenofgables.jpeg"},
    { isbn: '123-3-16-148410-0',  title: "Bridge to Terabithia", author: "Katherine Paterson", img: "assets/img/12yearsaslave.jpg"},
    { isbn: '898-3-16-148410-0',  title: "Brokeback Mountain", author: "Annie Proulx", img: "assets/img/theageofinnocence.jpeg"},
    { isbn: '808-3-16-148410-0', title: "A Game Of Thrones", author: "George R. R. Martin", img: "assets/img/beloved.jpg"},
    { isbn: '221-3-16-148410-0', title: "The Godfather", author: "Mario Puzo", img: "assets/img/12yearsaslave.jpg"},
    { isbn: '002-3-16-148410-0', title: "The Hours", author: "SMichael Cunningham", img: "assets/img/theageofinnocence.jpeg"},
    { isbn: '122-3-16-148410-0', title: "Housekeeping", author: "Marilynne Robinson", img: "assets/img/akira.jpg"},
    { isbn: '432-3-16-148410-0', title: "The Kite Runner", author: "Khaled Hosseini", img: "assets/img/americangods.jpg"},
    { isbn: '432-3-16-148410-0', title: "Practical Magic", author: "Alice Hoffman", img: "assets/img/annegreenofgables.jpeg"},
    { isbn: '909-3-16-148410-0', title: "The Princess Bride", author: "William Goldma", img: "assets/img/beloved.jpg"},
    { isbn: '990-3-16-148410-0', title: "The Pursuit of Happyness", author: "Chris Gardner", img: "assets/img/beloved.jpg"},
    { isbn: '770-3-16-148410-0', title: "Push", author: "Sapphire", img: "assets/img/akira.jpg"},
]

const books = bookData.map(item => {
    const book = new Book(item.isbn, item.title, item.author, item.img);
    return book;
});


let state = {
    'querySet': books,
    'page': 1,
    'rows': 6,
}

const pagination = (qs, page, rows) => {
    let start = (page - 1) * rows;
    let end = start + rows;

    let data = qs.slice(start, end);
    let pages = Math.ceil(qs.length / rows);

    return {
        'querySet': data,
        'pages': pages
    }
}

const btnClicked = (page) => {
    document.getElementById('renderBookList').innerHTML = '';
    state.page = page;
    buildList();
}

const pageBtns = (pages) => {
    let paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    if (state.page != 1) {
        paginationContainer.innerHTML += `<button class="btn-prev" onclick="btnClicked(${state.page-1})">&laquo;</button>`
    }
    for (let page = 1; page <= pages; page++) {
        if (page == state.page) {
            paginationContainer.innerHTML += `<button class="page-btn active">${page}</button>`
        } else {
            paginationContainer.innerHTML += `<button class="page-btn" onclick="btnClicked(${page})">${page}</button>`
        }
    }
    if (state.page != pages) {
        paginationContainer.innerHTML += `<button class="btn-prev" onclick="btnClicked(${state.page+1})">&raquo;</button>`
    }
}

const createBookElement = (book, i) => {
    const htmlString = `
        <div style="background-image: url('${book.img}')" class="book-img col-xs-4 col-md-2"></div>
        <div class="col-xs-8 col-md-7">
            <div class="book-title">${book.title}</div>
            <div class="book-info">
                <p class="info-desc">Author:</p>
                <p>${book.author}</p>
            </div>
        </div>
        <div class="col-xs-12 col-md-3">
            <div class="book-info isbn">
                <p class="info-desc">ISBN</p>
                <p>${book.isbn}</p>
            </div>
        </div>
    `;

    let li = document.createElement("li");
    li.setAttribute('id', i);
    li.setAttribute('class', 'col-xs-offset-2 col-xs-8')
    li.innerHTML = htmlString;
    return li;
} 

const buildList = () => {
    let data = pagination(state.querySet, state.page, state.rows);
    let ul = document.createElement('ul');
    data.querySet.map((book, i) => {
        ul.append(createBookElement(book, i));
    });
    document.getElementById('renderBookList').append(ul);

    pageBtns(data.pages);
}

