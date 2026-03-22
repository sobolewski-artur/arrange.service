<script setup>
import 'slpy/dist/css/slpy-style.css'
import { slpy } from 'slpy'
import { distanceBetween, geohashForLocation, geohashQueryBounds } from 'geofire-common'
import { collection, endAt, getDocs, getFirestore, orderBy, query, startAt, where } from 'firebase/firestore'

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
    radiusInM: 1000,
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

function validate(state) {
    const errors = []
    if (!state.city) errors.push({ name: 'city', message: 'Required' })
    if (!state.geohash) errors.push({ name: 'city', message: 'Select city from popup menu' })
    if (!state.region) errors.push({ name: 'region', message: 'Required' })
    if (!state.radiusInM) errors.push({ name: 'radiusInM', message: 'Required' })
    if (!state.tags.length) errors.push({ name: 'tags', message: 'Required' })
    return errors
}
async function onError(event) {
    if (event?.errors?.[0]?.id) {
        const element = document.getElementById(event.errors[0].id)
        element?.focus()
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
}

const data = ref([])

async function onSubmit() {

    const center = [state.value.lat, state.value.lon]
    const bounds = geohashQueryBounds(center, state.value.radiusInM)
    const promises = []
    for (const b of bounds) {
        for (const t of state.value.tags) {
            const q = query(collection(getFirestore(), 'posts'), orderBy('geohash'), where("tags", "array-contains", t), startAt(b[0]), endAt(b[1]))
            promises.push(getDocs(q))
        }
    }
    const snapshots = await Promise.all(promises)

    const matchingDocs = []
    for (const snap of snapshots) {
        for (const doc of snap.docs) {
            const lat = doc.get('lat')
            const lon = doc.get('lon')
            const distanceInKm = distanceBetween([lat, lon], center)
            const distanceInM = distanceInKm * 1000
            if (distanceInM <= state.value.radiusInM) {
                matchingDocs.push({ ...doc.data(), id: doc.id})
            }
        }
    }

    data.value = matchingDocs
}
</script>

<template>
    <UForm :validate="validate" :state="state" class="flex flex-col  gap-4" @submit.prevent="onSubmit" @error="onError">
        <div class="flex space-x-4">
            <USelectMenu v-model="country" :items="items" size="xl" value-key="value" :icon="avatar" />
            <UFormField name="city">
                <FormInput id="formInput" v-model="state.city">{{ t('post.city-input') }}</FormInput>
            </UFormField>
            <UFormField name="region">
                <FormInput v-model="state.region">{{ t('post.region-input') }}</FormInput>
            </UFormField>
        </div>
        <div class="flex space-x-4">
            <UFormField name="tags">
                <FormInputTags class="w-full" v-model="state.tags">{{ t('post.tags-input') }}</FormInputTags>
            </UFormField>
            <UFormField name="radiusInM">
                <UInputNumber size="xl" v-model="state.radiusInM" :increment="false" :decrement="false" />
            </UFormField>
            <UButton type="submit">{{ t('search-btn') }}</UButton>
        </div>
    </UForm>

    <!-- <li v-for="doc in data" :key="doc.id">city: {{ doc.city }} text: {{ doc.text }} title: {{ doc.title }}</li> -->
    <LayoutPostCard :posts="data"></LayoutPostCard>
</template>