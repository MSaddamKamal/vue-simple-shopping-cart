import {mount} from '@vue/test-utils';
import App, {PRODUCTS} from '../src/Checkout.vue';

describe('shopping_checkout_application', () => {
    let wrapper;

    const IDMAPS = {
        ADD_TO_CART_BTN: 'btn-item-add',
        REMOVE_FROM_CART_BTN: 'btn-item-remove',
        CART_COUPON_SELECT: 'cart-coupon',
        CART_ITEM_QUANTITY: 'cart-item-quantity',
        CART_ITEM_NAME: 'cart-item-name',
        PRODUCT_ITEMS: ['product-item-0', 'product-item-1', 'product-item-2', 'product-item-3', 'product-item-4', 'product-item-5'],
        CART_ITEM_PRICE: 'cart-item-price',
        CART_SUBTOTAL: 'cart-subtotal',
        CART_DISCOUNT: 'cart-discount',
        CART_TOTAL: 'cart-total'
    }

    const getByTestId = (id, parent) => {
        if (!parent) {
            parent = wrapper;
        }
        return parent.find(`[data-testid="${id}"]`)
    }

    const getById = (id, parent) => {
        if (!parent) {
            parent = wrapper;
        }
        return parent.find(`#${id}`)
    }

    const exists = (id, parent) => {
        if (!parent) {
            parent = wrapper;
        }
        return parent.find(`[data-testid="${id}"]`).exists();
    }

    const addToCart = async (itemId) => {
        const item = getByTestId(itemId);
        return await getByTestId(IDMAPS.ADD_TO_CART_BTN, item).trigger('click');
    }

    const removeFromCart = async (itemId) => {
        const item = getByTestId(itemId);
        return await getByTestId(IDMAPS.REMOVE_FROM_CART_BTN, item).trigger('click');
    }

    const getCartItem = (index) => {
        const cartListItem = getByTestId(`cart-item-${index}`)

        const cartItemQuantity = getByTestId('cart-item-quantity', cartListItem);
        const cartItemName = getByTestId('cart-item-name', cartListItem);
        const cartItemPrice = getByTestId('cart-item-price', cartListItem);
        return {
            quantity: parseInt(cartItemQuantity.element.innerHTML),
            name: cartItemName.element.innerHTML,
            price: parseInt(cartItemPrice.element.innerHTML.replace('$', '')),
            node: cartListItem.element.innerHTML
        }
    }

    const getCartDetails = () => {
        return {
            subTotal: parseInt(getByTestId(IDMAPS.CART_SUBTOTAL).element.innerHTML.replace('$', '')),
            discount: parseInt(getByTestId(IDMAPS.CART_DISCOUNT).element.innerHTML.replace('$', '')),
            total: parseInt(getByTestId(IDMAPS.CART_TOTAL).element.innerHTML.replace('$', '')),
        };
    }

    const getDiscountValue = (product, value) => {
        return (value / 100) * product.price;
    }

    const pushDiscountValue = async (value) => {
        const couponSelect = getByTestId(IDMAPS.CART_COUPON_SELECT);
        return couponSelect.setValue(value);
    };

    beforeEach(() => {
        wrapper = mount(App);
    })

    it('should add item to cart', async () => {
        expect(exists('cart-item-0')).toBeFalsy();
        let item, addToCartButton;
        item = getByTestId(IDMAPS.PRODUCT_ITEMS[1])
        expect(item.exists()).toBeTruthy();
        addToCartButton = getByTestId(IDMAPS.ADD_TO_CART_BTN, item);
        expect(addToCartButton.exists()).toBeTruthy();
        expect(exists(IDMAPS.REMOVE_FROM_CART_BTN, item)).toBeFalsy();

        await addToCartButton.trigger('click');

        expect(exists(IDMAPS.ADD_TO_CART_BTN, item)).toBeFalsy();
        expect(exists(IDMAPS.REMOVE_FROM_CART_BTN, item)).toBeTruthy();

        const cartItem = getByTestId('cart-item-0');
        expect(cartItem).toBeTruthy();

        expect(getByTestId(IDMAPS.CART_ITEM_QUANTITY, cartItem).element.innerHTML).toEqual('1')
        expect(getByTestId(IDMAPS.CART_ITEM_NAME, cartItem).element.innerHTML).toEqual('Hand Bag - $30')

    });

    it('should Calculate correct price before selecting coupon', async () => {
        await addToCart(IDMAPS.PRODUCT_ITEMS[0])
        let cartItem = getCartItem(0);

        expect(cartItem.price).toEqual(PRODUCTS[0].price);
        expect(cartItem.quantity).toEqual(1);

        let cartDetails = getCartDetails();

        expect(cartDetails.subTotal).toEqual(cartDetails.total);
        expect(cartDetails.discount).toEqual(0);
        expect(cartDetails.total).toEqual(PRODUCTS[0].price);

        await addToCart(IDMAPS.PRODUCT_ITEMS[2])
        cartItem = getCartItem(1);
        expect(cartItem.price).toEqual(PRODUCTS[2].price);

        cartDetails = getCartDetails();
        expect(cartDetails.discount).toEqual(0);
        expect(cartDetails.total).toEqual(PRODUCTS[0].price + PRODUCTS[2].price);
    })

    it('should calculate discounts on selecting a coupon', async () => {
        await addToCart(IDMAPS.PRODUCT_ITEMS[3]);
        await pushDiscountValue(10);
        let cartDetails = getCartDetails();
        let calculatedDiscount = getDiscountValue(PRODUCTS[3], 10);
        expect(cartDetails.discount).toEqual(calculatedDiscount);
        expect(cartDetails.subTotal).toEqual(PRODUCTS[3].price);
        expect(cartDetails.total).toEqual(PRODUCTS[3].price - calculatedDiscount);
    })

    it('should recalculate prices when item is removed from cart', async () => {
        await addToCart(IDMAPS.PRODUCT_ITEMS[2]);
        await pushDiscountValue(20);

        let cartDetails = getCartDetails();
        let calculatedDiscount = getDiscountValue(PRODUCTS[2], 20);
        expect(cartDetails.discount).toEqual(calculatedDiscount);
        expect(cartDetails.subTotal).toEqual(PRODUCTS[2].price);
        expect(cartDetails.total).toEqual(PRODUCTS[2].price - calculatedDiscount);

        await addToCart(IDMAPS.PRODUCT_ITEMS[3]);
        cartDetails = getCartDetails();
        calculatedDiscount += getDiscountValue(PRODUCTS[3], 20);
        expect(cartDetails.discount).toEqual(calculatedDiscount);
        expect(cartDetails.total).toEqual((PRODUCTS[3].price + PRODUCTS[2].price) - calculatedDiscount);

        await removeFromCart(IDMAPS.PRODUCT_ITEMS[2])
        cartDetails = getCartDetails();
        calculatedDiscount -= getDiscountValue(PRODUCTS[2], 20);
        expect(cartDetails.discount).toEqual(calculatedDiscount);
        expect(cartDetails.total).toEqual((PRODUCTS[3].price) - calculatedDiscount);
    })

  
});
