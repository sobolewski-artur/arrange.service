<template>
    <div class="root">
        <button @click="isOpen = true">Open</button>
        <Teleport to="body">
            <Transition name="modal">
                <div class="modal" v-if="isOpen">
                    <div ref="modal">
                        <h2>Notification</h2>
                        <p>Some filler text</p>
                        <button @click="isOpen = false">Close</button>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core';

const isOpen = ref(false)
const modal = ref(null)

onClickOutside(modal, () => isOpen.value = false )
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

.root {
    position: relative;
}
.modal {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal > div {
    background-color: #fff;
    padding: 50px;
    border-radius: 10px;
}
</style>