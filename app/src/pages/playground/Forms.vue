<template>
    <div class="q-gutter-y-md">
      <q-tabs
          v-model="tab"
          dense
          :class="$q.dark.isActive ? 'bg-light-blue-10' : 'bg-light-blue-3'"
          narrow-indicator
          align="justify"
        >
          <q-tab name="formOne" label="Formulario 1" />
          <q-tab name="mails" label="Mails" />
          <q-tab name="alarms" label="Alarms" />
          <q-tab name="movies" label="Movies" />
        </q-tabs>

      <q-card class="my-card">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="formOne">
            <form @submit.prevent="simulateSubmit" class="q-pa-md">
              <div class="row q-pa-md q-gutter-md justify-left">
                <div class="col-4 col-md-3">
                  <q-input v-model="password" filled type="password" hint="Password" />
                </div>
                <div class="col-4 col-md-3">
                  <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password Hint">
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>

                <div class="col-4 col-md-3">
                  <q-input v-model="email" filled type="email" hint="Email" />
                </div>
              </div>

              <div class="row q-pa-md q-gutter-md justify-left">
                <div class="col-12 col-md-3">
                  <q-input v-model="text" filled type="text" hint="Text" />
                </div>
              </div>

              <div class="row q-pa-md q-gutter-md justify-left">
                <div class="col-12 col-md-2">
                  <q-input v-model="tel" filled type="tel" hint="Telephone number" />
                </div>

                <div class="col-12 col-md-2">
                  <q-input v-model="time" filled type="time" hint="Native time" />
                </div>

                <div class="col-12 col-md-2">
                  <q-input v-model="date" filled type="date" hint="Native date" />
                </div>

                <div class="col-12 col-md-3">
                  <q-input v-model="url" filled type="url" hint="URL" />
                </div>
              </div>

              <!--
                A button with v-model set to submit.
                v-model scope variable must be a strict Boolean
              -->
              <div class="fixed-bottom-right q-mb-xl q-mr-xl">
                <q-btn
                  type="submit"
                  align="around"
                  class="btn-fixed-width"
                  color="blue-5"
                  label="Salvar"
                  icon="save"
                  :loading="submitting"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                </q-btn>
              </div>
            </form>
          </q-tab-panel>

          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const test = ref('')
    const submitting = ref(false)

    function simulateSubmit () {
      submitting.value = true

      // Simulating a delay here.
      // When we are done, we reset "submitting"
      // Boolean to false to restore the
      // initial state.
      setTimeout(() => {
        // delay simulated, we are done,
        // now restoring submit to its initial state
        submitting.value = false
      }, 3000)
    }

    return {
      password: ref(''),
      isPwd: ref(true),
      email: ref(''),
      search: ref(''),
      tel: ref(''),
      url: ref(''),
      time: ref(''),
      date: ref(''),
      text: ref(''),

      test,
      submitting,
      simulateSubmit,

      tab: ref('formOne')
    }
  }
}
</script>

<style lang="css">
  @import "src/css/card.css";
</style>