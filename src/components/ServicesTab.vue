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
    <div class="mx-auto text-gray-800 space-y-12 py-12">
        <h2 :class="{
            'text-[18px] md:text-[26px]': currentLang === 'th',
            'text-[18px] md:text-[26px] tracking-[0.2em] uppercase text-center': currentLang === 'en',
        }" class="text-[18px] md:text-[26px] text-center text-black max-w-3xl mx-auto">
            {{ t("manpower.services.title") }}
        </h2>

        <p :class="{
            'text-[.65em] md:text-[1em] leading-relaxed px-6': currentLang === 'th',
            'text-[.65em] md:text-[1em] px-[10px] text-pretty': currentLang === 'en',
        }" class="font-light text-center  md:px-0 max-w-3xl mx-auto" v-html="t('manpower.services.description')">
        </p>

        <div class=" px-2 md:px-0">
            <!-- <h3 class="text-center font-bold md:pr-[44px] -translate-y-[4px]">
                <div class="border-b-2  border-[#CADDF0] inline-block w-[100px]"
                    v-html="t('manpower.services.subtitle')"></div>
            </h3> -->

            <div class="grid grid-cols-2 gap-2">
                <div v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]" :key="i" class="space-y-2 space-x-2">
                    <div :class="{
                        'md:min-w-[200px] text-[.6em] md:text-[.9em]': currentLang === 'th',
                        'md:min-w-[120px] text-[.6em] md:text-[.9em]': currentLang === 'en',
                    }" class="bg-card  p-2 h-full min-h-[70px] md:min-h-[80px] rounded-md shadow-sm">
                        <div :class="{
                            '': currentLang === 'th',
                            '': currentLang === 'en',
                        }" class=" font-bold">
                            {{ t(`manpower.services.item${i}.label`) }}
                        </div>
                        <span class="text-neutral-500">
                            {{ t(`manpower.services.item${i}.description`) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-2 md:px-0">
            <PhotoGallery :images="images" />
        </div>
    </div>
</template>
