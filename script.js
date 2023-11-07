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
    const item = createItem()
    document.getElementById('item-list').appendChild(item)
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

function rollItem() {

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
