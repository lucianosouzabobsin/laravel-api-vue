<template>
  <div>
    <q-list>
      <template v-for="(menuItem, index) in menuList" :key="index">

        <div v-if="menuItem.children.length > 0">
          <q-expansion-item v-model="expanded">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar :icon="menuItem.icon" />
              </q-item-section>

              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </template>

            <template v-for="(children, indexChild) in menuItem.children" :key="indexChild">
              <q-item
                :to="children.link"
                exact
              >
                <q-item-section clickable avatar>
                    <q-icon :name="children.icon" />
                </q-item-section>
                <q-item-section>
                    {{ children.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="children.separator" />
            </template>
          </q-expansion-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </div>

        <div v-else>
          <q-item
            :to="menuItem.link"
            clickable
            v-ripple
            exact
            @click="closeExpansionsOpen"
          >
            <q-item-section clickable avatar>
                <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
                {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </div>
      </template>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MenuLayout',

  methods: {
    closeExpansionsOpen() {
      this.expanded = false;
    }
  },

  setup() {

    const menuList = [
      { icon: 'home', link: '/' , label: 'Home', separator: true, children:[] },
      { icon: 'send',  label: 'Outbox', separator: false, children:[] },
      { icon: 'delete', label: 'Trash', separator: false, children:[] },
      { icon: 'error',  label: 'Spam', separator: true, children:[] },
      { icon: 'admin_panel_settings', iconColor: 'primary', label: 'Administrador', separator: true,
        children:[
          {
            icon: 'assignment_ind',
            link: '/administrator/users-groups',
            iconColor: 'primary',
            label: 'Grupo de Usuários',
            separator: false
          },
          {
            icon: 'people',
            link: '/playground/forms',
            iconColor: 'primary',
            label: 'Usuários',
            separator: false
          }
      ]},
      { icon: 'auto_fix_high', iconColor: 'primary', label: 'Playground', separator: true,
        children:[
          {
            icon: 'table_view',
            link: '/playground/data-table',
            iconColor: 'primary',
            label: 'Tabela',
            separator: false
          },
          {
            icon: 'list_alt',
            link: '/playground/forms',
            iconColor: 'primary',
            label: 'Formulário',
            separator: false
          }
      ]},
    ]

    return {
      expanded: ref(false),
      menuList,
    }
  },
})
</script>
