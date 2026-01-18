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
})

function onDeleteDoc(id) {
    deleteDoc(doc(getFirestore(), 'posts', id))
}

onUnmounted(() => {
    authUnsub()
    unsub()
})
</script>

<template>
    <div class="flex flex-col gap-2">
        <NuxtLink class="border-2 rounded-lg p-2" v-for="post in posts" :key="post.id" :to="`/p/${post.id}`" >
            <div>
                <h2>{{ truncate(post.title, 100) }}</h2>
                <p>{{ truncate(post.description, 100) }}</p>
                <p>{{ post.tags }}</p>
            </div>
        </NuxtLink>
    </div>
</template>