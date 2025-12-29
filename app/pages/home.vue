<script setup>
import { collection, query, orderBy, startAt, endAt, getDocs, getFirestore } from 'firebase/firestore';
import { geohashForLocation, geohashQueryBounds } from 'geofire-common';

const lat = 51.5074;
const lng = 0.1278;
const hash = geohashForLocation([lat, lng]);

const center = [51.5074, 0.1278];
const radiusInM = 1 * 1000;

const bounds = geohashQueryBounds(center, radiusInM);

onMounted(async () => {
    const promises = [];
    for (const b of bounds) {
        const q = query(
            collection(getFirestore(), 'cities'),
            orderBy('geohash'),
            startAt(b[0]),
            endAt(b[1])
        );

        promises.push(getDocs(q));
    }
    const snapshots = await Promise.all(promises);

    const matchingDocs = [];
    for (const snap of snapshots) {
        for (const doc of snap.docs) {
            const lat = doc.get('lat');
            const lng = doc.get('lng');

            const distanceInKm = geofire.distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
                matchingDocs.push(doc);
            }
        }
    }
})
</script>

<template>
    <h1>Hello from home page</h1>
</template>