document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("form");

    submitForm.addEventListener("submit", function(event){
        event.preventDefault();
        addBookList();
        document.getElementById("form").reset();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data Berhasil Disimpan!");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});