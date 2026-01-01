<script setup>
import { collection, getFirestore, addDoc } from 'firebase/firestore';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM.js';
import { fromLonLat, toLonLat } from 'ol/proj.js';

import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import VectorSource from 'ol/source/Vector.js';
import Style from 'ol/style/Style.js';
import CircleStyle from 'ol/style/Circle.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import VectorLayer from 'ol/layer/Vector.js';
import { geohashForLocation } from 'geofire-common'

const data = ref({ description: '', tags: [], title: '', latitude: '', longitude: '', geohash: '' })
const { t } = useI18n()
const router = useRouter()
const showMap = ref(false)
let map

function selectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((sucess) => {
            const lat = sucess.coords.latitude
            const lng = sucess.coords.longitude
            data.value.latitude = lat
            data.value.longitude = lng
            data.value.geohash = geohashForLocation([lat, lng]);
            map = new Map({
                target: 'map',
                layers: [
                    new TileLayer({
                        source: new OSM()
                    })
                ],
                view: new View({
                    center: fromLonLat([data.value.longitude, data.value.latitude]),
                    zoom: 15
                })
            });
            map.addLayer(setPoint(fromLonLat([data.value.longitude, data.value.latitude])))
            map.on('click', (e) => {
                map.getLayers().forEach(layer => {
                    if (layer.get('name') && layer.get('name') === 'punkt') {
                        map.removeLayer(layer)
                    }
                })
                const cords = toLonLat(e.coordinate)
                data.value.latitude = cords[1]
                data.value.longitude = cords[0]
                data.value.geohash = geohashForLocation([cords[1], cords[0]])
                map.addLayer(setPoint(e.coordinate))
            })
        });
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function onShowMap() {
    showMap.value = true
    selectLocation()
}

function setPoint(coordinates) { // Example coordinates
    const pointGeometry = new Point(coordinates);
    const pointFeature = new Feature({
        geometry: pointGeometry,
        // Add properties if needed (e.g., name, description)
    });
    const vectorSource = new VectorSource({
        features: [pointFeature] // Or add more features here
    });
    const pointStyle = new Style({
        image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: 'red' }),
            stroke: new Stroke({ color: 'black', width: 1 })
        })
    });
    const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: pointStyle,
        name: 'punkt'
    });
    return vectorLayer
}

async function onSubmit() {
    const result = await addDoc(collection(getFirestore(), "posts"), data.value).catch(e => { console.log(e.message) })
    if(result) router.push('/home')
}
</script>

<template>
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
        <LayoutButton type="button" class="text-2xl flex justify-center items-center" @click="selectLocation">
            <icon name="mi:location"></icon>
            <span>Get your position: {{ data.geohash ? "Done" : "" }}</span>
        </LayoutButton>
        <LayoutModal :onShow="showMap" @on-close="showMap = false">
            <div class="flex flex-col gap-4">
                <h2>Click to adjust position:</h2>
                <div class="h-96 w-96" id="map"></div>
                <LayoutButton type="button" @click="showMap = false">Close</LayoutButton>
            </div>
        </LayoutModal>
        <LayoutButton type="button" @click="onShowMap" class="text-2xl flex justify-center items-center">
            <icon class="text-4xl" name="material-symbols-light:map-search-outline-sharp"></icon>
            <span>Show map</span>
        </LayoutButton>
        <div>
            <label>Title:</label>
            <input class="w-full" type="text" placeholder="Title" v-model="data.title" />
        </div>
        <div>
            <label>Description:</label>
            <textarea class="w-full" type="textarea" v-bind:placeholder="t('placeholder-home')"
                v-model="data.description" />
        </div>
        <div>
            <label>Tags:</label>
            <input class="w-full" type="text" placeholder="Select tags" v-model="data.tags" />
        </div>
        <div class="mt-4">
            <LayoutButton>{{ t('post-btn') }}</LayoutButton>
        </div>
    </form>
</template>

<style>
/* #map {
    width: 100vw;
    height: 450px;
} */
</style>