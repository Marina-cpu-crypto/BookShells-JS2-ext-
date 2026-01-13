let reading ={
    rusname:"Читаю сейчас",
    name:"reading",
    cnt:0,
    books:[]
}
let read ={
    rusname:"Прочитанные",
    name:"read",
    cnt:0,
    books:[]
}
let wannaread ={
    rusname:"Хочу прочитать",
    name:"wannaread",
    cnt:0,
    books:[]
}
let recent ={
    rusname:"Нeдавно просмотренные",
    name:"recent",
    cnt:0,
    books:[]
}
const mycollections= [];
if(!localStorage.getItem("defaultcollections")) localStorage.setItem("defaultcollections", JSON.stringify([reading, read, wannaread, recent]));
if(!localStorage.getItem("mycollections")) localStorage.setItem("mycollections", mycollections);

const librarybtn = document.getElementById("library");


const titleinput = document.getElementById('title');
const header = document.getElementById('header');
const catalog = document.getElementById('catalog');
        

const book1 = {
    id:"book1",
    name:"Мцыри",
    image:"images/Mziry.png",
    author:"М.Ю. Лермонтов",
    genre:"Поэзия",
    rating:"4.8",
    publishinghouse:"Дом печати",
    pagesnumber:"60",
    description:"«Мцыри» — романтическая поэма М. Ю. Лермонтова, написанная в 1839 году и опубликованная (с цензурными пропусками) в 1840 году. Относится к поздним кавказским поэмам Лермонтова и считается одним из последних классических образцов русской романтической поэзии.",
    review:""
}
const book2 = {
    id:"book2",
    name:"Хэллоуин",
    image:"images/pumpkin.png",
    author:"Элизабет Афтон",
    genre:"Хоррор",
    rating:"3.7",
    publishinghouse:"Дом печати",
    pagesnumber:"600",
    description:"Первый опыт Элизабет в писательстве)",
    review:""
}

const allbooks = [book1, book2];
// const prosebooks = [book2];
// const classicbooks = [book1];

if(!localStorage.getItem("books")) localStorage.setItem("books", JSON.stringify(allbooks));

function renderBooks(books){
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book';
        card.id = book.id;
        card.innerHTML = `
        ${book.image !='' ?`<img id=${book.id} class="img-book" src="${book.image}">`:''}
        <p id=${book.id} class="name">${book.name}</p>
        <p id=${book.id} class="author">${book.author}</p>
        <label id=${book.id} class="genre">${book.genre}</label>
        <div id=${book.id} class="rating">⭐${book.rating}</div>
        `
        catalog.appendChild(card);
    });
}
function searchBooks(title){
    JSON.parse(localStorage.getItem('books')).forEach(book => {
        if(book.name == title)
        {
            const card = document.createElement('div');
            card.className = 'book';
            card.id = book.id;
            card.innerHTML = `
            ${book.image !='' ?`<img id=${book.id} class="img-book" src="${book.image}">`:''}
            <p id=${book.id} class="name">${book.name}</p>
            <p id=${book.id} class="author">${book.author}</p>
            <label id=${book.id} class="genre">${book.genre}</label>
            <div id=${book.id} class="rating">⭐${book.rating}</div>
            `
            catalog.appendChild(card);
            return;
        };
    });
}

header.addEventListener('click',(event)=>{
    if (event.target && event.target.tagName && event.target.tagName.toLowerCase() === 'a') return;
    event.preventDefault();
    if(event.target.classList.contains("all")){
        catalog.innerHTML = '';
        renderBooks(JSON.parse(localStorage.getItem('books')));
    }
    if(event.target.classList.contains("fantasy")){
        catalog.innerHTML = '';
        books = JSON.parse(localStorage.getItem('books'));
        books.forEach(book=>{
            if(book.genre==="Хоррор"){
                const card = document.createElement('div');
                card.className = 'book';
                card.id = book.id;
                card.innerHTML = `
                ${book.image !='' ?`<img id=${book.id} class="img-book" src="${book.image}">`:''}
                <p id=${book.id} class="name">${book.name}</p>
                <p id=${book.id} class="author">${book.author}</p>
                <label id=${book.id} class="genre">${book.genre}</label>
                <div id=${book.id} class="rating">⭐${book.rating}</div>
                `
                catalog.appendChild(card);
            }
        });
        // renderBooks(prosebooks);
    }
    if(event.target.classList.contains("classic")){
        catalog.innerHTML = '';
        books = JSON.parse(localStorage.getItem('books'));
        books.forEach(book=>{
            if(book.genre==="Поэзия"){
                const card = document.createElement('div');
                card.className = 'book';
                card.id = book.id;
                card.innerHTML = `
                ${book.image !='' ?`<img id=${book.id} class="img-book" src="${book.image}">`:''}
                <p id=${book.id} class="name">${book.name}</p>
                <p id=${book.id} class="author">${book.author}</p>
                <label id=${book.id} class="genre">${book.genre}</label>
                <div id=${book.id} class="rating">⭐${book.rating}</div>
                `
                catalog.appendChild(card);
            }
        });
        // renderBooks(classicbooks);
    }
    if(event.target.classList.contains("search-btn")){
        catalog.innerHTML = '';
        searchBooks(titleinput.value);
    }
});

catalog.addEventListener('click',(event)=>{
    if(event.target.classList!="catalog"){
        
        window.location.href = `book.html?id=${event.target.id.charAt(event.target.id.length-1)}`;
    }
});

librarybtn.addEventListener("click",()=>{
    window.location.href = `MyLibrary.html`;
});

renderBooks(JSON.parse(localStorage.getItem('books')));
