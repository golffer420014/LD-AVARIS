<script setup>
import { computed } from 'vue';


const props = defineProps({
    data: {
        type: Object,
        required: true
        // Object with { company, address, taxId, license, tel, email }
    },
    lang: {
        type: String,
        required: true
    }
});

const currLang = computed(() => props.lang);

// Social icons logic can be added here if needed, 
// for now we'll match the design with placeholder-style circles
const socialIcons = [
    { name: 'facebook', img: '/assets/social/facebook.png', color: 'bg-neutral-500' },
    { name: 'line', img: '/assets/social/line.png', color: 'bg-neutral-500' },
    { name: 'wechat', img: '/assets/social/wechat.png', color: 'bg-neutral-500' },
    { name: 'tiktok', img: '/assets/social/tiktok.png', color: 'bg-neutral-500' },
    { name: 'instagram', img: '/assets/social/instagram.png', color: 'bg-neutral-500' },
    { name: 'twitter', img: '/assets/social/x.png', color: 'bg-neutral-500' },
    { name: 'youtube', img: '/assets/social/youtube.png', color: 'bg-neutral-500' },
    { name: 'whatsapp', img: '/assets/social/whatsapp.png', color: 'bg-neutral-500' },
    { name: 'email', img: '/assets/social/email.png', color: 'bg-neutral-500' },
];
</script>

<template>
    <div class="py-16 md:py-24 container mx-auto px-6 text-center text-gray-800">
        <!-- Company Name -->
        <h2 class="text-lg md:text-2xl font-bold mb-8 md:mb-12 tracking-wide">
            {{ data.company }}
        </h2>

        <!-- Contact Details -->
        <div class="space-y-6 md:space-y-8 text-sm md:text-base font-light leading-relaxed">
            <!-- Address -->
            <p class="max-w-2xl mx-auto">
                {{ data.address }}
            </p>

            <!-- Licenses -->
            <div class="space-y-1">
                <p>
                    <span v-if="currLang === 'th'">เลขที่ ประจำตัวผู้เสียภาษี: </span>
                    <span v-else>Tax License No.: </span>
                    {{ data.taxId }}
                </p>
                <p>
                    <span v-if="currLang === 'th'">เลขที่ ใบอนุญาตจัดหางานให้คนหางานเพื่อไปทำงานในต่างประเทศ: </span>
                    <span v-else>Oversea Employment License No.: </span>
                    {{ data.license }}
                </p>
            </div>

            <!-- Phone & Email -->
            <div class="pt-4 space-y-4">
                <p>
                    <span v-if="currLang === 'th'">โทร.: </span>
                    <span v-else>Tel.: </span>
                    <a :href="`tel:${data.tel.replace(/\s+/g, '')}`" class="hover:underline">{{ data.tel }}</a>
                </p>
                <p>
                    <span v-if="currLang === 'th'">อีเมล: </span>
                    <span v-else>Email: </span>
                    <a :href="`mailto:${data.email}`" class="hover:underline">{{ data.email }}</a>
                </p>
            </div>
        </div>

        <!-- Social Icons -->
        <div class="mt-16 md:mt-24">
            <div class="grid grid-cols-5 md:flex md:justify-center gap-4 md:gap-6">
                <div v-for="(icon, index) in socialIcons" :key="index"
                    class="w-12 h-12 md:w-14 md:h-14 cursor-pointer hover:scale-110 transition-transform duration-300 overflow-hidden group">
                    <img :src="icon.img" alt=""
                        class="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity">
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
/* No specific styles needed, tailwind handles it */
</style>
