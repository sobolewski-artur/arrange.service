<script setup>
const data = ref({ description: '', title: ''})
const { t } = useI18n()
</script>

<template>
    <div class="flex flex-col gap-4">
        <input type="text" placeholder="Title" v-model="data.title"/>
        <textarea type="textarea" v-bind:placeholder="t('placeholder-home')" v-model="data.description"/>
    </div>
</template>

<style>
textarea {
    @apply w-full
}
</style>