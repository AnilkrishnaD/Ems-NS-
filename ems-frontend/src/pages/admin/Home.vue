<template>
  <div>
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
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in admins" :key="admin.id">
            <td>{{ admin.email }}</td>
            <td>
              <button class="btn-edit">Edit</button>
              <button class="btn-delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const adminTotal = ref(0);
const employeeTotal = ref(0);
const salaryTotal = ref(0);
const admins = ref([]);

onMounted(() => {
  adminCount();
  employeeCount();
  salaryCount();
  AdminRecords();
});

const AdminRecords = () => {
  axios.get("http://localhost:3000/auth/admin_records").then((result) => {
    if (result.data.Status) {
      admins.value = result.data.Result;
    } else {
      alert(result.data.Error);
    }
  });
};

const adminCount = () => {
  axios.get("http://localhost:3000/auth/admin_count").then((result) => {
    if (result.data.Status) {
      adminTotal.value = result.data.Result[0].admin;
    }
  });
};

const employeeCount = () => {
  axios.get("http://localhost:3000/auth/employee_count").then((result) => {
    if (result.data.Status) {
      employeeTotal.value = result.data.Result[0].employee;
    }
  });
};

const salaryCount = () => {
  axios.get("http://localhost:3000/auth/salary_count").then((result) => {
    if (result.data.Status) {
      salaryTotal.value = result.data.Result[0].salaryOFEmp;
    } else {
      alert(result.data.Error);
    }
  });
};
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
