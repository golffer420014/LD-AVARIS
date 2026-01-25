<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const props = defineProps({
    images: {
        type: Array,
        required: true,
    }
});

const galleryId = 'my-gallery';
let lightbox = null;

onMounted(() => {
    lightbox = new PhotoSwipeLightbox({
        gallery: '#' + galleryId,
        children: 'a',
        pswpModule: () => import('photoswipe'),
    });
    lightbox.init();
});

onUnmounted(() => {
    if (lightbox) {
        lightbox.destroy();
        lightbox = null;
    }
});
</script>

<template>
    <div :id="galleryId" class="grid grid-cols-3 gap-2">
        <a v-for="(image, index) in images" :key="index" :href="image.src" :data-pswp-width="image.width"
            :data-pswp-height="image.height" target="_blank" rel="noreferrer"
            class="aspect-square overflow-hidden group relative bg-gray-100">
            <img :src="image.src" :alt="image.alt || 'Gallery image'"
                class="border border-black/60 w-full h-full object-cover transition-transform duration-500" />
            <div
                class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <!-- <span class="text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity delay-100">View</span> -->
            </div>
        </a>
    </div>
</template>

<style scoped>
/* Optional: specific styles if needed */
</style>
