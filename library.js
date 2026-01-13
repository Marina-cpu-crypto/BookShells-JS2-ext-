const catalog = document.getElementById("my-collections");

let mycollections = localStorage.getItem("mycollections");
if(mycollections.length>0)
{
    mycollections = JSON.parse(mycollections);
    mycollections.forEach(mc=>{
        renderCollection(mc.name, mc.rusname, mc.books.length);
    });
}
const defaultcollections = JSON.parse(localStorage.getItem("defaultcollections"));
let reading1=[];
let read2 =[];
let wannaread3=[];
let recent4=[];

defaultcollections.forEach(defcollect=>{
    if(defcollect.name==="read")read2 = defcollect;
    else
    {
        if(defcollect.name==="reading") reading1 = defcollect;
        else
        {
            if(defcollect.name ==="wannaread") wannaread3=defcollect;
            else recent4 = defcollect;
        }
    }
})
const createbtn = document.getElementById("create");
// const Addbtn = document.getElementById("add-collection");
const input = document.getElementById("create-colection");

let readbtn = document.getElementById("read");
let readingbtn = document.getElementById("reading");
let wannareadbtn = document.getElementById("wanna-read");
let recentbtn = document.getElementById("recent");

let readcnt = document.getElementById("read-cnt");
let readingcnt = document.getElementById("reading-cnt");
let wannareadcnt = document.getElementById("wanna-read-cnt");
let recentcnt = document.getElementById("recent-cnt");

defaultcollections.forEach(defcollect => {
    if(defcollect.name === "read"){
        readcnt.textContent = defcollect.cnt;
    };
    if(defcollect.name === "reading"){
        readingcnt.textContent = defcollect.cnt;
    };
    if(defcollect.name === "wannaread"){
        wannareadcnt.textContent = defcollect.cnt;
    };
    if(defcollect.name === "recent"){
        recentcnt.textContent = defcollect.cnt;
    };
});

readbtn.addEventListener("click",()=>{
    localStorage.setItem("chosecollection", JSON.stringify(read2));
    window.location.href = `collection.html?id=${2}`;
});
readingbtn.addEventListener("click",()=>{
    localStorage.setItem("chosecollection", JSON.stringify(reading1));
    window.location.href = `collection.html?id=${1}`;
});
wannareadbtn.addEventListener("click",()=>{
    localStorage.setItem("chosecollection", JSON.stringify(wannaread3));
    window.location.href = `collection.html?id=${3}`;
});
recentbtn.addEventListener("click",()=>{
    localStorage.setItem("chosecollection", JSON.stringify(recent4));
    window.location.href = `collection.html?id=${4}`;
});
catalog.addEventListener("click",(event)=>{
    if(event.target.classList!="my-collections"){
        localStorage.setItem("chosecollection", JSON.stringify(mycollections[event.target.id-1]));
        window.location.href = `collection.html?id=${event.target.id}`;
    }
});

// let collections = document.getElementById("collections");

// Addbtn.addEventListener("click",()=>{
//     input.hidden = !input.hidden;
//     // console.log(input.hidden);
// });
createbtn.addEventListener("click",()=>{
    let flag = true;

    if(mycollections.length>0)
    {
        mycollections.forEach(mc=>{
            if(mc.rusname===input.value) flag=false;
        });
    }
    else{
        mycollections = [];
        console.log("done");
    } 
   
    if(flag){
        renderCollection(catalog.childElementCount, input.value, 0);
        let card ={
            rusname:input.value,
            name: catalog.childElementCount,
            cnt:0,
            books:[]
        }
        mycollections.push(card);
        localStorage.setItem("mycollections", JSON.stringify(mycollections));
    } 
});

function renderCollection(id, text, cnt)
{
    const p = document.createElement("p");
    p.id = id;
    p.textContent = cnt;

    const button = document.createElement("button");
    button.textContent=text;
    button.id = id;

    const div = document.createElement("div");
    div.appendChild(p);
    div.appendChild(button);

    catalog.appendChild(div);
}

