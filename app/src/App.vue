<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',

  setup () {
    const router = useRouter()

    const { isLoggedIn } = useAuthUser()

    if (!isLoggedIn()) {
      router.push({ name: 'login' })
    }

    return {
    }
  }
})
</script>
