import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://grocery-checklist-c18e7-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const groceryListInDB = ref(database, "Groceries")

const addItemBtn = document.getElementById('save-btn')
const inputEl = document.getElementById('input-el')
const ulEl = document.getElementById('ul-el')

addItemBtn.addEventListener("click", function () {
    renderShoppingList(inputEl.value)
    console.log(inputEl.value + " is added to database")
    push(groceryListInDB, inputEl.value)
    clearInputField(inputEl)

})

onValue(groceryListInDB, function (snapshot) {
    let itemsInDB = Object.values(snapshot.val())

    clearRenderedItems()

    for (let i = 0; i < itemsInDB.length; i++) {
        let groceryItemsInDB = itemsInDB[i]
        renderShoppingList(groceryItemsInDB)
        // console.log(groceryItemsInDB)

    }


})

function renderShoppingList(grocery) {
    if (grocery) {
        ulEl.innerHTML += `
        <li>${grocery}</li>
    `
    }
}

function clearRenderedItems() {
    ulEl.innerHTML = ""
}

function clearInputField(inputField) {
    return inputField.value = ""
}
