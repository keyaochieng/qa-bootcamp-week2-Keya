Feature: Cart

Scenario: A shopper deletes an item from the Cart

Given the shopper is on the cart page
And has one item in the cart
When they click the delete button beside the item
Then the item row dissapears from the cart