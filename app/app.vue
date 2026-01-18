<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onAuthStateChanged, getAuth } from 'firebase/auth';
const user = useState('user')
onAuthStateChanged(getAuth(), (u) => user.value = u)
</script>
