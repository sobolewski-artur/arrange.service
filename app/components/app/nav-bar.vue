<script setup>
import { getAuth, signOut } from 'firebase/auth'
const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()
const user = useState('user')

function logOut() {
    signOut(getAuth())
}
</script>

<template>
    <nav class="flex flex-col justify-between sticky top-0 border-r-2 h-screen">
        <div>
            <NuxtLink class="nav-bar-link" :to="localePath('/home')">
                <icon v-if="route.fullPath.split('/')[1] !== 'home'" name="icon-park-outline:home"></icon>
                <icon v-if="route.fullPath.split('/')[1] === 'home'" name="icon-park-solid:home"></icon>
                <span class="btn-name">{{ t('home-btn') }}</span>
            </NuxtLink>
            <NuxtLink class="nav-bar-link" :to="localePath('/search')">
                <icon v-if="route.fullPath.split('/')[1] !== 'search'" name="icon-park-outline:search"></icon>
                <icon v-if="route.fullPath.split('/')[1] === 'search'" name="icon-park-solid:search"></icon>
                <span class="btn-name" >{{ t('search-btn') }}</span>
            </NuxtLink>
            <NuxtLink class="nav-bar-link" :to="localePath('/notifications')">
                <icon v-if="route.fullPath.split('/')[1] !== 'notifications'" name="line-md:bell"></icon>
                <icon v-if="route.fullPath.split('/')[1] === 'notifications'" name="line-md:bell-filled"></icon>
                <span class="btn-name" >{{ t('notifications-btn') }}</span>
            </NuxtLink>
            <NuxtLink class="nav-bar-link" :to="localePath('/messages')">
                <icon v-if="route.fullPath.split('/')[1] !== 'messages'" name="bx:envelope"></icon>
                <icon v-if="route.fullPath.split('/')[1] === 'messages'" name="bxs:envelope"></icon>
                <span class="btn-name" >{{ t('messages-btn') }}</span>
            </NuxtLink>
            <NuxtLink class="nav-bar-link" :to="localePath('/settings')">
                <icon v-if="route.fullPath.split('/')[1] !== 'settings'" name="ic:outline-settings"></icon>
                <icon v-if="route.fullPath.split('/')[1] === 'settings'" name="ic:baseline-settings"></icon>
                <span class="btn-name" >{{ t('settings-btn') }}</span>
            </NuxtLink>
            <NuxtLink class="nav-bar-link" :to="localePath('/profile')">
                <icon v-if="route.fullPath.split('/')[1] !== 'profile'" name="iconamoon:profile-light"></icon>
                <icon v-if="route.fullPath.split('/')[1] === 'profile'" name="iconamoon:profile-fill"></icon>
                <span class="btn-name" >{{ t('profile-btn') }}</span>
            </NuxtLink>
        </div>
        <div>
            <NuxtLink v-if="!user" class="nav-bar-link" :to="localePath('/signin')">
                <span class="btn-name">{{ t('signin-btn') }}</span>
            </NuxtLink>
            <NuxtLink v-if="user" class="nav-bar-link" @click="logOut" :to="localePath('/signin')">
                <span class="btn-name">{{ t('signout-btn') }}</span>
            </NuxtLink>
        </div>
    </nav>
</template>

<style>
.nav-bar-link {
    @apply text-4xl lg:text-2xl flex gap-1 items-center p-2 hover:border-b-indigo-600 hover:text-indigo-600
}

.btn-name {
    @apply hidden lg:flex
}
</style>