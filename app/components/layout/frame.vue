<template>
    <div class="modal_inner p-5 rounded-lg flex flex-col items-center shadow-lg">
        <slot />
    </div>
</template>

<style>   
.modal_inner {
    background-image: linear-gradient(to bottom right, black, rgb(119, 119, 14));
}
</style>