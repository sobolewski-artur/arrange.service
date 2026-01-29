<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
    [
        {
          label: 'GitHub',
          icon: 'i-simple-icons-github',
          badge: '3.8k',
          to: 'https://github.com/nuxt/ui',
          target: '_blank'
        }
    ]
])

</script>

<template>
    <div class="flex flex-col">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium dolorum, quis harum doloribus amet maxime asperiores iste laudantium iure quidem hic libero voluptas fuga illo, nemo saepe velit excepturi reprehenderit.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium dolorum, quis harum doloribus amet maxime asperiores iste laudantium iure quidem hic libero voluptas fuga illo, nemo saepe velit excepturi reprehenderit.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium dolorum, quis harum doloribus amet maxime asperiores iste laudantium iure quidem hic libero voluptas fuga illo, nemo saepe velit excepturi reprehenderit.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium dolorum, quis harum doloribus amet maxime asperiores iste laudantium iure quidem hic libero voluptas fuga illo, nemo saepe velit excepturi reprehenderit.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium dolorum, quis harum doloribus amet maxime asperiores iste laudantium iure quidem hic libero voluptas fuga illo, nemo saepe velit excepturi reprehenderit.</p>
    </div>
</template>