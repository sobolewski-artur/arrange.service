<script setup>
import 'slpy/dist/css/slpy-style.css'
import { slpy } from 'slpy'
import { geohashForLocation } from 'geofire-common'

const { t } = useI18n()

const items = ref([
    {
        label: 'Poland',
        value: 'pl',
        icon: 'circle-flags:pl'
    },
    {
        label: 'England',
        value: 'gb',
        icon: 'circle-flags:en'
    }
])

const country = ref(items.value[0]?.value)
const avatar = computed(() => items.value.find(item => item.value === country.value)?.icon)

const state = ref({
    city: '',
    region: '',
    country: '',
    tags: []
})

let item
onMounted(() => {
    item = slpy.addAutocomplete('formInput', {
        apiKey: '20117036eaee1682458ffb290',
        country: country.value,
        language: country.value === 'pl' ? 'pl' : 'en',
        autocompleteType: 'admin',
        filter: 'city,postcode',
        width: "100%",
        offsetLeft: -25,
        offsetTop: 5,
        limit: 8
    }, function (returnInput, selectedItem) {
        const geohash = geohashForLocation([selectedItem.lat, selectedItem.lon])
        state.value = {
            ...state.value,
            lat: selectedItem.lat,
            lon: selectedItem.lon,
            country: selectedItem.country,
            city: selectedItem.name,
            region: selectedItem.parent,
            geohash
        }
    })

})

watch(country, (newVal, oldVal) => {
    const language = newVal === 'gb' ? 'en' : 'pl'
    item.updateAutocomplete({ country: newVal, language })
})

</script>

<template>
    <form class="flex flex-col  gap-4" @submit.prevent="onSubmit">
        <div>
        <USelectMenu v-model="country" :items="items" size="xl" value-key="value" :icon="avatar" />
            <UInput id="formInput" size="xl" v-model="state.city" placeholder="" :ui="{ base: 'peer' }">
                <label
                    class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal">
                    <span class="inline-flex bg-default px-1">{{ t('post.city-input') }}</span>
                </label>
            </UInput>
            <UInput size="xl" v-model="state.region" placeholder="" :ui="{ base: 'peer' }">
                <label
                    class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal">
                    <span class="inline-flex bg-default px-1">{{ t('post.region-input') }}</span>
                </label>
            </UInput>
        </div>
        <UInputTags v-model="state.tags" size="xl" placeholder="" :ui="{ base: 'peer' }">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-default px-1">{{ t('post.tags-input') }}</span>
            </label>
        </UInputTags>
        <UButton type="submit">Search</UButton>
    </form>
</template>