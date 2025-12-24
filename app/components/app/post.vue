<script setup>
const data = ref({ description: '', title: ''})
const { t } = useI18n()
const emit = defineEmits(['OnClosePost'])
</script>

<template>
    <LayoutModalBg class="flex flex-col gap-4">
        <LayoutFrame class="flex gap-4 w-full md:w-1/2">
            <input class="w-full" type="text" placeholder="Title" v-model="data.title"/>
            <textarea class="w-full" type="textarea" v-bind:placeholder="t('placeholder-home')" v-model="data.description"/>
            <LayoutButton @click="emit('OnClosePost')">Close</LayoutButton>
        </LayoutFrame>
    </LayoutModalBg>
</template>
