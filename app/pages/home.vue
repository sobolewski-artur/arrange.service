<script setup>
import { ref } from 'vue'
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { collection, query, where, deleteDoc, doc, orderBy, startAt, endAt, getDocs, getFirestore, onSnapshot } from 'firebase/firestore';
import { geohashForLocation, geohashQueryBounds } from 'geofire-common';

const user = useState('user')
const posts = ref([])
let unsub
let authUnsub
// const lat = 51.5074;
// const lng = 0.1278;
// const hash = geohashForLocation([lat, lng]);

// const center = [51.5074, 0.1278];
// const radiusInM = 1 * 1000;

// const bounds = geohashQueryBounds(center, radiusInM);

onMounted(async () => {
    authUnsub = onAuthStateChanged(getAuth(), (u) => {
        if(u) {
            const q = query(
                collection(getFirestore(), 'posts'),
                where('owner', '==', `${user.value.uid}`)
            );
        
            // const result = await getDocs(q);
            unsub = onSnapshot(q, docs => {
                posts.value = []
                docs.forEach(doc => {
                    posts.value.push({ ...doc.data(), id: doc.id })
                })
            })
        }
    })
    // result.forEach(doc => {
    //     posts.value.push({ ...doc.data(), id: doc.id })
    // })
    // if (result) console.log(result)
})

function onDeleteDoc(id) {
    deleteDoc(doc(getFirestore(), 'posts', id))
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex gap-4 items-center" v-for="post in posts">
            <LayoutButton @click="onDeleteDoc(post.id)">Delete</LayoutButton>
            <h2>{{ post.title }}</h2>
            <p>{{ post.description }}</p>
            <span>{{ post.geohash }}</span>
        </div>
    </div>
</template>