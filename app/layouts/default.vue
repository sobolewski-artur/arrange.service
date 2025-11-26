<template>
<div class="w-full flex flex-col items-center">
    <app-nav-bar class="fixed"></app-nav-bar>
    <div class="flex flex-col justify-center items-center">
        <slot />
    </div>
</div>
</template>

<style>
@reference "assets/css/main.css";

body {
    /* background-image: linear-gradient(to bottom right, black, yellow); */
    @apply bg-cover bg-fixed text-indigo-300;
}
h1 {
    @apply text-3xl m-2
}
</style>