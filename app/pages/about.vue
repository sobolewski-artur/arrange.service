<script setup>
import { getFirestore, addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

const { t } = useI18n()
const data = ref([])
let unSub

async function addData() {
    const result = await addDoc(collection(getFirestore(), "posts"), { name: "artur", surname: "Sobolewski"}).catch(e => { console.log(e.message)})
    console.log(result)
}

async function deleteDocument(id) {
    console.log(id)
    await deleteDoc(doc(getFirestore(), "posts", id))
}

onMounted(async() => {
    unSub = await onSnapshot(collection(getFirestore(), "posts"), (querySnapshot) => {
        data.value = []
        querySnapshot.forEach((doc) => {
            data.value.push({ id: doc.id, ...doc.data() })
        })
    })
})

onUnmounted(() => {
    unSub()
})
</script>

<template>
    <h1>Hello from About page!</h1>
    <h2>{{ t("greting") }}</h2>
    <button @click="addData">Add data to database</button>
    <ul>
        <li v-for="{id, name, surname} in data" :key="id">name: {{ name }} surname: {{ surname }} <button @click="deleteDocument(id)" >Delete</button> </li>
    </ul>
</template>

<style>
p {
    width: 30%;
}
</style>