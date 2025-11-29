<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const state = reactive({
  email: '',
  password: '',
  password2: ''
})

async function onSubmit() {
  console.log(`Login submited ${state.email} + ${state.password}`)
  if(!(state.password === state.password2)) return
  const result = await createUserWithEmailAndPassword(getAuth(), state.email, state.password)
}
</script>

<template>
  <form class="mt-48 flex flex-col" @submit.prevent="onSubmit">
    <label>Email:</label>
    <input type="email" name="email" v-model="state.email"></input>
    <label>Password:</label>
    <input type="password" name="password" v-model="state.password"></input>
    <label>Reapeat password:</label>
    <input type="password" name="password" v-model="state.password2"></input>
    <button type="submit">Log in</button>
  </form>
</template>

<style>
input[type=email], input[type=password] {
  @apply border-2
}
</style>