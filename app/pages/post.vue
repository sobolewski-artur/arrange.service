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

const state = reactive({
  city: '',
  region: '',
  title: '',
  text: '',
  country: '',
  tags: []
})

function validate(state) {
  const errors = []
  if (!state.city) errors.push({ name: 'city', message: 'Required' })
  if (!state.geohash) errors.push({ name: 'city', message: 'Select city from popup menu' })
  if (!state.region) errors.push({ name: 'region', message: 'Required' })
  if (!state.title) errors.push({ name: 'title', message: 'Required' })
  if (!state.text) errors.push({ name: 'text', message: 'Required' })
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
    state.city = selectedItem.name
    state.country = selectedItem.country
    state.region = selectedItem.parent
    state.geohash = geohash
    state.lat = selectedItem.lat
    state.lon = selectedItem.lon
  })

})


watch(country, (newVal, oldVal) => {
  const language = newVal === 'gb' ? 'en' : 'pl'
  item.updateAutocomplete({ country: newVal, language })
})

const user = useState('user')
const router = useRouter()

const toast = useToast()
async function onSubmit() {
  const result = await addDoc(collection(getFirestore(), 'posts'), { ...state, owner: user.value.uid, ownerDisplayName: user.value.displayName })
  if (result) console.log(result)
  if (result) toast.add({ title: 'Success', description: 'Your post was saved', color: 'success' })
  if (result) router.push('/home')
}
</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4 flex flex-col max-w-96" @submit.prevent="onSubmit" @error="onError">
    <USelectMenu v-model="country" :items="items" size="xl" value-key="value" :icon="avatar" />
    <div class="flex space-x-4">
      <UFormField name="city">
        <FormInput id="formInput" v-model="state.city">{{ t('post.city-input') }}</FormInput>
      </UFormField>
      <UFormField name="region">
        <FormInput v-model="state.region">{{ t('post.region-input') }}</FormInput>
      </UFormField>
    </div>
    <UFormField name="title">
      <FormInput class="w-full" v-model="state.title">{{ t('post.title-input') }}</FormInput>
    </UFormField>
    <UFormField name="text">
      <FormTextarea class="w-full" v-model="state.text">{{ t('post.textarea-input') }}</FormTextarea>
    </UFormField>
    <UFormField name="tags">
      <FormInputTags class="w-full" v-model="state.tags">{{ t('post.tags-input') }}</FormInputTags>
    </UFormField>
    <UButton type="submit">Submit</UButton>
  </UForm>
</template>