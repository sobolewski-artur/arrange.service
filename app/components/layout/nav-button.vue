<template>
    <NuxtLink class="flex items-center hover:bg-slate-500 hover:text-primary rounded-lg px-2 py-1.5 m-0.5 gap-2 text-4xl lg:text-xl">
        <icon :class="showSolid ? 'hidden' : ''" :name="icon1"></icon>
        <icon :class="showSolid ? '' : 'hidden'" :name="icon2"></icon>
        <span class="lg:flex" :class="{ hidden: hideText}"><slot /></span>
    </NuxtLink>
</template>

<script setup>
const {icon1, icon2, showSolid, hideText = true} = defineProps(['icon1', 'icon2', 'showSolid', 'hideText'])
</script>