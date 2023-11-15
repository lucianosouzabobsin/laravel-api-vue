<template>
    <div class="q-pa-xs">
      <q-table
        class="my-header-table"
        flat bordered
        :title="title"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="filter"
        separator="cell"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
    name: 'DataTable',
    props: {
        title: {
        type: String,
        required: true
        },

        columns: {
        type: Array,
        default: []
        },

        rows: {
        type: Array,
        default: []
        },
    },
    setup () {
        return {
            filter: ref(''),
        }
    }
})
</script>

<style lang="css">
    @import "src/css/datatable.css";
</style>
