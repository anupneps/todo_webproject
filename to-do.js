function main() {
    // button click event to store the to-do items
    const btn = document.querySelector(".addbtn");
    btn.addEventListener("click", addItemList);

    //  display items when the webpage loads 
    displayItems();
}
// function that display five previously completed items
function displayItems() {
    // checking if there are any items to display
    var storedItem = localStorage.getItem("todoComplete");
    if (storedItem === null) {
        return;
    }
    // getting the saved item from local storage, parse them to array and save the last five completed items
    var displayItem = JSON.parse(storedItem);
    var completedlist = displayItem.slice(displayItem.length - 5, displayItem.length)

    for (let index = 0; index < (completedlist.length); index++) {
        var initialdisplay = completedlist[index];

        let newElement = document.createElement('div');
        newElement.innerHTML = renderCompleteItem(initialdisplay);
        var initialItemEl = newElement.firstElementChild;
        // appending the completed item into newly created div
        document.getElementById('completed').appendChild(initialItemEl).className = 'complete';
    }

}

// taking input from form and appending that input to new element for displaying

function addItemList() {

    const todoInput = document.getElementById("todo-input");
    // form validation
    if ((todoInput.value == null || todoInput.value == "") || (todoInput.value.length < 3)) {
        todoInput.classList = "error";
        document.getElementById("error-msg").style.display = "block";

    } else {
        todoInput.classList.remove("error");
        document.getElementById("error-msg").style.display = "none";

        const tempDivEl = document.createElement('div');
        tempDivEl.innerHTML = renderListItem(todoInput.value);
        saveData(todoInput.value);
        var el = tempDivEl.firstElementChild;
        // appending the input item into newly created div
        document.getElementById("output-list").appendChild(el).className = 'normal';


        el.addEventListener("click", (ev) => {
            if (ev.target.tagName === "SPAN") {
                const liElement = ev.target.parentElement;
                // here the click target is span element, from span we get li using ev.target.parentElement
                // from li get the parent Node of li which is the div(".output-list")
                // Now from the parent node it is possible to get the index of the child element(li)
                // it is necessary to know the index of li element because based on that index the correct item is removed from the 
                // "todoInput" localstorage data when "done" is clicked.
                const index = Array.from(liElement.parentNode.children).indexOf(liElement);
                completedItem(ev.target.parentElement, index);
                ev.target.parentElement.remove();
            }
        });
        // display the hidden button and adding event to clear the completed items
        // button to clear all the lists from the element.
        var clearList = document.getElementsByClassName("clear-btn");
        clearList[0].style.display = 'block';

        clearList[0].addEventListener('click', () => {
            const completedEl = document.getElementById("completed");

            while (completedEl.firstChild) {
                completedEl.removeChild(completedEl.firstChild);
            }
        });
    }
    // reset the input value of the input box ater taking each input
    todoInput.value = null;
}


// rending the list items to the new element (div) inorder to display the item list

function renderListItem(text) {
    return `
        <li class="normal">
            <span class="item-name">${text}</span>
            <span class = "del-btn1"> DONE</span>
        </li>
    `
}

// function to get the list of completed items
function completedItem(el, index) {

    const textContentEl = el.querySelector(".item-name");
    const data = textContentEl.textContent; //string value

    const outputdiv = document.createElement("div");
    outputdiv.innerHTML = renderCompleteItem(data);
    saveCompetedData(data, index);

    // appending the items into newly created div
    var completedEl = outputdiv.firstElementChild;
    document.getElementById("completed").appendChild(completedEl).className = 'complete';

}

function renderCompleteItem(text) {
    return `
        <li class="complete">${text} </li>
    `
}


//saving the input data(todoInput) to local storage ;

function saveData(data) {
    if (localStorage.getItem("todoInput") === null) {
        var arr = [data];
        localStorage.setItem("todoInput", JSON.stringify(arr)) // converting JS object to JSON string
    } else {
        var list = localStorage.getItem("todoInput");
        var listItems = JSON.parse(list); // parse JSON string and construct JS object
        listItems.push(data);
        localStorage.setItem("todoInput", JSON.stringify(listItems));
    }

}

//saving the completed item (todoComplete) to local storage ;

function saveCompetedData(data, indexToRemove) {
    const todoItems = JSON.parse(localStorage.getItem("todoInput"));
    todoItems.splice(indexToRemove, 1); // first parameter is the index of the item from where to start removing item, second parameter is the number of item to remove
    localStorage.setItem("todoInput", JSON.stringify(todoItems));

    if (localStorage.getItem("todoComplete") === null) {
        var arr = [data];
        localStorage.setItem("todoComplete", JSON.stringify(arr))
    } else {
        var list = localStorage.getItem("todoComplete");
        var listItems = JSON.parse(list);
        listItems.push(data);
        localStorage.setItem("todoComplete", JSON.stringify(listItems));
    }

}

main();