<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const localePath = useLocalePath()
const { t } = useI18n()
const show = ref(false)

const user = useState('user')

const state = reactive({
    email: '',
    password: '',
    password2: ''
})

async function onSubmit() {
    if (!(state.password === state.password2)) return
    const result = await createUserWithEmailAndPassword(getAuth(), state.email, state.password)
    if (result.user) user.value = result.user
    if (result.user) navigateTo(localePath('/home'))
}
</script>

<template>
    <form class="flex flex-col  gap-4" @submit.prevent="onSubmit">
        <UInput v-model="state.email" type="email" size="xl" trailing-icon="i-lucide-at-sign" placeholder=""
            :ui="{ base: 'peer' }">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-default px-1">{{ t('placeholder-email') }}</span>
            </label>
        </UInput>
        <UInput v-model="state.password" placeholder="" size="xl" :type="show ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1', base: 'peer' }">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-default px-1">{{ t('placeholder-password') }}</span>
            </label>
            <template #trailing>
                <UButton color="neutral" variant="link" size="sm" :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="show ? 'Hide password' : 'Show password'" :aria-pressed="show" aria-controls="password"
                    @click="show = !show" />
            </template>
        </UInput>
        <UInput v-model="state.password2" placeholder="" size="xl" :type="show ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1', base: 'peer' }">
            <label
                class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal">
                <span class="inline-flex bg-default px-1">{{ t('placeholder-repeat-password') }}</span>
            </label>
            <template #trailing>
                <UButton color="neutral" variant="link" size="sm" :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="show ? 'Hide password' : 'Show password'" :aria-pressed="show" aria-controls="password"
                    @click="show = !show" />
            </template>
        </UInput>
        <div class="flex gap-8 justify-center items-center">
            <UButton type="submit">{{ t('signup-btn') }}</UButton>
            <ULink raw to="/signin" active-class="font-bold" inactive-class="text-muted">{{ t('signin-btn') }}</ULink>
        </div>
    </form>
</template>