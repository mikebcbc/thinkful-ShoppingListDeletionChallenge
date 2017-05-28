var STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
];

var SHOPPING_LIST_ELEMENT_IDENTIFIER = '.js-shopping-list';
var ITEM_NAME_IDENTIFIER = '.js-shopping-item';
var ITEM_CHECKED_TARGET_IDENTIFIER = '.js-shopping-item';
var ITEM_TEMPLATE_IDENTIFIER = '#list-item-template';
var ITEM_CHECKED_CLASS_NAME = 'shopping-item__checked';
var ITEM_INDEX_ATTRIBUTE  = 'data-item-index';
var ITEM_INDEX_ELEMENT_IDENTIFIER = '.js-item-index-element';
var NEW_ITEM_FORM_IDENTIFIER = '#js-shopping-list-form';
var NEW_ITEM_FORM_INPUT_IDENTIFIER = '.js-shopping-list-entry';

var ITEM_CHECKED_BUTTON_IDENTIFIER = '.js-item-toggle';
var ITEM_DELETE_BUTTON_IDENTIFIER = '.js-item-delete';


function generateItemElement(item, itemIndex, template) {
  template.find(ITEM_NAME_IDENTIFIER).text(item.name);
  template.find(ITEM_CHECKED_TARGET_IDENTIFIER).toggleClass(ITEM_CHECKED_CLASS_NAME, item.checked);
  template.find(ITEM_INDEX_ELEMENT_IDENTIFIER).attr(ITEM_INDEX_ATTRIBUTE, itemIndex);
  return template.html();
}

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");
  var items = shoppingList.map(function(item, index) {
    var template = $(ITEM_TEMPLATE_IDENTIFIER).clone();
    return generateItemElement(item, index, template);
  });
  return items.join();
}

function renderShoppingList() {
  console.log('`renderShoppingList` ran');
  // generate HTML for the list
  var shoppingListItemsString = generateShoppingItemsString(STORE);
  // insert that HTML into the DOM
  $(SHOPPING_LIST_ELEMENT_IDENTIFIER).html(shoppingListItemsString);

}

function addItemToShoppingList(itemName) {
  console.log('Adding "' + itemName + " to shopping list");
  STORE.push({name: itemName, checked: false});
}


function handleNewItemSubmit() {
  $(NEW_ITEM_FORM_IDENTIFIER).submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    
    var newItemElement = $(NEW_ITEM_FORM_INPUT_IDENTIFIER);
    var newItemName = newItemElement.val();
    
    newItemElement.val('');

    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function getItemIndexFromElement(item) {
  var itemIndexString = $(item)
    .closest(ITEM_INDEX_ELEMENT_IDENTIFIER)
    .attr(ITEM_INDEX_ATTRIBUTE);
  return parseInt(itemIndexString, 10);
}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

function deleteListItem(itemIndex) {
  console.log("Deleting item at index " + itemIndex);
  STORE.splice(itemIndex, 1);
}


function handleItemCheckClicked() {
  $(SHOPPING_LIST_ELEMENT_IDENTIFIER).on('click', ITEM_CHECKED_BUTTON_IDENTIFIER, function(event) {
    console.log('`handleItemCheckClicked` ran');
    var itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


function handleDeleteItemClicked() {
  $(SHOPPING_LIST_ELEMENT_IDENTIFIER).on('click', ITEM_DELETE_BUTTON_IDENTIFIER, function(event) {
    console.log('`handleDeleteItemClicked` ran');
    var itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  })
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);
