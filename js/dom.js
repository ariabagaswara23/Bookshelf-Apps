const UNCOMPLETED_BOOK_ID = "uncompleted-book";
const COMPLETED_BOOK_ID = "completed-book";
const BOOK_ITEMID = "bookId";

function makeBookList(judul, penulis, tahun, isCompleted){
    const title = document.createElement("h3");
    title.classList.add("book-title");
    title.innerText = judul;

    const author = document.createElement("h5");
    author.innerText = penulis;

    const year = document.createElement("p");
    year.innerText = tahun;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    
    textContainer.append(title, author, year);

    const container = document.createElement("div");
    container.classList.add("item");
    container.append(textContainer);
    if(isCompleted){
        container.append(createUndoButton(), createTrashButton());
    } else {
        container.append(createCheckButton(), createTrashButton());
    }
    
    return container;
}

function createUndoButton() {
    return createButton("undo-button", function(event) {
        undoBookFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function(event) {
        removeBookFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function(event) {
        addBookToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event) {
        eventListener(event);
    });
    return button;
}

function addBookList(){
    const checkboxCompleted = document.getElementById("completeRead").checked;
    const bookTitle = document.getElementById("judul").value;
    const bookWriter = document.getElementById("penulis").value;
    const bookYear = document.getElementById("tahun").value;
    if(checkboxCompleted){
        const completedBookList = document.getElementById(COMPLETED_BOOK_ID);

        const book = makeBookList(bookTitle, bookWriter, bookYear, true);
        const bookObject = composeBookObject(bookTitle, bookWriter, bookYear, true);

        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        completedBookList.append(book);
        updateDataToStorage();
    }else{
        const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOK_ID);
        
        const book = makeBookList(bookTitle, bookWriter, bookYear, false);
        const bookObject = composeBookObject(bookTitle, bookWriter, bookYear, false);

        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        uncompletedBookList.append(book);
        updateDataToStorage();
    }
}

function addBookToCompleted(taskElement){
    const completedBook = document.getElementById(COMPLETED_BOOK_ID);
    const titleBook = taskElement.querySelector(".inner > h3").innerText;
    const authorBook = taskElement.querySelector(".inner > h5").innerText;
    const yearBook = taskElement.querySelector(".inner > p").innerText;

    const newBook = makeBookList(titleBook, authorBook, yearBook, true);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    completedBook.append(newBook);
    taskElement.remove();
    updateDataToStorage();
}

function removeBookFromCompleted(taskElement){
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoBookFromCompleted(taskElement) {
    const uncompletedBook = document.getElementById(UNCOMPLETED_BOOK_ID);
    const titleBook = taskElement.querySelector(".inner > h3").innerText;
    const authorBook = taskElement.querySelector(".inner > h5").innerText;
    const yearBook = taskElement.querySelector(".inner > p").innerText;

    const newBook = makeBookList(titleBook, authorBook, yearBook, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    uncompletedBook.append(newBook);
    taskElement.remove();
    updateDataToStorage();
}