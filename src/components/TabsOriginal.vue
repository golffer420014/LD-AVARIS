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
    <div class="tabs-container w-full max-w-216 mx-auto px-4">
        <!-- Tab Buttons -->
        <div class="bg-card  outline-1 outline-gray-200">
            <div class="grid grid-cols-4 items-center ">
                <button v-for="(tab, index) in tabs" :key="index" @click="setActiveTab(index)" :class="[
                    'border-r border-gray-200 last:border-none flex justify-center text-sm pt-[3px] transition-all duration-300 font-light focus:outline-none',
                ]">
                    <span class="relative pb-[3px] inline-block">
                        {{ tab.label }}
                        <span :class="[
                            'absolute bottom-0 -left-[20%] w-[140%] h-[1.5px] bg-black transition-transform duration-300 origin-left',
                            activeIndex === index ? 'scale-x-100' : 'scale-x-0'
                        ]"></span>
                    </span>
                </button>
            </div>
        </div>

        <!-- Tab Contents (No Animation as requested) -->
        <div class="tab-panels relative">
            <div v-for="(tab, index) in tabs" :key="index" v-show="activeIndex === index" class="tab-panel">
                <slot :name="`tab-${index}`" :tab="tab">
                    <div class="flex items-center justify-center text-center">
                        <p class="text-gray-600 font-light leading-relaxed tracking-wide italic quote">
                            {{ tab.content }}
                        </p>
                    </div>
                </slot>
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
