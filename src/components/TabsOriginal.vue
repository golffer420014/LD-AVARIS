<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    tabs: {
        type: Array,
        required: true
    }
});

const activeTabSlug = ref('');

const setActiveTab = (index) => {
    const tabSlug = props.tabs[index].slug;
    activeTabSlug.value = tabSlug;

    // Update URL without reloading
    if (tabSlug) {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', tabSlug);
        window.history.pushState({}, '', url);
    }
};

onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');

    if (tabParam) {
        activeTabSlug.value = tabParam;
    } else if (props.tabs.length > 0) {
        // Default to first tab slug if no param
        activeTabSlug.value = props.tabs[0].slug;
    }
});
</script>

<template>
    <div class="tabs-container w-full max-w-290 mx-auto md:px-4">
        <!-- Tab Buttons -->
        <div class="bg-card  outline-1 outline-gray-200">
            <div class="grid grid-cols-4 items-center ">
                <button v-for="(tab, index) in tabs" :key="index" @click="setActiveTab(index)" :class="[
                    'border-r border-gray-200 last:border-none flex justify-center text-xs md:text-sm pt-[3px] transition-all duration-300 font-light focus:outline-none',
                ]">
                    <span class="relative pb-[3px] inline-block">
                        {{ tab.label }}
                        <span :class="[
                            'absolute bottom-0 -left-[30%] w-[160%] h-px bg-black transition-transform duration-300 origin-left',
                            activeTabSlug === tab.slug ? 'scale-x-100' : 'scale-x-0'
                        ]"></span>
                    </span>
                </button>
            </div>
        </div>

        <!-- Tab Contents (No Animation as requested) -->
        <div class="tab-panels relative">
            <div v-for="(tab, index) in tabs" :key="index" v-show="activeTabSlug === tab.slug" class="tab-panel">
                <slot :name="`tab-${index}`" :tab="tab">
                    <div class="flex items-center justify-center text-center">
                        <p class=" font-light leading-relaxed tracking-wide italic quote">
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
