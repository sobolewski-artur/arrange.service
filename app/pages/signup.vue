<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const localePath = useLocalePath()
const { t } = useI18n()

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
  <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
    <div class="flex flex-col">
      <label>Email:</label>
      <input type="email" placeholder="Email" name="email" v-model="state.email"></input>
    </div>
    <div class="flex flex-col">
      <label>Password:</label>
      <input type="password" placeholder="Password" name="password" v-model="state.password"></input>
    </div>
    <div class="flex flex-col">
      <label>Reapeat password:</label>
      <input type="password" placeholder="Reapeat password" name="password" v-model="state.password2"></input>
    </div>
    <div class="mt-6 flex gap-4">
      <LayoutButton type="submit">{{ t('signup-btn') }}</LayoutButton>
      <NuxtLink to="/signin"><LayoutButton>{{ t('signin-btn') }}</LayoutButton></NuxtLink>
    </div>
  </form>
</template>

<style>

</style>