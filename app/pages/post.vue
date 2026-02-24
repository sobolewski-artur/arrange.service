<script setup>
import 'slpy/dist/css/slpy-style.css'
import { slpy } from 'slpy'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
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
  title: '',
  text: '',
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

const user = useState('user')
const router = useRouter()

async function onSubmit() {
  const result = await addDoc(collection(getFirestore(), 'posts'), { ...state.value, owner: user.value.uid, ownerDisplayName: user.value.displayName })
  if (result) router.push('/home')
}
</script>

<template>
  <form class="flex flex-col  gap-4" @submit.prevent="onSubmit">
    <div>
      <USelectMenu v-model="country" :items="items" size="xl" value-key="value" :icon="avatar" />
      <FormInput v-model="state.city">{{ t('post.city-input') }}</FormInput>
      <FormInput v-model="state.region">{{ t('post.region-input') }}</FormInput>
    </div>
    <FormInput v-model="state.title">{{ t('post.title-input') }}</FormInput>
    <FormTextarea v-model="state.text">{{ t('post.textarea-input') }}</FormTextarea>
    <FormInputTags v-model="state.tags">{{ t('post.tags-input') }}</FormInputTags>
    <UButton type="submit">Submit</UButton>
  </form>
</template>