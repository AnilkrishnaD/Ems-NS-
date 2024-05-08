<template>
  <div>
    <div>
      <h3>Employee List</h3>
    </div>
    <router-link to="/dashboard/add-employee" class="btn btn-success">
      Add Employee
    </router-link>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Email</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in employees" :key="e.id">
            <td>{{ e.name }}</td>
            <td>
              <img
                :src="`http://localhost:3000/Images/${e.image}`"
                class="employee_image"
              />
            </td>
            <td>{{ e.email }}</td>
            <td>{{ e.address }}</td>
            <td>{{ e.salary }}</td>
            <td>
              <router-link
                :to="`/dashboard/EditEmployee/${e.id}`"
                class="btn btn-info btn-sm me-2"
              >
                Edit
              </router-link>
              <button
                class="btn btn-warning btn-sm"
                @click="handleDelete(e.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useEmployeeStore } from "../../stores/employee";

const employees = ref(null);

// stores
const employeStore = useEmployeeStore();

const employeesList = computed(() => employeStore.empList);
const error = computed(() => employeStore.error);
const status = computed(() => employeStore.loadingStatus);

// on mounted
onMounted(() => {
  employeStore.fetchEmployees();
});

// Dummy data for demonstration
employees.value = [
  {
    id: 1,
    name: "John Doe",
    image: "john.jpg",
    email: "john@example.com",
    address: "123 Main St",
    salary: "$5000",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "jane.jpg",
    email: "jane@example.com",
    address: "456 Elm St",
    salary: "$6000",
  },
];

const router = useRouter();

// Delete employee function
function handleDelete(id) {
  employeStore.deleteEmployee(id);
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  margin-bottom: 12px;
}
.px-5 {
  padding-left: 1.25rem; // Equivalent to px-5
  padding-right: 1.25rem; // Equivalent to px-5
}

.mt-3 {
  margin-top: 0.75rem; // Equivalent to mt-3
}

.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center; // Equivalent to justify-content-center
}

.btn {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1rem;
  border-radius: 0.25rem;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
}

.btn-success {
  color: #fff;
  background-color: #198754;
  border-color: #198754;
}

.btn-info {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-warning {
  color: #212529;
  background-color: #ffc107;
  border-color: #ffc107;
  margin-left: 0.35rem;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table tbody + tbody {
  border-top: 2px solid #dee2e6;
}

.table .table {
  background-color: #fff;
}

.table-sm th,
.table-sm td {
  padding: 0.3rem;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-bordered thead th,
.table-bordered thead td {
  border-bottom-width: 2px;
}

.table-borderless th,
.table-borderless td,
.table-borderless thead th,
.table-borderless tbody + tbody {
  border: 0;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.table-hover tbody tr:hover {
  color: #212529;
  background-color: rgba(0, 0, 0, 0.075);
}
</style>
