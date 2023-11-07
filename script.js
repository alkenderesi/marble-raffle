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
}

function removeItem(event) {
    if (event.target.tagName === 'BUTTON') {
        const itemList = document.getElementById('item-list');
        const itemCount = itemList.getElementsByTagName('li').length;

        if (itemCount > 1) {
            event.target.closest('li').remove();
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
}

function createDefaultItemList() {
    const itemList = document.createElement('ol')
    itemList.setAttribute('id', 'item-list')
    itemList.appendChild(createItem())
    itemList.addEventListener('click', removeItem);

    return itemList
}

function resetList() {
    const itemList = document.getElementById('item-list')
    const newItemList = createDefaultItemList()
    itemList.parentNode.replaceChild(newItemList, itemList)
}


document.getElementById('main').appendChild(createDefaultItemList())
