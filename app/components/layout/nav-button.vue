<template>
    <NuxtLink class="flex items-center hover:bg-slate-800 rounded-lg px-4 m-1 py-2 gap-2 text-3xl">
        <icon v-if="!showSolid" :name="icon1"></icon>
        <icon v-if="showSolid" :name="icon2"></icon>
        <span class="lg:flex" :class="{ hidden: hideText}"><slot /></span>
    </NuxtLink>
</template>

<script setup>
const {icon1, icon2, showSolid, hideText = true} = defineProps(['icon1', 'icon2', 'showSolid', 'hideText'])
</script>