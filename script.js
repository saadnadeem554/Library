const library = [];
const content = document.querySelector(".content");
const addBook = document.querySelector(".add-book");

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function displayBooks() {
    content.innerHTML = "";
    library.forEach((book, index) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.dataset.index = index;
        
        const title = document.createElement("h2");
        title.textContent = book.title;
        
        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;
        
        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;
        
        const read = document.createElement("button");
        read.textContent = book.read ? "Read" : "Not Read";
        read.addEventListener("click", () => toggleRead(index));
        
        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.addEventListener("click", () => removeBook(index));
        
        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(read);
        bookDiv.appendChild(remove);
        
        content.appendChild(bookDiv);
    });
}

function toggleRead(index) {
    library[index].read = !library[index].read;
    displayBooks();
}

function removeBook(index) {
    library.splice(index, 1);
    displayBooks();
}
addBook.addEventListener("click", () => DisplayForm());
function DisplayForm() {
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");
    
    const form = document.createElement("form");
    form.classList.add("form");
    
    const h2 = document.createElement("h2");
    h2.textContent = "Add a Book";

    const title = document.createElement("input");
    title.type = "text";
    title.placeholder = "Title";
    title.required = true;
    
    const author = document.createElement("input");
    author.type = "text";
    author.placeholder = "Author";
    author.required = true;
    
    const pages = document.createElement("input");
    pages.type = "number";
    pages.placeholder = "Pages";
    pages.required = true;
    
    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");
    
    const read = document.createElement("input");
    read.type = "checkbox";
    read.id = "read";
    
    const readLabel = document.createElement("label");
    readLabel.htmlFor = "read";
    readLabel.textContent = "Read";
    
    checkboxContainer.appendChild(read);
    checkboxContainer.appendChild(readLabel);
    
    const submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Submit";
    
    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.classList.add("cancel");
    cancel.type = "button";
    cancel.addEventListener("click", () => modalOverlay.remove());
    
    form.appendChild(h2);
    form.appendChild(title);
    form.appendChild(author);
    form.appendChild(pages);
    form.appendChild(checkboxContainer);
    form.appendChild(submit);
    form.appendChild(cancel);
    
    modalOverlay.appendChild(form);
    document.body.appendChild(modalOverlay);
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newBook = new Book(title.value, author.value, pages.value, read.checked);
        library.push(newBook);
        displayBooks();
        modalOverlay.remove();
    });
    
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
}




// seed data
const book1 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
const book2 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
const book3 = new Book("C# Player's Guide", "RB Whitaker", 180, true);
const book4 = new Book("The Catcher in the Rye", "J.D. Salinger", 230, false);
const book5 = new Book("The Hobbit", "J.R.R. Tolkien", 300, true);
const book6 = new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 400, false);

library.push(book1);
library.push(book2);
library.push(book3);
library.push(book4);
library.push(book5);
library.push(book6);

displayBooks();
