<template>
  <div>
    <Header />
    <div class="container-content-admin">
      <Navbar/>
      <div class="main-body" style="width: 100%">
        <h2 class="text-3xl font-bold">Bảng điều khiển</h2>
        <router-view v-slot="{Component}">
          <Suspense>
            <!-- Thành phần các component sử dụng cơ chế load  -->
            <template #default>
              <component :is="Component"></component>
            </template>
            <!-- Hiệu ứng loading trước khi tải trang  -->
            <template #falback>
              <div>loading...</div>
            </template>
          </Suspense>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../../components/admin/Header.vue';
import Navbar from '../../components/admin/Navbar.vue';
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  background: rgb(219, 219, 219);
}
.header-admin {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 20px;
  background: #fff;
}
.header-admin .logo-search-container {
  display: flex;
  align-items: center;
}
.header-admin .logo-search-container a {
  display: flex;
  align-items: center;
  color: #000;
  font-size: 18px;
  font-weight: 600;
  margin: 2rem 8rem 2rem 2rem;
}
.search_box {
  display: flex;
  align-items: center;
}
.search_box input {
  padding: 9px;
  width: 250px;
  background: rgb(228, 228, 228);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.search_box i {
  padding: 0.66rem;
  cursor: pointer;
  color: #fff;
  background: #000;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.header-icons {
  display: flex;
  align-items: center;
}
.header-icons i {
  margin-right: 2rem;
  cursor: pointer;
}
.header-icons .account {
  width: 130px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-icons .account img {
  width: 35px;
  height: 35px;
  cursor: pointer;
  border-radius: 50%;
}

/* ------------------------ */
.container-content-admin {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

/* Side menubar section */

.container-content-admin .side-navbar {
  background: #fff;
  padding: 1px;
  display: flex;
  flex-direction: column;
}
.container-content-admin .side-navbar span {
  color: gray;
  margin: 1rem 3rem;
  font-size: 12px;
}
.container-content-admin .side-navbar a {
  width: 100%;
  padding: 0.8rem 3rem;
  font-weight: 500;
  font-size: 15px;
  color: rgb(100, 100, 100);
}
.side-navbar .links {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
}
.side-navbar .links a {
  font-size: 13px;
}
.side-navbar a:hover {
  background: rgb(235, 235, 235);
}
.side-navbar .active {
  border-left: 4px solid rgb(100, 100, 100);
}

/* Main Body Section */
.main-body {
  width: 70%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 20px;  
}
.promo_card {
  width: 100%;
  color: #fff;
  margin-top: 10px;
  border-radius: 8px;
  padding: 0.5rem 1rem 1rem 3rem;
  background: rgb(37, 37, 37);
}
.promo_card h1,
.promo_card span,
button {
  margin: 10px;
}
.promo_card button {
  display: block;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}
.rank-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}
table {
  background: #fff;
  padding: 1rem;
  text-align: left;
  border-radius: 10px;
}
table td,
th {
  padding: 0.2rem 0.8rem;
}
table th {
  font-size: 15px;
}
table td {
  font-size: 13px;
  color: rgb(100, 100, 100);
}

/* Sidebar Section */
.sidebar {
  width: 15%;
  padding: 2rem 1rem;
  background: #fff;
}
.sidebar h4 {
  margin-bottom: 1.5rem;
}
.sidebar .balance {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.balance .icon {
  color: #fff;
  font-size: 20px;
  border-radius: 6px;
  margin-right: 1rem;
  padding: 1rem;
  background: rgb(37, 37, 37);
}
.balance .info h5 {
  font-size: 16px;
}
.balance .info span {
  font-size: 14px;
  color: rgb(100, 100, 100);
}
.balance .info i {
  margin-right: 2px;
}
/* --------------------------- */

</style>
