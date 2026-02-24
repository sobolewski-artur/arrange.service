<script setup>
const show = ref(false)
</script>

<template>
    <UInput placeholder="" size="xl" :type="show ? 'text' : 'password'"
        :ui="{ trailing: 'pe-1', base: 'peer' }">
        <label
            class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-2.5 peer-placeholder-shown:font-normal">
            <span class="inline-flex bg-default px-1"><slot></slot></span>
        </label>
        <template #trailing>
            <UButton color="neutral" variant="link" size="xl" :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="show ? 'Hide password' : 'Show password'" :aria-pressed="show" aria-controls="password"
                @click="show = !show" />
        </template>
    </UInput>
</template>