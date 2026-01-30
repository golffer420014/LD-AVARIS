<script setup>
import { computed, reactive, ref } from 'vue';
import { ui, defaultLang, flagEN } from '@/i18n/ui';

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
                organization: form.org,
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
const messageIcons = [
    { name: 'line', img: '/assets/contact/line.png' },
    { name: 'whatsapp', img: '/assets/contact/whatsapp.png' },
];

const followIcons = [
    { name: 'facebook', img: '/assets/contact/facebook.png' },
    { name: 'instagram', img: '/assets/contact/instagram.png' },
    { name: 'youtube', img: '/assets/contact/youtube.png' },
    { name: 'tiktok', img: '/assets/contact/tiktok.png' },
    { name: 'x', img: '/assets/contact/x.png' },
    { name: 'add', img: '/assets/contact/add.png' },
    { name: 'linkedin', img: '/assets/contact/linkedin.png' },
    { name: 'pinterest', img: '/assets/contact/pinterest.png' },
];
</script>

<template>
    <div class="py-4 md:py-12 max-w-7xl mx-auto px-4 md:px-8 text-gray-800">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <!-- Left Side: Form & Map -->
            <div class="space-y-12">
                <!-- Enquiry Form -->
                <div>
                    <h2 class="text-lg md:text-xl font-serif mb-2 md:mb-6 text-left">
                        {{ t('contact.form.title') }}
                    </h2>
                    <form class="space-y-4" @submit.prevent="handleSubmit">
                        <input v-model="form.name" type="text" :placeholder="t('contact.form.name')" required
                            :disabled="isSubmitting"
                            class="w-full p-3 border border-gray-200 focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 disabled:bg-gray-50" />
                        <input v-model="form.org" type="text" :placeholder="t('contact.form.org')"
                            :disabled="isSubmitting"
                            class="w-full p-3 border border-gray-200 focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 disabled:bg-gray-50" />

                        <div class="flex gap-2">
                            <div
                                class="flex items-center justify-center p-3 border border-gray-200 bg-white min-w-[60px]">
                                <img :src="flagEN" alt="US" class="w-6 h-4 object-cover" />
                            </div>
                            <input v-model="form.phone" type="tel" :placeholder="t('contact.form.phone')" required
                                :disabled="isSubmitting"
                                class="flex-1 p-3 border border-gray-200 focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 disabled:bg-gray-50" />
                        </div>

                        <input v-model="form.email" type="email" :placeholder="t('contact.form.email')" required
                            :disabled="isSubmitting"
                            class="w-full p-3 border border-gray-200 focus:outline-none focus:border-black transition-colors placeholder:text-gray-300 disabled:bg-gray-50" />

                        <textarea v-model="form.message" :placeholder="t('contact.form.message')" rows="8" required
                            :disabled="isSubmitting"
                            class="w-full p-3 border border-gray-200 focus:outline-none focus:border-black transition-colors resize-none placeholder:text-gray-300 disabled:bg-gray-50"></textarea>

                        <div class="pt-2">
                            <button type="submit" :disabled="isSubmitting"
                                class="w-full p-3 bg-[#D9D9D9] text-gray-600 hover:bg-gray-300 transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
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
                            <div v-if="isSuccess"
                                class="p-4 bg-green-50 border border-green-100 text-green-700 text-sm">
                                Thank you! Your enquiry has been sent successfully. We will get back to you shortly.
                            </div>
                        </transition>
                    </form>
                </div>

                <!-- Map -->
                <div class="w-full h-80 bg-gray-100 overflow-hidden border border-gray-200">

                    <div class="embed-map-fixed">
                        <div class="embed-map-container"><iframe class="embed-map-frame" frameborder="0" scrolling="no"
                                marginheight="0" marginwidth="0" :src="t('contact.map_url')"></iframe><a
                                href="https://funclicker.org"
                                style="font-size:2px!important;color:gray!important;position:absolute;bottom:0;left:0;z-index:1;max-height:1px;overflow:hidden">Fun
                                Clicker</a></div>
                    </div>

                </div>
            </div>

            <!-- Right Side: Info -->
            <div class="space-y-10 py-0 lg:py-4">
                <div class="space-y-6">
                    <h3 class="text-lg md:text-xl font-bold">
                        {{ data.company }}
                    </h3>

                    <div class="text-sm md:text-base space-y-4 font-light leading-relaxed max-w-md">
                        <p>{{ data.address }}</p>

                        <div class="space-y-1">
                            <p>
                                <span>{{ t('contact.label.tax') }} </span>
                                {{ data.taxId }}
                            </p>
                            <p>
                                <span>{{ t('contact.label.license') }} </span>
                                {{ data.license }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Contact us -->
                <div class="space-y-4">
                    <h4 class="text-sm font-medium">{{ t('contact.section.contact_us') }}</h4>
                    <div class="space-y-4">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center p-2 shadow-sm">
                                <img src="/assets/contact/phone.png"
                                    class="w-full h-full object-contain invert grayscale" alt="" />
                            </div>
                            <a :href="`tel:${data.tel.replace(/\s+/g, '')}`"
                                class="text-sm md:text-base hover:underline">{{
                                    data.tel }}</a>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center p-2 shadow-sm">
                                <img src="/assets/contact/mail.png"
                                    class="w-full h-full object-contain invert grayscale" alt="" />
                            </div>
                            <a :href="`mailto:${data.email}`" class="text-sm md:text-base hover:underline">{{ data.email
                            }}</a>
                        </div>
                    </div>
                </div>

                <!-- Message us -->
                <div class="space-y-4">
                    <h4 class="text-sm font-medium">{{ t('contact.section.message_us') }}</h4>
                    <div class="flex gap-4">
                        <div v-for="icon in messageIcons" :key="icon.name"
                            class="w-12 h-12 bg-black rounded-full flex items-center justify-center p-2 cursor-pointer hover:scale-105 transition-transform">
                            <img :src="icon.img" :alt="icon.name"
                                class="w-full h-full object-contain invert grayscale" />
                        </div>
                    </div>
                </div>

                <!-- Follow us -->
                <div class="space-y-4">
                    <h4 class="text-sm font-medium">{{ t('contact.section.follow_us') }}</h4>
                    <div class="grid grid-cols-5 md:flex md:flex-wrap gap-4 max-w-sm">
                        <div v-for="icon in followIcons" :key="icon.name"
                            class="w-11 h-11 bg-black rounded-full flex items-center justify-center p-2 cursor-pointer hover:scale-105 transition-transform">
                            <img :src="icon.img" :alt="icon.name"
                                class="w-full h-full object-contain invert grayscale" />
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
    text-align: right;
    width: 100%;
    height: 400px;
}

.embed-map-container {
    overflow: hidden;
    background: none !important;
    width: 100%;
    height: 400px;
}

.embed-map-frame {
    width: 100% !important;
    height: 400px !important;
}

h2 {
    font-family: serif;
}

input::placeholder,
textarea::placeholder {
    color: #cbd5e1;
}
</style>
