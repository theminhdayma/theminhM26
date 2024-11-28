<template>
    <section class="h-screen mt-[-16px]">
      <div class="container mx-auto h-full">
        <div class="flex justify-center items-center h-full">
          <div class="flex flex-col md:flex-row w-full max-w-6xl">
            <div class="w-full md:w-1/2 flex flex-col items-center">
              <h1 class="text-4xl font-bold text-center mb-4">ĐĂNG NHẬP</h1>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="w-3/4 mb-4"
                alt="Sample image"
              />
            </div>
            <div class="w-full md:w-1/2 bg-white p-6 shadow-md rounded-lg">
              <form id="loginForm">
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    class="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Nhập email"
                  />
                  <div class="text-red-500 text-sm mt-1">Email không được để trống</div>
                </div>
  
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2" for="password">Mật khẩu</label>
                  <input
                    type="password"
                    id="password"
                    class="w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Nhập mật khẩu"
                  />
                  <div class="text-red-500 text-sm mt-1">Mật khẩu không được để trống</div>
                </div>
  
                <div class="flex justify-between items-center mb-4">
                  <div class="flex items-center">
                    <input
                      class="form-check-input mr-2"
                      type="checkbox"
                      id="form2Example3"
                    />
                    <label class="text-sm" for="form2Example3">Lưu mật khẩu</label>
                  </div>
                  <a href="#!" class="text-sm text-blue-500 hover:underline">Quên mật khẩu?</a>
                </div>
                <div class="text-center mt-6">
                  <button
                    type="submit"
                    class="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700"
                  >
                    Đăng nhập
                  </button>
                  <p class="mt-4 text-sm">
                    Bạn chưa có tài khoản? 
                    <router-link to="/signUpUser" class="text-red-500 hover:underline">Đăng kí</router-link> tại đây
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
    import { computed } from "vue";
    
  
  </script>
  
  <style scoped>
  /* Thêm CSS tuỳ chỉnh tại đây nếu cần */
  </style>
  