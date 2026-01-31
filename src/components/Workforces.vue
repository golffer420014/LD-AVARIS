<script setup>
import { computed } from 'vue';

const props = defineProps({
    data: {
        type: Array,
        required: true,
        // Array of { name, roles: [] }
    },
    lang: {
        type: String,
        required: true
    }
});

const currLang = computed(() => props.lang);

// Chunk data into sets of 5
const chunkedData = computed(() => {
    const chunks = [];
    for (let i = 0; i < props.data.length; i += 5) {
        chunks.push(props.data.slice(i, i + 5));
    }
    return chunks;
});
</script>

<template>
    <div class="space-y-12 py-8 px-6 md:px-0 md:pt-14">
        <!-- Workforce Sets -->
        <div v-for="(chunk, cIndex) in chunkedData" :key="cIndex" class="space-y-3">
            <div class="grid grid-cols-1 md:grid-cols-5 text-xs md:text-[12px] gap-4 md:gap-0">
                <div v-for="(sector, sIndex) in chunk" :key="sIndex" class="flex flex-col">
                    <!-- Sector Header -->
                    <div class="border border-gray-300 bg-white p-3 md:p-2 text-center"
                        :class="{ 'md:border-r-0': (sIndex + 1) % 5 !== 0 && sIndex !== chunk.length - 1 }">
                        <h3 class="tracking-wider">{{ sector.name }}</h3>
                    </div>

                    <!-- Roles List -->
                    <div class="border border-t-0 border-gray-300 p-3 md:px-2 md:py-2 md:min-h-[100px] flex-1 bg-white"
                        :class="{ 'md:border-r-0': (sIndex + 1) % 5 !== 0 && sIndex !== chunk.length - 1 }">
                        <ul class="grid grid-cols-2 md:grid-cols-1">
                            <li v-for="(role, rIndex) in sector.roles" :key="rIndex"
                                class="flex items-start space-x-1 font-light">
                                <span
                                    class="w-1 h-1 md:w-0.5 md:h-0.5 mx-2 rounded-full bg-black shrink-0 my-auto"></span>
                                <span>{{ role }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>