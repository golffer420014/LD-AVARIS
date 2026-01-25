<script setup>
import { ref, onMounted, computed } from 'vue';
import { ui, defaultLang } from '@/i18n/ui';
import { getLocalizedPath } from '@/i18n/utils';
import { X, ChevronDown } from 'lucide-vue-next';

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
const isLangOpen = ref(false);
const isMobileLangOpen = ref(false);
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

    // Click outside listener for language dropdown
    window.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-dropdown')) {
            isLangOpen.value = false;
        }
    });
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
            <div
                class="hidden lg:flex items-center text-xs w-[832px] justify-between text-gray-800 uppercase absolute left-1/2 -translate-x-1/2 mt-0.5">
                <template v-for="(item, index) in menu" :key="index">
                    <a :href="item.href" class="hover:text-black transition-colors">
                        {{ item.label }}
                    </a>
                    <span v-if="index !== menu.length - 1" class="bg-gray-200 w-[1.8px] h-[14px]"></span>
                </template>
            </div>

            <!-- Desktop Language Dropdown -->
            <div class="hidden lg:block lg:absolute lg:right-0">
                <div class="relative lang-dropdown">
                    <button @click="isLangOpen = !isLangOpen"
                        class="flex items-center space-x-2.5 px-3 py-1.5 transition-colors group">
                        <img :src="currLang === 'th' ? '/assets/flag/thailand.png' : '/assets/flag/unitedstate.png'"
                            :alt="currLang" class="w-5 h-5 rounded-full object-cover border border-gray-100" />
                    </button>

                    <!-- Dropdown Menu -->
                    <transition enter-active-class="transition duration-200 ease-out"
                        enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-150 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0">
                        <div v-if="isLangOpen"
                            class="absolute right-1 mt-1 w-fit bg-white border border-gray-100 rounded-sm shadow-gray-200/50 py-1.5 z-60">
                            <a :href="getLangPath('th')"
                                class="flex items-center space-x-3 px-2 py-2 transition-colors">
                                <img src="/assets/flag/thailand.png" alt="TH"
                                    class="w-5 h-5 rounded-full object-cover border border-gray-100" />
                            </a>
                            <a :href="getLangPath('en')"
                                class="flex items-center space-x-3 px-2 py-2 transition-colors">
                                <img src="/assets/flag/unitedstate.png" alt="EN"
                                    class="w-5 h-5 rounded-full object-cover border border-gray-100" />
                            </a>
                        </div>
                    </transition>
                </div>
            </div>

            <div class="lg:hidden flex items-center lg:absolute lg:right-0">
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
                <div :class="{ 'tracking-normal': currLang === 'th', 'tracking-[0.2em]': currLang === 'en' }"
                    class="flex flex-col space-y-2 uppercase text-sm font-light">
                    <a v-for="(item, index) in menu" :key="index" :href="item.href" @click="isMenuOpen = false"
                        class="text-gray-800 hover:text-black transition-colors py-2 flex justify-between items-center group">
                        {{ item.label }}
                        <span class="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </a>

                    <!-- Mobile Language Dropdown -->
                    <div class="pt-8 border-t border-gray-100 mt-4">
                        <div class="relative">
                            <button @click="isMobileLangOpen = !isMobileLangOpen"
                                class="w-full flex items-center justify-between transition-colors">
                                <div class="flex items-center space-x-3">
                                    <img :src="currLang === 'th' ? '/assets/flag/thailand.png' : '/assets/flag/unitedstate.png'"
                                        :alt="currLang"
                                        class="w-6 h-6 rounded-full object-cover border border-gray-200" />
                                    <span class="text-sm  uppercase tracking-widest text-gray-700">
                                        {{ currLang === 'th' ? 'ไทย (TH)' : 'ENGLISH (EN)' }}
                                    </span>
                                </div>
                                <ChevronDown
                                    :class="['w-4 h-4 transition-transform duration-300', isMobileLangOpen ? 'rotate-180' : '']" />
                            </button>

                            <transition enter-active-class="transition duration-200 ease-out"
                                enter-from-class="transform -translate-y-2 opacity-0"
                                enter-to-class="transform translate-y-0 opacity-100"
                                leave-active-class="transition duration-150 ease-in"
                                leave-from-class="transform translate-y-0 opacity-100"
                                leave-to-class="transform -translate-y-2 opacity-0">
                                <div v-if="isMobileLangOpen"
                                    class="mt-2 bg-white rounded-xl shadow-sm border border-gray-50  overflow-hidden">
                                    <a :href="getLangPath('th')"
                                        class="flex items-center space-x-4 px-5 py-4 transition-colors">
                                        <img src="/assets/flag/thailand.png" alt="TH"
                                            class="w-6 h-6 rounded-full object-cover border border-gray-100" />
                                        <span :class="['text-sm tracking-wider']">ไทย
                                            (TH)</span>
                                    </a>
                                    <a :href="getLangPath('en')"
                                        class="flex items-center space-x-4 px-5 py-4 transition-colors border-t border-gray-50">
                                        <img src="/assets/flag/unitedstate.png" alt="EN"
                                            class="w-6 h-6 rounded-full object-cover border border-gray-100" />
                                        <span :class="['text-sm tracking-wider']">ENGLISH
                                            (EN)</span>
                                    </a>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
