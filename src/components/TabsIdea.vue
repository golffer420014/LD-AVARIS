<script setup>
import { ref } from 'vue';

const props = defineProps({
    tabs: {
        type: Array,
        required: true
    }
});

const activeIndex = ref(0);

const setActiveTab = (index) => {
    activeIndex.value = index;
};
</script>

<template>
    <div class="tabs-container w-full max-w-4xl mx-auto  px-4">
        <!-- Tab Buttons -->
        <div class="flex items-center justify-center space-x-12 border-b border-gray-100 mb-8">
            <button v-for="(tab, index) in tabs" :key="index" @click="setActiveTab(index)" :class="[
                'pb-3 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 relative font-light',
                activeIndex === index ? 'text-black font-normal' : 'text-gray-400 hover:text-black'
            ]">
                {{ tab.label }}
                <span :class="[
                    'absolute bottom-0 left-0 w-full h-[1.5px] bg-black transition-transform duration-300 origin-left',
                    activeIndex === index ? 'scale-x-100' : 'scale-x-0'
                ]"></span>
            </button>
        </div>

        <!-- Tab Contents (No Animation as requested) -->
        <div class="tab-panels relative">
            <div v-for="(tab, index) in tabs" :key="index" v-show="activeIndex === index" class="tab-panel">
                <div class="flex items-center justify-center text-center">
                    <p class="text-gray-600 font-light leading-relaxed tracking-wide italic quote">
                        {{ tab.content }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.quote::before {
    content: '"';
}

.quote::after {
    content: '"';
}
</style>
