<template>
    <q-avatar size="26px">
    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
    </q-avatar>
    <q-btn-dropdown round flat>
    <q-list padding style="width: 250px">
        <q-item>
            <q-item-section avatar>
                <q-avatar icon="perm_identity" color="indigo" text-color="white" />
            </q-item-section>
            <q-item-section>
                <q-item-label>{{ username }}</q-item-label>
                <q-item-label caption>Administrador</q-item-label>
            </q-item-section>
        </q-item>
        <q-item  clickable>
            <q-item-section avatar>
                <q-avatar icon="settings" color="red" text-color="white" />
            </q-item-section>
            <q-item-section>
                <q-item-label>Meu Perfil</q-item-label>
            </q-item-section>
        </q-item>

        <q-separator inset />

        <q-item clickable>
            <q-item-section avatar>
                <q-avatar icon="logout" color="blue" text-color="white" />
            </q-item-section>
            <q-item-section  @click="handleLogout">
                <q-item-label>Logout</q-item-label>
                <q-item-label caption></q-item-label>
            </q-item-section>
            <q-item-section side>
            </q-item-section>
        </q-item>
    </q-list>
    </q-btn-dropdown>
</template>

<script>
import { defineComponent } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MiniMenuLayout',
  props: {
    username: String
  },

  setup () {
    const router = useRouter()
    const { logout } = useAuthUser()

    const handleLogout = async () => {
      logout()
      router.push({ name: 'login' })
    }

    return {
        logout,
        handleLogout
    }
  }
});
</script>
