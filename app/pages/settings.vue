<script setup>
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()

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

const country = ref(locale.value === 'en' ? 'gb' : 'pl')

const avatar = computed(() => items.value.find(item => item.value === country.value)?.icon)

watch(country, (newVal, oldVal) => {
  const language = newVal === 'gb' ? 'en' : 'pl'
  setLocale(language)
})
</script>

<template>
    <div class="flex flex-col">
        <h1>Hello from settings page</h1>
        <NuxtLink class="nav-bar-link" :to="localePath('/about')">About</NuxtLink>
        <USelectMenu v-model="country" :items="items" size="xl" value-key="value" :icon="avatar" />
        <UColorModeButton />
    </div>
</template>