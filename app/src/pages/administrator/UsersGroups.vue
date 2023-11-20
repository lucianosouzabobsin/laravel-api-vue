<template>
  <div class="q-gutter-y-md">
    <q-tabs
      v-model="tab"
      dense
      :class="$q.dark.isActive ? 'bg-light-blue-10' : 'bg-light-blue-3'"
      align="left"
      narrow-indicator
    >
      <q-tab name="list" label="Lista" />
      <q-tab name="create" label="Incluir" />
    </q-tabs>

    <q-card class="my-card">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="list">
          <q-table
            flat bordered
            ref="tableRef"
            title="Grupo de Usuários"
            :rows="rows"
            :columns="columns"
            row-key="id"
            v-model:pagination="pagination"
            :loading="loading"
            :filter="filter"
            binary-state-sort
            @request="onRequest"
          >

            <template v-slot:top-row="{ cols }">
              <q-tr>
                <q-td v-for="col in cols" :key="col.name">
                  <q-input outlined dense="dense" v-if="col.name === 'id'" placeholder="Search ID" v-model="filter.id"></q-input>
                  <q-input outlined dense="dense" v-if="col.name === 'name'" placeholder="Search Name" v-model="filter.name"></q-input>
                  <q-input outlined dense="dense" v-if="col.name === 'description'" placeholder="Search Description" v-model="filter.description"></q-input>
                </q-td>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="id" :props="props">
                    {{ props.row.id }}
                </q-td>

                <q-td key="name" :props="props">
                    {{ props.row.name }}
                </q-td>

                <q-td key="description" :props="props">
                    {{ props.row.description }}
                </q-td>

                <q-td key="active" :props="props">
                  <span v-if="props.row.active" class="material-icons" style="font-size: 2em; color: green;">
                    check_circle
                  </span>
                  <span v-else class="material-icons" style="font-size: 2em; color: red;">
                    cancel
                  </span>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>

        <q-tab-panel name="create">
          <div class="text-h6">Incluir</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Endpoint from 'src/composables/Endpoint'
import { Notify } from 'quasar';

const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'description', align: 'left', label: 'Description', field: 'description', sortable: true },
  { name: 'active', label: 'Active', field: 'active', sortable: false },
]

const rows = []

export default {
  setup () {
    const tab = ref('list')
    const endpoint = Endpoint()
    const tableRef = ref()
    const rows = ref([])
    const filter = ref({
      id: '',
      name: '',
      description: '',
    })
    const loading = ref(false)
    const pagination = ref({
      sortBy: 'id',
      descending: true,
      page: 1,
      rowsPerPage: 3,
      rowsNumber: 10
    })

    async function fetch (startRow, count, filters, sortBy, descending) {

      try {
        let options = {
          sortBy: [sortBy],
          sortDirection: descending ? ["desc"] : ["asc"],
          perPage: count,
          page: startRow
        };

        console.log(filters);

        return await endpoint.postWithToken('http://localhost/api/user-group-list', filters, options);

      } catch (error) {
        Notify.create({
          color: 'negative',
          message: error.response.statusText,
          icon: 'report_problem',
          position: 'top-right'
        });
      }
    }

    function onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      const filter = filters(props.filter)

      loading.value = true

      // calculate starting row of data
      const startRow = (page - 1)

      // get all rows if "All" (0) is selected
      const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

      // fetch data from "server"
      fetch(startRow, fetchCount, filter, sortBy, descending)
        .then(data => {
          rows.value = data['data'];
          pagination.value.rowsNumber = data['count'];
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

      // don't forget to update local pagination object
      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.sortBy = sortBy
      pagination.value.descending = descending

      // ...and turn of loading indicator
      loading.value = false
    }

    function filters(filter) {

      let filters = [];

      if (filter.id) {
        filters.push({field: 'id', operator: '=', value: filter.id});
      }

      if (filter.name) {
        filters.push({field: 'name', operator: 'LIKE', value: filter.name});
      }

      if (filter.description) {
        filters.push({field: 'description', operator: 'LIKE', value: filter.description});
      }

      return filters
    }

    onMounted(async () => {
      await onRequest({
        pagination: pagination.value,
        filter: filter.value,
      });
    })

    return {
      tableRef,
      filter,
      loading,
      pagination,
      columns,
      rows,
      tab,

      onRequest
    }
  }
}
</script>
