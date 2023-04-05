<template>
  <main class="flex justify-center py-16 screenHeight">
    <section class="max-w-4xl w-5/6  flex justify-center items-center flex-col gap-4">
      <h1 class="font-bold text-lg">Your Cart <span>({{ totalItems }} {{ totalItems == 1 ? "item" : "items" }})</span>
      </h1>

      <div v-if="cartItems.length" class="w-full flex flex-col gap-10">

        <div class="flex flex-col gap-5">
          <div v-for="product in cartItems" class="p-4 border border-gray-300 rounded-lg flex items-center">
            <div class="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center flex-shrink-0 ">
              <img :src="product.image" :alt="product.title" class="w-14 sm:w-16 object-cover " />
            </div>

            <div class="w-full grid place-items-center">
              <div class="px-6 flex flex-col justify-between gap-3 w-full">
                <div class="flex flex-col sm:flex-row justify-between">
                  <p class="break-words line-clamp-1">{{ product.title }}</p>
                  <p class="font-bold sm:text-xl sm:pl-4">${{ (product.price * product.quantity).toFixed(2) }}</p>
                </div>

                <div class="flex justify-between">
                  <div
                    class="border border-gray-600 w-24 sm:w-28 flex items-center justify-evenly rounded-md py-1 font-normal">
                    <button @click="decreaseQuantity(product.id)" class="text-xl w-full">-</button>
                    <p>{{ product.quantity }}</p>
                    <button @click="increaseQuantity(product.id)" class="text-xl w-full">+</button>
                  </div>
                  <button @click="removeFromCart(product.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6 text-red-500">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="cartItems.length" class=" w-full">

        <p class="font-bold text-xl flex justify-between">Total: <span class="font-normal">${{
          cartStore.cartTotal.toFixed(2) }}</span></p>

        <button class="btn btn-filled w-full mt-4 cursor-not-allowed bg-gray-300 border-gray-300" disabled>Pay With
          Stripe</button>
        <p class="text-sm text-center mt-2 italic text-gray-600">I'll implement stripe checkout when <a
            href="https://docs.vuestripe.com/vue-stripe/v/vue-3/" class="underline" target="_blank">Vue Stripe</a> is
          available for Vue 3</p>
      </div>


      <div v-if="!cartItems.length" class="flex flex-col gap-4">
        <p class="text-center text-2xl">Your cart is empty</p>
        <router-link to="/" class="text-center btn btn-filled">
          Continue Shopping
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();

const { cartItems } = cartStore;
const { totalItems } = storeToRefs(cartStore);

// Cart methods
const { removeFromCart, increaseQuantity, decreaseQuantity } = cartStore;

</script>


