function updateLocalStorage() {
    const itemList = document.getElementById('item-list');
    const items = itemList.getElementsByTagName('li');
    const htmlString = itemList.outerHTML;
    localStorage.setItem('itemList', htmlString);
    let categories = []
    for (let i = 0; i < items.length; i++) {
        const input = items[i].querySelector('input[type="text"]');
        categories.push(input.value)
    }
    localStorage.setItem('categories', categories);
}

function createItem() {
    const item = document.createElement('li')

    const itemInfo = document.createElement('div')
    itemInfo.setAttribute('class', 'item-info')
    item.appendChild(itemInfo)

    const itemText = document.createElement('input')
    itemText.setAttribute('type', 'text')
    itemInfo.appendChild(itemText)

    const removeButton = document.createElement('button')
    removeButton.setAttribute('title', 'remove item')
    removeButton.innerText = 'X'
    itemInfo.appendChild(removeButton)

    const itemWeight = document.createElement('div')
    itemWeight.setAttribute('class', 'item-weight')
    item.appendChild(itemWeight)

    const marble = document.createElement('div')
    itemWeight.appendChild(marble)

    return item
}

function addItem() {
    document.getElementById('item-list').appendChild(createItem())
    updateLocalStorage()
}

function removeItem(event) {
    if (event.target.tagName === 'BUTTON' && event.target.title === 'remove item') {
        const itemList = document.getElementById('item-list');
        const itemCount = itemList.getElementsByTagName('li').length;

        if (itemCount > 1) {
            event.target.closest('li').remove();
            updateLocalStorage()
        } else {
            alert('Cannot remove the last item!');
        }
    }
}

function marbleRaffle() {
    const itemList = document.getElementById('item-list');
    const items = itemList.getElementsByTagName('li');

    // Build weighted list
    let weightedList = [];
    for (let i = 0; i < items.length; i++) {
        const marbles = items[i].querySelectorAll('.item-weight div');
        for (let j = 0; j < marbles.length; j++) {
            weightedList.push(i)
        }
    }

    // Pick a random item
    const randomIndex = weightedList[Math.floor(Math.random() * weightedList.length)]
    const chosenItem = items[randomIndex];

    // Remove all but one marble from the chosen item
    const chosenItemMarbles = chosenItem.querySelectorAll('.item-weight div');
    for (let i = chosenItemMarbles.length - 1; i > 0; i--) {
        chosenItemMarbles[i].remove();
    }

    // Add one marble to all other items
    for (let i = 0; i < items.length; i++) {
        if (i !== randomIndex) {
            const weight = items[i].querySelector('.item-weight');
            const marble = document.createElement('div');
            weight.appendChild(marble);
        }
    }

    // Show an alert with the value of the chosen item
    const value = chosenItem.querySelector('input[type="text"]').value;
    alert(value);
    updateLocalStorage()
}

function createDefaultItemList() {
    const itemList = document.createElement('ol')
    itemList.setAttribute('id', 'item-list')
    itemList.appendChild(createItem())

    return itemList
}

function resetList() {
    const itemList = document.getElementById('item-list')
    const newItemList = createDefaultItemList()
    itemList.parentNode.replaceChild(newItemList, itemList)
    updateLocalStorage()
}

const itemListString = localStorage.getItem('itemList');
const categoryList = localStorage.getItem('categories').split(',');

if (itemListString !== null) {
    document.getElementById('main').innerHTML = itemListString
    const inputFields = document.querySelectorAll('input[type="text"]')
    for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].setAttribute('value', categoryList[i])
    }
} else {
    document.getElementById('main').appendChild(createDefaultItemList())
}

document.getElementById('main').addEventListener('click', removeItem);
document.getElementById('main').addEventListener('click', updateLocalStorage);
document.getElementById('main').addEventListener('input', updateLocalStorage);
