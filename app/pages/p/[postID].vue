<script setup>
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const router = useRoute()
const postID = router.params.postID
const data = ref(false)

const result = await getDoc(doc(getFirestore(), `posts/${postID}`))
if(result.exists()) data.value = { ...result.data(), id: result.id}
</script>

<template>
    <div>
        <div v-if="data">
            <h1>{{ data.title }}</h1>
            <p>{{ data.description }}</p>
            <h1>{{ data.tags }}</h1>
        </div>
        <div v-else>
            <h1>File not found 404!</h1>
        </div>
    </div>
</template>