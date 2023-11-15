<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
              @submit.prevent="handleLogin"
            >
              <q-input
                filled
                v-model="form.email"
                label="Email"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="form.password"
                label="Password"
                lazy-rules
              />

              <div class="row justify-center" q-pt-md>
                <q-btn
                  label="Login"
                  type="submit"
                  color="green"
                  outline
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'LoginPage',

  setup () {
    const $q = useQuasar()
    const router = useRouter()

    const { login } = useAuthUser()

    const form = ref({
      email: '',
      password: ''
    })

    const handleLogin = async () => {
      try {

        await isEmptyForm()

        await login(form.value)
        router.push({ name: 'dashboard' })
      } catch (error) {
        console.log(error);
        $q.notify({color: 'negative', message: error.message, position: 'bottom', icon: 'report_problem' })
      }
    }

    const isEmptyForm  = async () => {
      if (form.value.email == '' || form.value.password == '') {
        throw new Error("Preencha todos os campos!");
      }
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #1d0feb 0%, #cacbd4 100%);
}
</style>
