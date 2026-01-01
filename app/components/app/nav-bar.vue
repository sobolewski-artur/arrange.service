<script setup>
import { getAuth, signOut } from 'firebase/auth'
const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const user = useState('user')
const showLogout = ref(false)
const showPost = ref(false)

const home = computed(() => route.fullPath.split('/')[1] === 'home')
const search = computed(() => route.fullPath.split('/')[1] === 'search')
const notifications = computed(() => route.fullPath.split('/')[1] === 'notifications')
const messages = computed(() => route.fullPath.split('/')[1] === 'messages')
const settings = computed(() => route.fullPath.split('/')[1] === 'settings')
const profile = computed(() => route.fullPath.split('/')[1] === 'profile')
const post = computed(() => route.fullPath.split('/')[1] === 'post')
const signin = computed(() => route.fullPath.split('/')[1] === 'signin')
const signout = computed(() => route.fullPath.split('/')[1] === 'signout')


function logOut() {
    signOut(getAuth())
    showLogout.value = false
}
function onShowLogout() {
    showLogout.value = false
    router.go(-1)
}
</script>

<template>
    <nav class="flex flex-col justify-between sticky top-0 border-r-2 h-screen">
        <div class="flex flex-col">
            <AppNavButton :to="localePath('/home')" :showSolid="home" icon1="icon-park-outline:home" icon2="icon-park-solid:home">{{ t('home-btn') }}</AppNavButton>
            <AppNavButton :to="localePath('/search')" :showSolid="search" icon1="icon-park-outline:search" icon2="icon-park-solid:search">{{ t('search-btn') }}</AppNavButton>
            <AppNavButton :to="localePath('/notifications')" :showSolid="notifications" icon1="line-md:bell" icon2="line-md:bell-filled">{{ t('notifications-btn') }}</AppNavButton>
            <AppNavButton :to="localePath('/messages')" :showSolid="messages" icon1="bx:envelope" icon2="bxs:envelope">{{ t('messages-btn') }}</AppNavButton>
            <AppNavButton :to="localePath('/settings')" :showSolid="settings" icon1="ic:outline-settings" icon2="ic:baseline-settings">{{ t('settings-btn') }}</AppNavButton>
            <AppNavButton :to="localePath('/profile')" :showSolid="profile" icon1="iconamoon:profile-light" icon2="iconamoon:profile-fill">{{ t('profile-btn') }}</AppNavButton>
            <AppNavButton :to="localePath('/post')" :showSolid="post" icon1="icon-park-outline:write" icon2="icon-park-solid:write">{{ t('post-btn') }}</AppNavButton>
        </div>
        <div>
            <AppNavButton v-if="!user" :to="localePath('/signin')" :showSolid="signin" icon1="clarity:sign-in-line" icon2="clarity:sign-in-solid">{{ t('signin-btn') }}</AppNavButton>
            <AppNavButton v-if="user" @click="showLogout = true" :to="localePath('/signout')" :showSolid="showLogout" icon1="clarity:sign-out-line" icon2="clarity:sign-out-solid">{{ t('signout-btn') }}</AppNavButton>
        </div>
        <Teleport to="body">
            <Transition name="modal">
                <LayoutModalBg v-if="showLogout" @click.self="onShowLogout">
                    <LayoutFrame>
                        <h2>{{ t('signout.modal-title') }}</h2>
                        <div class="mt-6 flex gap-10">
                            <LayoutButton @click="onShowLogout">{{ t('signout.btn-abort') }}</LayoutButton>
                            <NuxtLink @click="logOut" :to="localePath('/signin')"><LayoutButton>{{ t('signout.btn-confirm') }}</LayoutButton></NuxtLink>
                        </div>
                    </LayoutFrame>
                </LayoutModalBg>
            </Transition>
        </Teleport>
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