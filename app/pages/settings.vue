<script setup>
const { locales, setLocale } = useI18n()
const localePath = useLocalePath()
</script>

<template>
    <div>
        <h1>Hello from settings page</h1>
        <NuxtLink class="nav-bar-link" :to="localePath('/about')">About</NuxtLink>
        <span class="nav-bar-link" v-for="{ code, name } in locales" :key="code" @click="setLocale(code)">{{name}}</span>
    </div>
</template>