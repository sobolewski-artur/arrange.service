<script setup>
const localePath = useLocalePath()
const { locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
    <div>
        <NuxtLink class="mx-3" :to="localePath('/')">Home</NuxtLink>
        <NuxtLink class="mx-3" :to="localePath('/about')">About</NuxtLink>
        <NuxtLink class="mx-3" v-for="{code, name} in locales" :key="code" :to="switchLocalePath(code)">{{ name }}</NuxtLink>
        <NuxtLink class="mx-3" :to="localePath('/signin')">Sign in</NuxtLink>
        <NuxtLink class="mx-3" :to="localePath('/signup')">Sign up</NuxtLink>
    </div>
</template>