const body = document.querySelector('body');
const main = document.querySelector('main');


/**
* Save the complete HTML of the item list as a string (including child elements).
*/
function updateLocalStorage() {

    localStorage.setItem('items', main.innerHTML);

    // For some reason, the raw HTML does not contain
    // the value attribute of the input elements.
    // We must save those separately.

    const values = Array.from(main.querySelectorAll('input[type="text"]')).map(input => input.value);
    localStorage.setItem('values', values);
}

/**
* Create a new list item HTML element.
*/
function createItem() {
    const item = document.createElement('li');

    const itemInfo = document.createElement('div');
    itemInfo.setAttribute('class', 'item-info');
    item.appendChild(itemInfo);

    const itemText = document.createElement('input');
    itemText.setAttribute('type', 'text');
    itemInfo.appendChild(itemText);

    const removeButton = document.createElement('button');
    removeButton.setAttribute('title', 'remove item');
    removeButton.innerText = 'X';
    itemInfo.appendChild(removeButton);

    const itemWeight = document.createElement('div');
    itemWeight.setAttribute('class', 'item-weight');
    item.appendChild(itemWeight);

    const marble = document.createElement('div');
    itemWeight.appendChild(marble);

    return item;
}

/**
* Add a new item to the list.
*/
function addItem() {
    main.querySelector('ol').appendChild(createItem());
}

/**
* Remove an item from the list based on which button was clicked.
* 
* Attempting to remove the last item triggers a warning alert.
*/
function removeItem(event) {
    if (event.type === 'click' && event.target.title === 'remove item') {

        const itemCount = main.querySelectorAll('li').length;

        if (itemCount > 1) {
            event.target.closest('li').remove();
        } else {
            alert('Cannot remove the last item!');
        }
    }
}

/**
* Select a random item from the list.
*
* Items with more weight have a higher probability of being chosen.
*/
function marbleRaffle() {

    // Build weighted list.
    const items = main.querySelectorAll('li');
    let weightedList = [];

    items.forEach((item, i) => {
        const marbles = item.querySelectorAll('.item-weight div');
        marbles.forEach(() => {
            weightedList.push(i);
        });
    });

    // Pick a random item.
    const randomIndex = weightedList[Math.floor(Math.random() * weightedList.length)];
    const chosenItem = items[randomIndex];

    // Remove all marbles from the chosen item.
    const marbles = chosenItem.querySelectorAll('.item-weight div');
    for (let i = marbles.length - 1; i >= 0; i--) {
        marbles[i].remove();
    }

    // Add one marble to all items.
    items.forEach((item, i) => {
        const weight = item.querySelector('.item-weight');
        const marble = document.createElement('div');
        weight.appendChild(marble);
    });

    // Show an alert with the value of the chosen item.
    const value = chosenItem.querySelector('input[type="text"]').value;
    alert(value);
}

/**
* Create a new list with one item.
*/
function createDefaultItemList() {
    const items = document.createElement('ol');
    items.appendChild(createItem());

    return items;
}

/**
* Reset the item list to the default state.
*/
function resetList() {
    const items = main.querySelecto('ol');
    const newItems = createDefaultItemList();
    items.parentNode.replaceChild(newItems, items);
}

/**
* Load saved item list (and event listeners) on page reload.
*/
function loadList() {
    const items = localStorage.getItem('items');

    if (items !== null) {
    
        main.innerHTML = items;
    
        const inputs = main.querySelectorAll('input[type="text"]');
        const values = localStorage.getItem('values').split(',');
    
        inputs.forEach((input, i) => {
            input.setAttribute('value', values[i]);
        });
    
    } else {
        main.appendChild(createDefaultItemList());
    }
    
    body.addEventListener('click', removeItem);
    body.addEventListener('click', updateLocalStorage);
    body.addEventListener('input', updateLocalStorage);
}


loadList()
