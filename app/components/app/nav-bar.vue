<script setup>
const { t } = useI18n()
const localePath = useLocalePath()
const { locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
    <NuxtLink class="mx-3" :to="localePath('/')">Home</NuxtLink>
            <NuxtLink class="mx-3" :to="localePath('/about')">About</NuxtLink>
    <NuxtLink class="mx-3" v-for="{code, name} in locales" :key="code" :to="switchLocalePath(code)">{{ code.toUpperCase() }}</NuxtLink>
</template>