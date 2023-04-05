<template>
    <router-link :to="{ name: 'product', params: { id: product.id } }"
        class="p-4 w-full border border-gray-300 rounded-lg flex items-center md:flex-col hover:shadow-md hover:-translate-y-1 transition duration-200">
        <div class="w-24 h-24 flex items-center justify-center flex-shrink-0 md:w-60 md:h-60">
            <img :src="product.image" :alt="product.title" class="w-16 object-cover md:w-28" />
        </div>

        <div class="pl-6 flex flex-col gap-3  md:px-3 md:pb-3">
            <h4 class="font-bold break-words line-clamp-1">{{ product.title }}</h4>
            <p>${{ product.price }}</p>

            <div class="flex items-center gap-2 text-sm text-gray-500">
                <p class="flex items-center gap-1">{{ product.rating.rate.toFixed(1) }}
                </p>

                <div class="flex">
                    <svg v-for="i in getRating()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="w-4 h-4 text-yellow-500">
                        <path fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd" />
                    </svg>
                </div>

                <p class="">({{ product.rating.count }})</p>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        getRating() {
            return Math.round(this.product.rating.rate)
        }
    }
}
</script>