<script setup>
import { computed } from 'vue';
import { ui, defaultLang } from '@/i18n/ui';
import PhotoGallery from './PhotoGallery.vue';

const props = defineProps({
    lang: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    }
});

const t = (key) => {
    return ui[props.lang][key] || ui[defaultLang][key];
};
const currentLang = computed(() => props.lang);
</script>

<template>
    <div class="max-w-3xl mx-auto text-gray-800">
        <h2 :class="{
            'text-[18px] md:text-[26px]': currentLang === 'th',
            'text-[18px] md:text-[26px] tracking-[0.2em] uppercase my-12 text-center': currentLang === 'en',
        }" class="text-[18px] md:text-[26px] my-12 text-center text-black">
            {{ t("manpower.services.title") }}
        </h2>

        <p :class="{
            'text-[.65em] md:text-[.92em] leading-relaxed px-[4px]': currentLang === 'th',
            'text-[.65em] md:text-[.99em] px-[10px]': currentLang === 'en',
        }" class="font-light mb-8 text-pretty text-center  md:px-0" v-html="t('manpower.services.description')">
        </p>

        <div class="md:w-180 md:ml-14 px-4 md:px-0 mx-auto">
            <h3 class="mb-4 text-center font-bold md:pr-[44px] -translate-y-[4px]"
                v-html="t('manpower.services.subtitle')">
            </h3>

            <div class="grid grid-cols-1">
                <div v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]" :key="i" class="flex items-start space-x-2">
                    <span
                        class="text-black font-normal mt-[5px] md:mt-2 w-[4px] h-[4px] md:w-[5px] md:h-[5px] rounded-full bg-black shrink-0"></span>
                    <div :class="{
                        'md:min-w-[200px] text-[.6em] md:text-[.8em]': currentLang === 'th',
                        'md:min-w-[120px] text-[.6em] md:text-[.9em]': currentLang === 'en',
                    }" class="leading-relaxed">
                        <span :class="{
                            'md:min-w-[200px]': currentLang === 'th',
                            'md:min-w-[120px]': currentLang === 'en',
                        }" class=" inline-block font-bold md:font-normal">
                            {{ t(`manpower.services.item${i}.label`) }}
                        </span>
                        <span>
                            {{ t(`manpower.services.item${i}.description`) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-10 md:mt-22 px-4 md:px-0">
            <PhotoGallery :images="images" />
        </div>
    </div>
</template>
