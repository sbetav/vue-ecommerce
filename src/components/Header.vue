
<template>
    <header class="flex items-center justify-center bg-white sticky py-4 top-0 z-10 border-b border-gray-300">
        <div class="flex justify-between items-center max-w-7xl w-5/6 ">
            <router-link to="/">
                <h1 class="font-extrabold text-xl">LOGO</h1>
            </router-link>
            <router-link to="/cart" class="relative flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-10 opacity-70">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <div
                    class="absolute  right-0 left-0 bottom-0 w-10 h-7 rounded-full text-center flex items-center justify-center text-sm font-bold">
                    {{ totalItems }}
                </div>
            </router-link>
        </div>
    </header>
</template>


<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "../store/cart";
const cartStore = useCartStore();
const { totalItems } = storeToRefs(cartStore);
</script>