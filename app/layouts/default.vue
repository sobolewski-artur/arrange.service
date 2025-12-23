<template>
<div class="flex w-full justify-center">
    <div class="w-full flex xl:w-9/12">
        <app-nav-bar></app-nav-bar>
        <div class="m-4 w-full">
            <slot />
        </div>
        <app-side-bar class="hidden lg:flex w-1/2"></app-side-bar>
    </div>
</div>
</template>

<style>
body {
    background-image: linear-gradient(to bottom right, black, rgb(119, 119, 14));
    @apply bg-fixed text-yellow-300;
}
h1 {
    @apply text-3xl m-2
}
</style>