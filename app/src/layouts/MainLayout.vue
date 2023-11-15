<template>
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-light-blue-10 text-white">
        <q-toolbar>
          <q-btn
            flat
            @click="toggleLeftDrawer"
            round
            dense
            icon="menu"
          />
          <q-btn stretch flat label="Sistema" href="/" />
          <q-space/>
          <div class="q-gutter-sm row items-center no-wrap">
              <QToggle
                v-model="isActiveDarkMode"
                @update:model-value="darkMode(isActiveDarkMode)"
                icon="nightlight"
                unchecked-icon="light_mode"
                :color="isActiveDarkMode ? 'indigo' : 'white'"
                keep-color
              />

              <q-btn
                round
                dense
                flat color="white"
                :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                @click="$q.fullscreen.toggle()"
                v-if="$q.screen.gt.sm">
              </q-btn>

              <MiniMenuLayout :username="username" />
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above

        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"

        :width="300"
        :breakpoint="500"
        bordered
        class="bg-light-blue-10 text-white"
      >
        <MenuLayout/>
      </q-drawer>

      <q-page-container >
        <router-view/>
      </q-page-container>
    </q-layout>
</template>


<script>
import MenuLayout from './MenuLayout.vue'
import MiniMenuLayout from './MiniMenuLayout.vue'
import { defineComponent, ref} from 'vue'
import { QToggle, LocalStorage } from "quasar";

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuLayout,
    MiniMenuLayout,
    QToggle,
  },

  setup () {
    const leftDrawerOpen = ref(false)

    let userData = LocalStorage.getItem('userData')

    const username = userData.name

    return {
      username,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      isActiveDarkMode: ref(true),
      miniState: ref(true)
    }
  },

  methods: {
    darkMode(val) {
      this.$q.dark.set(val)
    }
  }
})
</script>
