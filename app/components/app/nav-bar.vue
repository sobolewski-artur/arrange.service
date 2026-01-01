<script setup>
import { getAuth, signOut } from 'firebase/auth'
const localePath = useLocalePath()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const user = useState('user')
const showSignout = ref(false)
const showNav = ref(false)

const home = computed(() => route.fullPath.split('/')[1] === 'home')
const search = computed(() => route.fullPath.split('/')[1] === 'search')
const notifications = computed(() => route.fullPath.split('/')[1] === 'notifications')
const messages = computed(() => route.fullPath.split('/')[1] === 'messages')
const settings = computed(() => route.fullPath.split('/')[1] === 'settings')
const profile = computed(() => route.fullPath.split('/')[1] === 'profile')
const post = computed(() => route.fullPath.split('/')[1] === 'post')
const signin = computed(() => route.fullPath.split('/')[1] === 'signin')

function logOut() {
    signOut(getAuth())
    showSignout.value = false
}
function onSHowSiwnout() {
    showSignout.value = true
    showNav.value = false
}
function onShowLogout() {
    showSignout.value = false
    router.go(-1)
}
</script>

<template>
    <nav class="hidden sm:flex sm:flex-col justify-between sticky top-0 border-r-2 h-screen">
        <div class="flex flex-col">
            <LayoutNavButton :to="localePath('/home')" :showSolid="home" icon1="icon-park-outline:home" icon2="icon-park-solid:home">{{ t('home-btn') }}</LayoutNavButton>
            <LayoutNavButton :to="localePath('/search')" :showSolid="search" icon1="icon-park-outline:search" icon2="icon-park-solid:search">{{ t('search-btn') }}</LayoutNavButton>
            <LayoutNavButton :to="localePath('/notifications')" :showSolid="notifications" icon1="line-md:bell" icon2="line-md:bell-filled">{{ t('notifications-btn') }}</LayoutNavButton>
            <LayoutNavButton :to="localePath('/messages')" :showSolid="messages" icon1="bx:envelope" icon2="bxs:envelope">{{ t('messages-btn') }}</LayoutNavButton>
            <LayoutNavButton :to="localePath('/settings')" :showSolid="settings" icon1="ic:outline-settings" icon2="ic:baseline-settings">{{ t('settings-btn') }}</LayoutNavButton>
            <LayoutNavButton :to="localePath('/profile')" :showSolid="profile" icon1="iconamoon:profile-light" icon2="iconamoon:profile-fill">{{ t('profile-btn') }}</LayoutNavButton>
            <LayoutNavButton :to="localePath('/post')" :showSolid="post" icon1="icon-park-outline:write" icon2="icon-park-solid:write">{{ t('post-btn') }}</LayoutNavButton>
        </div>
        <div>
            <LayoutNavButton v-if="!user" :to="localePath('/signin')" :showSolid="signin" icon1="clarity:sign-in-line" icon2="clarity:sign-in-solid">{{ t('signin-btn') }}</LayoutNavButton>
            <LayoutNavButton v-if="user" @click="showSignout = true" :to="localePath('/signout')" :showSolid="showSignout" icon1="clarity:sign-out-line" icon2="clarity:sign-out-solid">{{ t('signout-btn') }}</LayoutNavButton>
        </div>
    </nav>
    <LayoutModal :onShow="showSignout" @on-close="onShowLogout">
        <h2>{{ t('signout.modal-title') }}</h2>
        <div class="mt-6 flex w-full justify-around">
            <LayoutButton @click="onShowLogout">{{ t('signout.btn-abort') }}</LayoutButton>
            <NuxtLink @click="logOut" :to="localePath('/signin')"><LayoutButton>{{ t('signout.btn-confirm') }}</LayoutButton></NuxtLink>
        </div>
    </LayoutModal>
    <nav class="sm:hidden fixed bottom-0 flex w-full">
        <div class="flex w-full justify-between">
            <LayoutNavButton :to="localePath('/home')" :showSolid="home" icon1="icon-park-outline:home" icon2="icon-park-solid:home">{{ t('home-btn') }}</LayoutNavButton>
            <LayoutNavButton :to="localePath('/search')" :showSolid="search" icon1="icon-park-outline:search" icon2="icon-park-solid:search">{{ t('search-btn') }}</LayoutNavButton>
            <LayoutNavButton :to="localePath('/notifications')" :showSolid="notifications" icon1="line-md:bell" icon2="line-md:bell-filled">{{ t('notifications-btn') }}</LayoutNavButton>
            <LayoutNavButton :to="localePath('/messages')" :showSolid="messages" icon1="bx:envelope" icon2="bxs:envelope">{{ t('messages-btn') }}</LayoutNavButton>
            <LayoutNavButton @click="showNav = true" :show-solid="true" icon1="quill:hamburger" icon2="quill:hamburger"></LayoutNavButton>
            <LayoutNavButton class="fixed bottom-14 right-0" :to="localePath('/post')" :showSolid="post" icon1="icon-park-outline:write" icon2="icon-park-solid:write">{{ t('post-btn') }}</LayoutNavButton>
        </div>
        <LayoutModal :onShow="showNav" @onClose="showNav = false" >
            <LayoutNavButton :hide-text="false" @click="showNav = false" :to="localePath('/settings')" :showSolid="settings" icon1="ic:outline-settings" icon2="ic:baseline-settings">{{ t('settings-btn') }}</LayoutNavButton>
            <LayoutNavButton :hide-text="false" @click="showNav = false" :to="localePath('/profile')" :showSolid="profile" icon1="iconamoon:profile-light" icon2="iconamoon:profile-fill">{{ t('profile-btn') }}</LayoutNavButton>
            <LayoutNavButton :hide-text="false" @click="showNav = false" v-if="!user" :to="localePath('/signin')" :showSolid="signin" icon1="clarity:sign-in-line" icon2="clarity:sign-in-solid">{{ t('signin-btn') }}</LayoutNavButton>
            <LayoutNavButton v-if="user" :hide-text="false" @click="onSHowSiwnout" :to="localePath('/signout')" :showSolid="showSignout" icon1="clarity:sign-out-line" icon2="clarity:sign-out-solid">{{ t('signout-btn') }}</LayoutNavButton>
        </LayoutModal>
    </nav>
</template>