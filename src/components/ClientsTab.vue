<script setup>
import { computed } from 'vue';

const props = defineProps({
    countries: {
        type: Array,
        required: true,
        // Array of { name, flag, sectors: [{ name, clients: [] }] }
    }, lang: {
        type: String,
        required: true
    }
});

const currLang = computed(() => props.lang);
</script>

<template>
    <div class="space-y-8 py-8 px-6 md:px-0 md:pt-14">
        <div v-for="(country, cIndex) in countries" :key="cIndex" class="space-y-3">
            <!-- Country Header -->
            <div class="flex items-center space-x-3 border-b border-gray-100 pb-1">
                <img :src="`/src/assets/flag/${country.flag}.png`" :alt="country.name"
                    class="w-8 h-auto shadow-sm border border-gray-100 rounded-sm" />
                <h2 :class="{
                    'tracking-normal': currLang === 'th',
                    'tracking-widest': currLang === 'en',
                }" class="text-xl font-light text-gray-800">{{ country.name }}</h2>
            </div>

            <!-- Country Sectors -->
            <div class="grid grid-cols-1 md:grid-cols-5 text-xs md:text-[8px] gap-4 md:gap-0">
                <div v-for="(sector, sIndex) in country.sectors" :key="sIndex" class="flex flex-col">
                    <!-- Sector Header -->
                    <div class="border border-gray-300 bg-white p-3 md:p-2 text-center"
                        :class="{ 'md:border-r-0': (sIndex + 1) % 5 !== 0 && sIndex !== country.sectors.length - 1 }">
                        <h3 class="tracking-wider uppercase">{{ sector.name }}</h3>
                    </div>

                    <!-- Clients List -->
                    <div class="border border-t-0 border-gray-300 px-4 py-6 md:px-2 md:py-2 md:min-h-[100px] flex-1 bg-white"
                        :class="{ 'md:border-r-0': (sIndex + 1) % 5 !== 0 && sIndex !== country.sectors.length - 1 }">
                        <ul class="grid grid-cols-2 md:grid-cols-1">
                            <li v-for="(client, clIndex) in sector.clients" :key="clIndex"
                                class="flex items-start space-x-1 font-light"
                                :class="{ 'col-span-2': sector.clients.length === 1 }">
                                <span class="mt-2 md:mt-1 w-1 h-1 rounded-full bg-black shrink-0"></span>
                                <span>{{ client }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Specific styling to match the ivory/minimalist theme */
</style>
