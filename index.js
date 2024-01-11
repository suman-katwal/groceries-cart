import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    //renderShoppingList(inputEl.value)
    //console.log(inputEl.value + " is added to database")
    if(inputEl.value){
    push(groceryListInDB, inputEl.value)
    clearInputField(inputEl)
    }

})

onValue(groceryListInDB, function (snapshot) {
    let itemsInDB = Object.entries(snapshot.val())

    clearRenderedItems()

    for (let i = 0; i < itemsInDB.length; i++) {
        let currentItem = itemsInDB[i]
      
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        renderShoppingList(currentItem)
    }


})

function renderShoppingList(item) {
       let itemID = item[0]
       let itemValue = item[1]
       let newEl = document.createElement("li")
       newEl.textContent= itemValue

       newEl.addEventListener("click", function(){
         let exactLocationOfItemInDB = ref(database, 'NnqYFUOVnCaarqtbR6X')

         console.log(exactLocationOfItemInDB)
        //   remove(exactLocationOfItemInDB)
       })
       ulEl.append(newEl)
}

function clearRenderedItems() {
    ulEl.innerHTML = ""
}

function clearInputField(inputField) {
    return inputField.value = ""
}
