<script setup>
import { computed, reactive, ref } from 'vue';
import { ui, defaultLang, flagEN } from '@/i18n/ui';
import { PhoneCall } from 'lucide-vue-next';

const props = defineProps({
    data: {
        type: Object,
        required: true
        // Object with { company, address, taxId, license, tel, email }
    },
    lang: {
        type: String,
        required: true
    }
});

const t = (key) => {
    return ui[props.lang][key] || ui[defaultLang][key];
};

const form = reactive({
    name: '',
    org: '',
    phone: '',
    email: '',
    message: ''
});

const isSubmitting = ref(false);
const isSuccess = ref(false);

const handleSubmit = async () => {
    if (isSubmitting.value) return;

    isSubmitting.value = true;
    isSuccess.value = false;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: "11a2553f-f7f2-4ee3-aee0-50d030d29032",
                name: form.name,
                phone: form.phone,
                email: form.email,
                message: form.message,
                subject: `New Enquiry from ${form.name}`,
                from_name: "AVARIS Website",
            }),
        });

        const result = await response.json();

        if (result.success) {
            console.log('Form Submitted successfully');
            isSuccess.value = true;
            // Reset form
            Object.keys(form).forEach(key => form[key] = '');
        } else {
            console.error('Form Submission Error:', result);
            alert(props.lang === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' : 'Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('API Error:', error);
        alert(props.lang === 'th' ? 'ไม่สามารถเชื่อมต่อระบบได้ กรุณาลองใหม่อีกครั้ง' : 'Cannot connect to server. Please try again.');
    } finally {
        isSubmitting.value = false;
        // Clear success message after 5 seconds
        if (isSuccess.value) {
            setTimeout(() => {
                isSuccess.value = false;
            }, 5000);
        }
    }
};


// Icons grouping for the new design
const contactIcons = [
    { name: 'phone', img: '/assets/contact/phone.png', link: 'tel:+66886866880' },
    { name: 'line', img: '/assets/contact/line.png', link: 'https://lin.ee/IN4GTVi' },
    { name: 'whatsapp', img: '/assets/contact/whatsapp.png', link: 'https://wa.me/message/L76U6AEG7OR7P1' },
    { name: 'mail', img: '/assets/contact/mail.png', link: 'mailto:contact@avaris.co.th' },
];

const followIcons = [
    { name: 'facebook', img: '/assets/contact/facebook.png', link: 'https://www.facebook.com/AvarisManpower' },
    { name: 'instagram', img: '/assets/contact/instagram.png', link: 'https://www.instagram.com/avarismanpower' },
    { name: 'youtube', img: '/assets/contact/youtube.png', link: 'https://www.youtube.com/@AvarisManpower' },
    { name: 'tiktok', img: '/assets/contact/tiktok.png', link: 'https://www.tiktok.com/@avarismanpower' },
    { name: 'x', img: '/assets/contact/x.png', link: 'https://x.com/AvarisManpower' },
    { name: 'threads', img: '/assets/contact/add.png', link: 'https://www.threads.com/@avarismanpower' },
    { name: 'linkedin', img: '/assets/contact/linkedin.png', link: '' },
    { name: 'pinterest', img: '/assets/contact/pinterest.png', link: '' },
];
</script>

<template>
    <div class="mx-auto px-4 md:px-0 text-gray-800 space-y-12 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Left Side: Enquiry Form -->
            <div class="order-1 col-span-1 md:col-span-2 bg-white p-4 md:p-10 border border-gray-100">
                <div class="text-lg md:text-2xl font-medium mb-6">
                    {{ t('contact.form.title') }}
                </div>
                <form class="space-y-4" @submit.prevent="handleSubmit">
                    <input v-model="form.name" type="text" :placeholder="t('contact.form.name')" required
                        :disabled="isSubmitting"
                        class="w-full p-2 border border-gray-200 focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 disabled:bg-gray-50" />

                    <div class="flex gap-2">
                        <input v-model="form.phone" type="tel" :placeholder="t('contact.form.phone')" required
                            :disabled="isSubmitting"
                            class="flex-1 p-2 border border-gray-200 focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 disabled:bg-gray-50" />
                    </div>

                    <input v-model="form.email" type="email" :placeholder="t('contact.form.email')" required
                        :disabled="isSubmitting"
                        class="w-full p-2 border border-gray-200 focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 disabled:bg-gray-50" />

                    <textarea v-model="form.message" :placeholder="t('contact.form.message')" rows="4" required
                        :disabled="isSubmitting"
                        class="w-full p-2 border border-gray-200 focus:outline-none focus:border-black transition-colors resize-none placeholder:text-gray-300 disabled:bg-gray-50"></textarea>

                    <div class="pt-4">
                        <button type="submit" :disabled="isSubmitting"
                            class="w-full p-3 bg-[#D9D9D9] text-[#424242] hover:bg-gray-300 transition-colors tracking-[0.2em] text-sm flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed font-medium">
                            <span v-if="isSubmitting"
                                class="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></span>
                            {{ isSubmitting ? 'Sending...' : t('contact.form.submit') }}
                        </button>
                    </div>

                    <!-- Success Message -->
                    <transition enter-active-class="transition duration-300 ease-out"
                        enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition duration-200 ease-in"
                        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
                        <div v-if="isSuccess" class="p-4 bg-green-50 border border-green-100 text-green-700 text-sm">
                            Thank you! Your enquiry has been sent successfully. We will get back to you shortly.
                        </div>
                    </transition>
                </form>
            </div>

            <!-- Right Side: Info -->
            <div
                class="order-3 md:order-2 col-span-1 md:col-span-2 bg-white p-4 md:p-10 border border-gray-100 flex flex-col justify-between">
                <div class="space-y-8">
                    <h3 class="text-xl md:text-2xl font-medium leading-tight">
                        {{ data.company }}
                    </h3>

                    <div class="text-base space-y-6 font-light leading-relaxed text-gray-700">
                        <p>{{ data.address }}</p>

                        <div class="space-y-2">
                            <p>
                                <span>{{ t('contact.label.tax') }}</span>
                                {{ data.taxId }}
                            </p>
                            <p>
                                <span>{{ t('contact.label.license') }}</span>
                                {{ data.license }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Icons Footer -->
                <div class="mt-12 pt-4 border-t border-gray-100 flex flex-col lg:flex-row lg:items-start gap-8">
                    <!-- Contact us -->
                    <div class="flex-1">
                        <h4 class="text-base font-serif mb-4">{{ t('contact.section.contact_us') }}</h4>
                        <div class="grid grid-cols-4 gap-4 gap-x-8">
                            <a v-for="icon in contactIcons" :key="icon.name" :href="icon.link || '#'" target="_blank"
                                class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                                <img :src="icon.img" :alt="icon.name" class="w-full h-full object-contain" />
                            </a>
                        </div>
                    </div>

                    <!-- Vertical Divider on PC -->
                    <div class="hidden lg:block w-px h-[90%] bg-gray-100"></div>

                    <!-- Follow us (Social Icons) -->
                    <div class="flex-1">
                        <h4 class="text-base font-serif mb-4">{{ t('contact.section.follow_us') }}</h4>
                        <div class="grid grid-cols-4 gap-4 gap-x-8">
                            <a v-for="icon in followIcons" :key="icon.name" :href="icon.link || '#'" target="_blank"
                                class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                                <img :src="icon.img" :alt="icon.name" class="w-full h-full object-contain" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Section: Map -->
            <div
                class="order-2 md:order-3 col-span-1 md:col-span-4 bg-white px-4 pt-4 md:px-10 md:pt-10 h-full border border-gray-100">
                <div class="text-lg md:text-2xl font-medium mb-6">
                    {{ t('contact.map.title') || 'Office Location' }}
                </div>
                <div class="w-full h-[300px] md:h-[500px] bg-gray-50 overflow-hidden border border-gray-100">
                    <div class="embed-map-fixed">
                        <div class="embed-map-container">
                            <iframe class="embed-map-frame" frameborder="0" scrolling="no" marginheight="0"
                                marginwidth="0" :src="t('contact.map_url')"></iframe>
                            <a href="https://funclicker.org" style="display: none;">Fun Clicker</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<style scoped>
.embed-map-fixed {
    position: relative;
    width: 100%;
    height: 100%;
}

.embed-map-container {
    overflow: hidden;
    background: none !important;
    width: 100%;
    height: 100%;
}

.embed-map-frame {
    width: 100% !important;
    height: 100% !important;
}

input::placeholder,
textarea::placeholder {
    color: #cbd5e1;
}

/* Custom shadow for cards */
.shadow-sm {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}
</style>
