<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const localePath = useLocalePath()
const user = useState('user')
const { t } = useI18n()
const show = ref(false)

const state = reactive({
  email: '',
  password: ''
})

async function onSubmit() {
  const result = await signInWithEmailAndPassword(getAuth(), state.email, state.password)
  if (result.user) user.value = result.user
  if (result.user) navigateTo(localePath('/home'))
}
</script>

<template>
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <div class="flex flex-col">
        <UInput v-model="state.email" type="email" size="xl" trailing-icon="i-lucide-at-sign" placeholder="" :ui="{ base: 'peer' }">
          <label
            class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal">
            <span class="inline-flex bg-default px-1">{{t('sign.email')}}</span>
          </label>
        </UInput>
      </div>
      <div class="flex flex-col">
        <UInput v-model="state.password" placeholder="" size="xl" :type="show ? 'text' : 'password'"
          :ui="{ trailing: 'pe-1', base: 'peer' }">
          <label
            class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal">
            <span class="inline-flex bg-default px-1">{{ t('sign.password') }}</span>
          </label>
          <template #trailing>
            <UButton color="neutral" variant="link" size="sm" :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="show ? 'Hide password' : 'Show password'" :aria-pressed="show" aria-controls="password"
              @click="show = !show" />
          </template>
        </UInput>
      </div>
      <div class="flex gap-8 justify-center items-center">
        <UButton type="submit">{{ t('sign.in-btn') }}</UButton>
        <ULink raw to="/signup" active-class="font-bold" inactive-class="text-muted">{{ t('sign.up-btn') }}</ULink>
      </div>
    </form>
</template>