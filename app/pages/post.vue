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
  admin: '',
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
  },
    function (returnInput, selectedItem) {
      const geohash = geohashForLocation([selectedItem.lat, selectedItem.lon])
      state.value = { ...selectedItem, geohash }
    }
  )
})

watch(country, (newVal, oldVal) => {
  const language = newVal === 'gb' ? 'en' : 'pl'
  item.updateAutocomplete({ country: newVal, language })
})

const user = useState('user')
const router = useRouter()

async function onSubmit() {
  const result = await addDoc(collection(getFirestore(), 'posts'), { ...state.value, owner: user.value.uid })
  if (result) router.push('/home')
}
</script>

<template>
  <form class="flex flex-col  gap-4" @submit.prevent="onSubmit">
    <USelectMenu v-model="country" :items="items" size="xl" value-key="value" :icon="avatar" />
    <UInput id="formInput" size="xl" v-model="state.admin" placeholder="" :ui="{ base: 'peer' }">
      <label
        class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal">
        <span class="inline-flex bg-default px-1">{{ t('post.city-input') }}</span>
      </label>
    </UInput>
    <UInput v-model="state.title" type="text" size="xl" placeholder="" :ui="{ base: 'peer' }">
      <label
        class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal">
        <span class="inline-flex bg-default px-1">{{ t('post.title-input') }}</span>
      </label>
    </UInput>
    <UTextarea size="xl" v-model="state.text" placeholder="" :ui="{ base: 'peer' }">
      <label
        class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal">
        <span class="inline-flex bg-default px-1">{{ t('post.textarea-input') }}</span>
      </label>
    </UTextarea>
    <UInputTags v-model="state.tags" size="xl" placeholder="" :ui="{ base: 'peer' }">
      <label
        class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal">
        <span class="inline-flex bg-default px-1">{{ t('post.tags-input') }}</span>
      </label>
    </UInputTags>
    <UButton type="submit">Submit</UButton>
  </form>
</template>

<style></style>