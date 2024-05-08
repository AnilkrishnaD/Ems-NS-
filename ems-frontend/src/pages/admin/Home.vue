<template>
  <div>
    <p>{{ status }}</p>
    <template v-if="status === 'success'">
      <div class="dashboard-summary">
        <div class="summary-item">
          <div class="summary-title">Admin</div>
          <hr />
          <div class="summary-detail">
            <span>Total:</span>
            <span>{{ adminTotal }}</span>
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-title">Employee</div>
          <hr />
          <div class="summary-detail">
            <span>Total:</span>
            <span>{{ employeeTotal }}</span>
          </div>
        </div>
        <div class="summary-item">
          <div class="summary-title">Salary</div>
          <hr />
          <div class="summary-detail">
            <span>Total:</span>
            <span>${{ salaryTotal }}</span>
          </div>
        </div>
      </div>
      <div class="admin-list">
        <h3>List of Admins</h3>
        <DataTable
          :value="admins"
          scrollable
          scrollHeight="400px"
          tableStyle="min-width: 50rem"
        >
          <Column field="email" header="Name"></Column>
          <Column header="Actions">
            <template #body="{ rowData }">
              <div class="action-buttons">
                <button @click="editAdmin(rowData)" class="edit-button">
                  <i class="pi pi-pencil"></i>
                </button>
                <button @click="deleteAdmin(rowData)" class="delete-button">
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
    <template v-else-if="status === 'loading'">
      <div>loading</div>
    </template>
    <template v-else>
      <div>something went wrong</div>
    </template>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional

import { useHomeStore } from "../../stores/Home";

// stores
const homeStore = useHomeStore();

const adminTotal = computed(() => homeStore.adminTotal);
const employeeTotal = computed(() => homeStore.empTotal);
const salaryTotal = computed(() => homeStore.salaryTotal);
const admins = computed(() => homeStore.adimnRecords);

const status = computed(() => homeStore.loadingStatus);
const error = computed(() => homeStore.error);

onMounted(() => {
  // useHomeStore.fetchAdminRecors();
  //useHomeStore.fetchAdminCount();
  // useHomeStore.fetchEmployeeCount();
  // useHomeStore.fetchSalaryCount();
});

const deleteAdmin = (data) => {};

const editAdmin = (data) => {};
</script>

<style scoped lang="scss">
.dashboard-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  .summary-item {
    flex: 0 0 calc(33.333% - 1rem);
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;

    .summary-title {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .summary-detail {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 1rem;
      }
    }
  }
}

.admin-list {
  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 0.75rem;
      border-bottom: 1px solid #ccc;
    }

    th {
      font-weight: bold;
    }

    td {
      button {
        margin-right: 0.5rem;
        padding: 0.25rem 0.5rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &.btn-edit {
          background-color: #007bff;
          color: #fff;
        }

        &.btn-delete {
          background-color: #dc3545;
          color: #fff;
        }

        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }
}
</style>
