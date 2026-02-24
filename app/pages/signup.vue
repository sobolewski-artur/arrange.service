<script setup lang="ts">
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import type { FormError, FormErrorEvent, FormSubmitEvent } from '@nuxt/ui'

const localePath = useLocalePath()
const user = useState('user')
const { t } = useI18n()

const state = reactive({
  email: '',
  password: '',
  repeatPassword: '',
  displayName: ''
})

type Schema = typeof state

function validate(state: Partial<Schema>): FormError[] {
  const errors = []
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  if (!state.displayName) errors.push({ name: 'displayName', message: 'Required' })
  if (state.password != state.repeatPassword) errors.push({name: 'repeatPassword' ,message: 'Password must be the same.'})
  if (!state.repeatPassword) errors.push({name: 'repeatPassword' ,message: 'Required'})
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event)
//   const result = await signInWithEmailAndPassword(getAuth(), state.email, state.password).catch((e) => { toast.add({ title: 'Error', description: e.message, color: 'error' }); return e })
//   if (result.user) user.value = result.user
//   if (result.user) toast.add({ title: 'Success', description: 'You are now signed in.', color: 'success' })
//   if (result.user) navigateTo(localePath('/home'))
}

async function onError(event: FormErrorEvent) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit" @error="onError">
    <h1 class="text-2xl">Sign in form</h1>
    <UFormField name="displayName">
      <FormInput v-model="state.displayName">{{ t('sign.display-name')}}</FormInput>
    </UFormField>
    <UFormField name="email">
      <FormInput v-model="state.email" type="email" trailing-icon="i-lucide-at-sign">{{ t('sign.email')}}</FormInput>
    </UFormField>

    <UFormField name="password">
      <FormInputPassword v-model="state.password" type="password">{{ t('sign.password') }}</FormInputPassword>
    </UFormField>
    <UFormField name="repeatPassword">
      <FormInputPassword v-model="state.repeatPassword" type="password">{{ t('sign.repeat') }}</FormInputPassword>
    </UFormField>

    <div class="flex gap-3 items-center">
      <UButton type="submit">{{ t('sign.up-btn') }}</UButton>
      <ULink :to="localePath('/signin')">{{ t('sign.in-btn') }}</ULink>
    </div>
  </UForm>
</template>
