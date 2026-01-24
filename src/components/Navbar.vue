<script setup>
import { ref, onMounted, computed } from 'vue';
import { ui, defaultLang } from '@/i18n/ui';
import { getLocalizedPath } from '@/i18n/utils';
import { X } from 'lucide-vue-next';

const props = defineProps({
    lang: {
        type: String,
        required: true
    },
    currentPath: {
        type: String,
        required: true
    }
});
const currLang = computed(() => props.lang);

const isMenuOpen = ref(false);
const scrollContainer = ref(null);

const t = (key) => {
    return ui[props.lang][key] || ui[defaultLang][key];
};

const menu = [
    { label: t("nav.property"), href: getLocalizedPath("/", props.lang) },
    { label: t("nav.manpower"), href: getLocalizedPath("/manpower", props.lang) },
    { label: t("nav.placement"), href: getLocalizedPath("/", props.lang) },
    { label: t("nav.insurance"), href: getLocalizedPath("/", props.lang) },
    { label: t("nav.visa"), href: getLocalizedPath("/", props.lang) },
    { label: t("nav.legal"), href: getLocalizedPath("/", props.lang) },
    { label: t("nav.logistic"), href: getLocalizedPath("/", props.lang) },
    { label: t("nav.trading"), href: getLocalizedPath("/", props.lang) },
];

const getLangPath = (targetLang) => {
    const parts = props.currentPath.split("/").filter(Boolean);

    // Remove current lang prefix if it exists
    if (parts[0] === 'en' || parts[0] === 'th') {
        parts.shift();
    }

    // Add target lang prefix if it's not the default
    if (targetLang !== defaultLang) {
        parts.unshift(targetLang);
    }

    return '/' + parts.join("/");
};

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    if (scrollContainer.value) {
        scrollContainer.value.style.overflow = isMenuOpen.value ? "hidden" : "";
    }
};

onMounted(() => {
    scrollContainer.value = document.querySelector('.overflow-y-scroll');
});

// Watch for route changes (if any client side) or just cleanup
</script>

<template>
    <nav class="h-[50px] bg-white sticky top-0 z-50">
        <div
            class="flex items-center justify-between h-full max-w-6xl mx-auto px-4 lg:px-0 relative border-b border-gray-100">
            <!-- Logo -->
            <a :href="getLocalizedPath('/', props.lang)"
                class="text-[1.5em] lg:text-[1.7em] mt-1 lg:mt-2 font-normal tracking-[0.4em] text-black lg:absolute lg:-left-12">
                AVARIS
            </a>

            <!-- Desktop Navigation Links -->
            <div :class="{
                'space-x-[8px]': currLang === 'th',
                'space-x-[18px]': currLang === 'en',
            }"
                class="hidden lg:flex items-center text-xs text-gray-800 uppercase absolute left-1/2 -translate-x-1/2 mt-0.5">
                <template v-for="(item, index) in menu" :key="index">
                    <a :href="item.href" class="hover:text-black transition-colors">
                        {{ item.label }}
                    </a>
                    <span v-if="index !== menu.length - 1" class="bg-gray-200 w-[1.8px] h-[14px]"></span>
                </template>
            </div>

            <!-- Desktop Language & Burger -->
            <div class="flex items-center space-x-4 lg:absolute lg:right-0">
                <div
                    class="hidden lg:flex items-center space-x-2 text-[10px] uppercase tracking-wider font-medium text-gray-500">
                    <a :href="getLangPath('th')"
                        :class="['text-xl transition-opacity', currLang === 'th' ? 'opacity-100' : 'opacity-20']">🇹🇭</a>
                    <span class="w-px h-3 bg-gray-300"></span>
                    <a :href="getLangPath('en')"
                        :class="['text-xl transition-opacity', currLang === 'en' ? 'opacity-100' : 'opacity-20']">🏴󠁧󠁢󠁥󠁮󠁧󠁿</a>
                </div>

                <button @click="toggleMenu"
                    class="lg:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1.5 focus:outline-none z-50">
                    <span :style="isMenuOpen ? 'transform: translateY(7px) rotate(45deg)' : ''"
                        class="w-full h-px bg-black transition-transform duration-300"></span>
                    <span :style="isMenuOpen ? 'opacity: 0' : ''"
                        class="w-full h-px bg-black transition-opacity duration-300"></span>
                    <span :style="isMenuOpen ? 'transform: translateY(-7px) rotate(-45deg)' : ''"
                        class="w-full h-px bg-black transition-transform duration-300"></span>
                </button>
            </div>
        </div>

        <!-- Mobile Drawer Overlay -->
        <div v-if="isMenuOpen" @click="toggleMenu"
            class="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 transition-opacity duration-300">
        </div>

        <!-- Mobile Drawer -->
        <div
            :class="['fixed top-0 right-0 w-full h-full bg-white z-[51] transition-transform duration-500 ease-in-out lg:hidden flex flex-col', isMenuOpen ? 'translate-x-0' : 'translate-x-full']">

            <!-- Drawer Header -->
            <div class="flex items-center justify-between h-[50px] px-4 border-b border-gray-200 shrink-0">
                <h3 class="text-[1.5em] font-normal tracking-[0.4em] text-black">AVARIS</h3>
                <button @click="toggleMenu" class="p-2 -mr-2 cursor-pointer text-black focus:outline-none"
                    aria-label="Close menu">
                    <X class="w-6 h-6 stroke-1.5" />
                </button>
            </div>

            <div class="flex-1 overflow-y-auto px-10 py-4">
                <div class="flex flex-col space-y-2 uppercase tracking-[0.2em] text-sm font-light">
                    <a v-for="(item, index) in menu" :key="index" :href="item.href" @click="isMenuOpen = false"
                        class="text-gray-800 font-semibold hover:text-black transition-colors py-2 flex justify-between items-center group">
                        {{ item.label }}
                        <span class="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>

                    <div class="pt-10 flex justify-center border-t border-gray-100 mt-4 space-x-6">
                        <a :href="getLangPath('th')"
                            :class="['text-3xl transition-opacity', currLang === 'th' ? 'opacity-100' : 'opacity-20']">🇹🇭</a>
                        <a :href="getLangPath('en')"
                            :class="['text-3xl transition-opacity', currLang === 'en' ? 'opacity-100' : 'opacity-20']">🏴󠁧󠁢󠁥󠁮󠁧󠁿</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
