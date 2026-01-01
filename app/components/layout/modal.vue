<template>
    <Teleport to="body">
        <Transition name="modal">
            <LayoutModalBg v-if="onShow" @click.self="emit('onClose')">
                <LayoutFrame>
                    <slot />
                </LayoutFrame>
            </LayoutModalBg>
        </Transition>
    </Teleport>
</template>

<script setup>
defineProps(['onShow'])
const emit = defineEmits(['onClose'])
</script>

<style>
.modal-enter-active,
.modal-leave-active {
    transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>