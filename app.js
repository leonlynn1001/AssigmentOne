const bookName = document.querySelector(".title");
const author = document.querySelector(".author");
const pages = document.querySelector(".pages");
const read = document.querySelector(".selectOption");
const addBookBtn = document.querySelector(".addNewBook");
const bookform = document.querySelector(".dataForm");
const container = document.querySelector(".bookContainers");
const list = document.querySelector(".bookList");
//add event
bookform.addEventListener("submit", addBookToShelf);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);

//function
function addBookToShelf(e) {
  e.preventDefault();
  const title = bookName.value;
  const name = author.value;
  const noOfpages = pages.value;
  const finish = read.value;
  const id = Math.floor(Math.random() * 100);
  const bookcover = document.createElement("article");
  bookcover.classList.add("bookCover");
  bookcover.innerHTML = `<div class="bookInfo">
            <small class="bookTitle">Title:${title}</small>
            
            <p class="bookAuthor">Author:${name}</p>
            <small class="pageNo">${noOfpages}</small>
            <small class="finishStatus">${finish}</small>  
            <small class="bookId">Title:${id}</small>
          </div>
          <div class="btnCover">
            <button class="delete">Delete</button>
            <button class="read">Read</button>
          </div>`;
  const deleteBtn = bookcover.querySelector(".delete");
  deleteBtn.addEventListener("click", deleteBook);
  list.appendChild(bookcover);
  container.classList.add("show-container");

  addToLocalStorage(title, id, name, noOfpages, finish);
  setBackToDefault();
}
function deleteBook(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  setBackToDefault();
  removeFromLocalStorage(id);
}
function setBackToDefault() {
  bookName.value = "";
  author.value = "";
  pages.value = "";
  read.value = "read";
}
//Local Storage
// class Note {
//   constructor(title, body, category) {
//     this.title = title;
//     this.body = body;
//     this.category = category;
//     this.id = Math.floor(Math.random() * 2000);
//   }
// }
function addToLocalStorage(title, id, name, page, finish) {
  // const book = new Note(title, id, name, page, finish);
  const book = { title, id, name, page, finish };
  let items = getLocalStorage(); //[]
  items.push({ book });
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter((item) => item.id !== id);
  localStorage.setItem("list", JSON.stringify(items));
}
///setup

function setupItems() {
  let items = getLocalStorage();
  console.log(items);
  if (items.length > 0) {
    items.forEach(function (book) {
      createListItem(
        book.book.title,
        book.book.id,
        book.book.name,
        book.book.page,
        book.book.finish
      );
    });
    container.classList.add("show-container");
  } else {
    alert("no item");
  }
}

function createListItem(title, id, name, page, finish) {
  const bookcover = document.createElement("article");
  bookcover.classList.add("bookCover");
  bookcover.innerHTML = `<div class="bookInfo">
            <small class="bookTitle">Title: ${title}</small>     
            <p class="bookAuthor">Author: ${name}</p>
            <small class="pageNo">${page}</small>
            <small class="finishStatus">${finish}</small>  
            <small class="bookId">Title: ${id}</small>
          </div>
          <div class="btnCover">
            <button class="delete">Delete</button>
            <button class="read">Read</button>
          </div>`;
  const deleteBtn = bookcover.querySelector(".delete");
  deleteBtn.addEventListener("click", deleteBook);
  list.appendChild(bookcover);
  container.classList.add("show-container");
}
// function createListItem(title, id, name, page, finish) {
//   console.log("set up");
//   const bookcover = document.createElement("article");
//   bookcover.classList.add("bookCover");
//   bookcover.innerHTML = `<div class="bookInfo">
//             <small class="bookTitle">Title:${title}</small>
//             <p class="bookAuthor">Author:${name}</p>
//             <small class="pageNo">${page}</small>
//             <small class="finishStatus">${finish}</small>
//             <small class="bookId">Title:${id}</small>
//           </div>
//           <div class="btnCover">
//             <button class="delete">Delete</button>
//             <button class="read">Read</button>
//           </div>`;
//   const deleteBtn = bookcover.querySelector(".delete");
//   deleteBtn.addEventListener("click", deleteBook);
//   list.appendChild(bookcover);
//   container.classList.add("show-container");
// }
