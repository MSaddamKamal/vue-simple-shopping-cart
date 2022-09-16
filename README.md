# Shopping Cart - Checkout

## Environment 

- Vue Version: ^3.0.0
- Node Version: v12 (LTS)
- Default Port: 8000

## Application Demo:

![]()

## Functionality

The app has two separate views/components. The Product Listing Component and Cart Component.

The Product Listing component implement the following functionalities:

- Clicking on each 'Add To Cart' button  add the item to the shopping cart. When an item is added to the cart, 
  - 'Add To Cart' button  be removed from view and 'Remove From Cart' button  be displayed.
  - An entry  be added to the table in Cart Component.

- Clicking on each 'Remove From Cart' button  remove the item from the cart and display 'Add to Cart' button for the corresponding product item.

- The Cart Component  have the following functionalities:

  - Display all the items in the cart in a table.

  - Display the Cart Subtotal, Discount Value, and Total Price. 

  - The Cart has a Coupon Select Input. On selecting a coupon from this input, an appropriate discount is applied and the total price is calculated and displayed. `(Subtotal - Discount = Total Price)`

- Items  be displayed in the Cart Component in the order they are added to Cart. 

- The list of products and the cart object is passed as Prop to the Product Listing Component and Cart Component respectively.

Each product object contains the following properties: 
- name: Name of the product. [STRING]
- price - The price of the Product. [NUMBER]
- id: Unique ID of the product. (Auto Generated) [NUMBER]
- image:  The image URL of the product. [STRING]
- cartQuantity: The quantity of the item in the cart. The default value  be 0. [NUMBER]


Each item in the cart, Type CartItem has the following properties:
- id: Same as ID of the product. [NUMBER]
- item - The heading property of the product. [STRING]
- quantity: The quantity of the item in the cart [NUMBER]
- price: The total amount of the item in cart. (quantity x product.price) [NUMBER]

