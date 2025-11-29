<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const state = reactive({
  email: '',
  password: ''
})

async function onSubmit() {
  console.log(`Login submited ${state.email} + ${state.password}`)
  const result = await signInWithEmailAndPassword(getAuth(), state.email, state.password)
  // if(result) console.log(result.user)
}
</script>

<template>
  <form class="mt-48" @submit.prevent="onSubmit">
    <label>Email:</label>
    <input name="email" v-model="state.email"></input>
    <label>Password:</label>
    <input name="password" v-model="state.password"></input>
    <button type="submit">Log in</button>
  </form>
</template>