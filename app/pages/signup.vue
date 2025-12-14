<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const localePath = useLocalePath()

const user = useState('user')

const state = reactive({
  email: '',
  password: '',
  password2: ''
})

async function onSubmit() {
  if(!(state.password === state.password2)) return
  const result = await createUserWithEmailAndPassword(getAuth(), state.email, state.password)
  if(result.user) user.value = result.user
  if(result.user) navigateTo(localePath('/home'))
}
</script>

<template>
  <form class="flex flex-col" @submit.prevent="onSubmit">
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

</style>