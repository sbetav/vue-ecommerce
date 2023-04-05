import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    };
  },
  getters: {
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    totalItems: (state) => {
      return state.cartItems.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    }
  },
  actions: {
    addToCart(product, quantity) {
      const cartItem = this.cartItems.find((item) => item.id === product.id);
      if (!cartItem) {
        this.cartItems.push({
          ...product,
          quantity,
        });
      } else {
        cartItem.quantity += quantity;
      }
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },
    removeFromCart(id) {
      const index = this.cartItems.findIndex((item) => item.id === id);
      this.cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },
    increaseQuantity(id) {
      const cartItem = this.cartItems.find((item) => item.id === id);
      cartItem.quantity++;
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    },
    decreaseQuantity(id) {
      const cartItem = this.cartItems.find((item) => item.id === id);
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
      }
    },
  },
});
