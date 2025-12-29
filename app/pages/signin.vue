<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const localePath = useLocalePath()
const user = useState('user')
const { t } = useI18n()

const state = reactive({
  email: '',
  password: ''
})

async function onSubmit() {
  const result = await signInWithEmailAndPassword(getAuth(), state.email, state.password)
  if(result.user) user.value = result.user
  if(result.user) navigateTo(localePath('/home'))
}
</script>

<template>
  <form class="flex flex-col gap-8" @submit.prevent="onSubmit">
    <div class="flex flex-col">
      <label>Email:</label>
      <input type="email" placeholder="Email" name="email" v-model="state.email"></input>
    </div>
    <div class="flex flex-col">
      <label>Password:</label>
      <input type="password" placeholder="password" name="password" v-model="state.password"></input>
    </div>
    <div class="flex gap-4">
      <LayoutButton type="submit">{{ t('signin-btn') }}</LayoutButton>
      <NuxtLink to="/signup"><LayoutButton>{{ t('signup-btn') }}</LayoutButton></NuxtLink>
    </div>
  </form>
</template>