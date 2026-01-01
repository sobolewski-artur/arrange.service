<template>
    <NuxtLink class="flex items-center hover:bg-slate-800 rounded-lg px-4 m-1 py-2 gap-2 text-3xl">
        <icon v-if="!showSolid" :name="icon1"></icon>
        <icon v-if="showSolid" :name="icon2"></icon>
        <span class="hidden lg:flex"><slot /></span>
    </NuxtLink>
</template>

<script setup>
defineProps(['icon1', 'icon2', 'showSolid'])
</script>