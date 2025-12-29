<script setup>
import { geohashForLocation } from 'geofire-common'
const data = ref({ description: '', title: '', latitude: '', longitude: '', geohash: '' })
const { t } = useI18n()

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((sucess) => {
            console.log(sucess.coords)
            const lat = sucess.coords.latitude
            const lng = sucess.coords.longitude
            data.value.latitude = lat
            data.value.longitude = lng
            data.value.geohash = geohashForLocation([lat, lng]);
        });
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
</script>

<template>
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
        <div>
            <label>Title:</label>
            <input class="w-full" type="text" placeholder="Title" v-model="data.title" />
        </div>
        <div class="flex gap-2 items-center" @click="getLocation">
            <icon class="text-4xl" name="mi:location"></icon>
            <label>Coordinates:</label>
            <label>latitude:</label>{{ data.latitude }}
            <label>longitude:</label>{{ data.longitude }}
            <label>geohash:</label>{{ data.geohash }}
        </div>
        <div>
            <label>City:</label>
            <input class="w-full" type="text" placeholder="City" v-model="data.title" />
        </div>
        <div>
            <label>Description:</label>
            <textarea class="w-full" type="textarea" v-bind:placeholder="t('placeholder-home')"
                v-model="data.description" />
        </div>
        <div class="flex gap-4">
            <LayoutButton>{{ t('post-btn') }}</LayoutButton>
        </div>
    </form>
</template>