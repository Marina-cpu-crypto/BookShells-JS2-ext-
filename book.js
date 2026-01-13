const params = new URLSearchParams(window.location.search);
const bookId = "book"+Number(params.get('id'));

const books = JSON.parse(localStorage.getItem('books')) || [];
let book = books.find((book)=> book.id === bookId);

const defaultcollections = JSON.parse(localStorage.getItem("defaultcollections")) || [];
let mycollections = localStorage.getItem("mycollections") || [];
if(mycollections.length>0)
{
    mycollections = JSON.parse(mycollections);
}
// let bookcollections = [];

// let book = JSON.parse(localStorage.getItem('book'));

//Контейнеры
let imgbuttons = document.getElementById("img-buttons");
let bookinformation = document.getElementById("book-information");
let incollections = document.getElementById("in-collections");
let description = document.getElementById("description");
let textreview = document.getElementById("text-review");
let image = document.getElementById("img-on-page");

let select = document.getElementById("select");
if (select && !select.value) 
{
    (defaultcollections || []).forEach(defcollection=>{
        const option = document.createElement('option');
        option.innerText=defcollection.rusname;
        select.appendChild(option);
    })
    let mycollections = localStorage.getItem("mycollections");

    if(mycollections.length>0)
    {
        mycollections = JSON.parse(mycollections);
        mycollections.forEach(mc=>{
            const option = document.createElement('option');
            option.innerText=mc.rusname;
            select.appendChild(option);
        });
    }
}

function renderCollections(defaultcollections){
    (defaultcollections || []).forEach(defcollection=>{
        (defcollection.books || []).forEach(df=>{
            if(df && df.id==bookId){
                const label = document.createElement('label');
                label.className = "genre-inf";
                label.innerText=defcollection.rusname;
                if (incollections) incollections.appendChild(label);
            }
        });
    });
};


renderCollections(defaultcollections);

if(!book){ 
    bookinformation.innerHTML= '<p>Извините, книга не найдена ((</p>'; 
}
else{
    // imgbuttons.innerHTML=`
    // <img class="img-on-page" src="${book.image}">
    // <button class="Add" id="Add">Добавить в библиотеку</button>

    // <input type="text" id="name-collection" placeholder="Название коллекции">
    // `
    if (image && book && book.image) image.src = book.image;

    bookinformation.innerHTML=`
    <p class="name-inf">${book.name}</p>
    <p class="author-inf">${book.author}</p>
    <p class="publish-house">Издательство: ${book.publishinghouse}</p>
    <p class="pages-number">Страниц: ${book.pagesnumber}</p>
    <div class="genre-rating">
        <label class="genre-inf">${book.genre}</label>
        <div class="your-rating">
            <p>Ваша оценка: </p>
            <input id="set-rating" type="text">
            <button id="Ok-rating">Ok⭐</button>
        </div>
    </div>
    `
    // incollections.innerHTML=`
    // <p>Эта книга состоит в ваших подборках:</p>

    // `
    description.innerHTML=`
    <p>Описание:</p>
    <p>${book.description}</p>
    `
    textreview.innerHTML=`
        <p>Ваша рецензия:</p>
        <p>${book.review}</p>
    `
}

//Элементы
const inputrating = document.getElementById("set-rating");
const SetBtn = document.getElementById("Ok-rating");
const inputreview = document.getElementById("input-review");
const OkBtn = document.getElementById("Ok-review");
const inputname = document.getElementById("name-collection");
const Addbtn = document.getElementById("Add");

const librarybtn = document.getElementById("library");


if (SetBtn) {
    SetBtn.addEventListener('click',()=>{
        if(inputrating && inputrating.value){
            books.forEach(b=>{
                if(b.id===book.id){
                    b.rating = inputrating.value;
                }
            });
            localStorage.setItem("books", JSON.stringify(books));
        }
    });
}

if (OkBtn || inputreview) {
    const submitReview = () => {
        if (inputreview && inputreview.value) {
            const val = inputreview.value.trim();
            if (!val) return;
            if (book) book.review = val;
            books.forEach(b => {
                if (b.id === (book && book.id)) {
                    b.review = val;
                }
            });
            localStorage.setItem("books", JSON.stringify(books));
            if (textreview) textreview.innerHTML = `
                <p>Ваша рецензия:</p>
                <p>${book ? book.review : ''}</p>
            `;
            inputreview.value = '';
        }
    };

    if (OkBtn) OkBtn.addEventListener('click', submitReview);

    if (inputreview) {
        inputreview.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                submitReview();
            }
        });
    }
}

if (Addbtn) {
    Addbtn.addEventListener('click',()=>{
        const collections = JSON.parse(localStorage.getItem('defaultcollections')) || [];
        collections.forEach(collection =>{
            if(select && select.value === collection.rusname){
                let flag = true;
                (collection.books || []).forEach(b=>{
                    if(b.id===book.id){
                        flag = false;
                        return;
                    }
                });
                if(flag){
                    collection.cnt = (collection.cnt || 0) + 1;
                    collection.books = collection.books || [];
                    collection.books.push(book);
                    localStorage.setItem("defaultcollections", JSON.stringify(collections));

                    const label = document.createElement('label');
                    label.className = "genre-inf";
                    label.innerText=collection.rusname;
                    if (incollections) incollections.appendChild(label);
                }
            };
        });

        mycollections.forEach(mycollection =>{
            if(select && select.value === mycollection.rusname){
                let flag = true;
                (mycollection.books || []).forEach(b=>{
                    if(b.id===book.id){
                        flag = false;
                        return;
                    }
                });
                if(flag){
                    mycollection.cnt = (mycollection.cnt || 0) + 1;
                    mycollection.books = mycollection.books || [];
                    mycollection.books.push(book);
                    localStorage.setItem("mycollections", JSON.stringify(mycollections));

                    const label = document.createElement('label');
                    label.className = "genre-inf";
                    label.innerText=mycollection.rusname;
                    if (incollections) incollections.appendChild(label);
                }
            };
        });
    });
}

if(localStorage.getItem('review') && textreview){
    textreview.innerHTML=`
        <p>Ваша рецензия:</p>
        <p>${localStorage.getItem('review')}</p>
    `
}

if (librarybtn) {
    librarybtn.addEventListener("click",()=>{
        window.location.href = `MyLibrary.html`;
    });
}
