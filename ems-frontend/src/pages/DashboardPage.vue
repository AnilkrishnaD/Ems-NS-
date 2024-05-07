<template>
  <div class="dashboard">
    <div class="menu-items">
      <ul>
        <router-link to="/dashboard">
          <li>Dashboard</li>
        </router-link>
        <router-link to="/dashboard/employees">
          <li>Manage Employee</li>
        </router-link>
        <router-link to="/dashboard/category">
          <li>Category</li>
        </router-link>
        <router-link to="/dashboard/profile">
          <li>Profile</li>
        </router-link>
        <router-link to="/login">
          <li>Logout</li>
        </router-link>
      </ul>
    </div>

    <div class="dashboard-content">
      <h1>Employee Management System</h1>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
/* Override default active link styles */
/* Override default active link styles */
.router-link-active,
.router-link-exact-active {
  color: #000; /* Default color for all links */
  background-color: transparent; /* Remove background color */
}

/* Style for the "Logout" item if it's a router link */
.logout-link {
  color: #000; /* Default color for all links */
}

/* Or, if "Logout" is not a router link, apply the color directly */
.logout-item {
  color: #000; /* Default color for all links */
}

/* Custom styles for the dashboard */
.dashboard {
  display: flex;
  height: 100vh;
  .menu-items {
    width: 200px;
    background-color: rgb(84, 81, 81);
    color: #fff;
    ul {
      list-style-type: none;
      padding: 0;
      li {
        padding: 10px;
        cursor: pointer;
        text-decoration: none;

        color: black;
        &:hover {
          background-color: #34495e;
          color: white;
        }
      }
    }
  }

  .dashboard-content {
    flex: 1;
    background-color: #ecf0f1;
    padding: 20px;
    h1 {
      margin-bottom: 20px;
      color: #2c3e50; /* Text color for the heading */
    }
  }
}

.router-link {
  color: black;
}

.router-link-active {
  background-color: rgb(84, 81, 81);
  color: #fff;
}
/* Style for the active route */
.router-link-exact-active {
  background-color: black;
  li {
    color: white !important;
  }
  font-weight: 700;
}
</style>
