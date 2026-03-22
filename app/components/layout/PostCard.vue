<script setup>
const { posts } = defineProps(['posts'])
</script>

<template>
    <NuxtLink
        class="flex justify-between border-2 hover:text-primary hover:bg-slate-500 hover:border-primary rounded-lg p-2"
        v-for="post in posts" :key="post.id" :to="`/p/${post.id}`">
        <div>
            <h2>{{ truncate(post.title, 100) }}</h2>
            <p>{{ truncate(post.text, 100) }}</p>
            <p>{{ post.tags }}</p>
            <div class="flex gap-4">
            </div>
        </div>
        <div class="flex flex-col">
            <span>{{ post.geohash }}</span>
            <span>{{ post.visits }}</span>
            <span>{{ post.city }}</span>
            <span>{{ post.region }}</span>
            <span>{{ post.ownerDisplayName }}</span>
        </div>
    </NuxtLink>
</template>