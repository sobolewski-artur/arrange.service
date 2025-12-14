<script setup>
const data = ref()
const { t } = useI18n()
</script>

<template>
    <textarea type="textarea" v-bind:placeholder="t('placeholder-home')" v-model="data"/>
</template>