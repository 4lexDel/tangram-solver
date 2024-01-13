// const confirmModal = new bootstrap.Modal(document.getElementById('confirm-modal')); //document.querySelector("#confirm-modal");
// const confirmModalTitle = document.querySelector("#confirm-modal-title");
// const confirmModalContent = document.querySelector("#confirm-modal-content");
// const confirmModalDeleteButton = document.querySelector("#confirm-modal-delete-button");

// let lastCallback = null;

// function openConfirmModal(text, callback = null, title = "Confirm modal") {
//     confirmModalTitle.textContent = title;
//     confirmModalContent.textContent = text;
//     confirmModal.show();

//     if (callback) {
//         if (lastCallback) confirmModalDeleteButton.removeEventListener("click", lastCallback);
//         lastCallback = callback;

//         confirmModalDeleteButton.addEventListener("click", callback);
//     }
// }