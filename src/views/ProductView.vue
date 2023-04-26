<template>
    <main class="grid place-items-center screenHeight py-16">
        <div v-if="product" class="max-w-7xl w-5/6 flex flex-col items-center justify-center gap-11 lg:flex-row lg:gap-16">
            <img :src="product.image" :alt="product.title" class="p-10 max-w-xs w-full">
            <div class="flex flex-col gap-6">
                <div>
                    <h1 class="font-bold text-xl mb-2">{{ product.title }}</h1>

                    <div class="flex items-center gap-2 text-sm text-gray-500">
                        <p class="flex items-center gap-1">{{ product.rating.rate }}
                        </p>

                        <div class="flex">
                            <svg v-for="i in getRating()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" class="w-4 h-4 text-yellow-500">
                                <path fill-rule="evenodd"
                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>


                        <p class="">({{ product.rating.count }})</p>
                    </div>
                </div>

                <div>

                    <h3 class="font-bold">Details:</h3>
                    <p class="first-letter:uppercase">{{ product.description }}</p>
                </div>
                <p class="font-bold text-2xl">${{ product.price }}</p>


                <div class="font-bold flex items-center gap-6">
                    Quantity:
                    <div class="border border-gray-600 w-28 flex items-center justify-evenly rounded-md py-1 font-normal">
                        <button @click="decreaseQuantity" class="text-xl w-full">-</button>
                        <p>{{ quantity }}</p>
                        <button @click="increaseQuantity" class="text-xl w-full">+</button>
                    </div>
                </div>

                <div class="flex gap-5">
                    <button @click="addToCart(product, quantity)" class="btn btn-outline">Add to cart</button>
                    <button class="btn btn-filled">Buy Now</button>
                </div>

            </div>
        </div>
        <div v-else-if="notFound" class="text-center">
            <h1 class="font-bold text-7xl">404</h1>
            <p class="text-xl">Product not found</p>
        </div>
        <div v-else>
            <p class="text-xl">Loading...</p>
        </div>

        <div ref="toast" v-if="toast"
            class="flex items-center justify-center gap-3 border border-gray-300 px-4 py-2 rounded-lg fixed top-12 z-10 bg-white animate-fade-in shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-7 h-7 p-1 bg-black text-white rounded-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <p>Item added to the cart</p>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCartStore } from "../store/cart";

const toast = ref(false)

const props = defineProps(['id'])
const cartStore = useCartStore()

const product = ref(null)
const notFound = ref(false)
const quantity = ref(1)

const getRating = () => {
    return Math.round(product.value.rating.rate)
}

const increaseQuantity = () => {
    quantity.value++
}

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}

const addToCart = (product, quantity) => {
    cartStore.addToCart(product, quantity)
    toast.value = true
    setTimeout(() => {
        const toastRef = document.querySelector('.animate-fade-in')
        if (toastRef) {
            toastRef.classList.remove('animate-fade-in')
            toastRef.classList.add('animate-fade-out')
        }
    }, 3000)
    setTimeout(() => {
        toast.value = false
    }, 3250)
}

onMounted(async () => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${props.id}`)
        product.value = await response.json()
    } catch (error) {
        notFound.value = true
    }
})

</script>