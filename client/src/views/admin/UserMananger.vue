<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="container mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <section class="attendance p-6">
        <div class="attendance-list">
          <h1 class="text-2xl font-semibold mb-4">Quản lí tài khoản</h1>
          <div class="flex justify-between mb-4">
            <div class="flex items-center space-x-4">
              <h4 class="text-lg">Sắp xếp theo:</h4>
              <select id="sort-id" v-model="sortOptionId" class="p-2 border border-gray-300 rounded">
                <option value="all">Tất cả</option>
                <option value="unlocked">Mở khóa</option>
                <option value="locked">Đã khóa</option>
              </select>
              <select id="sort-name" v-model="sortOptionName" class="p-2 border border-gray-300 rounded">
                <option value="default">Mặc định - Tên</option>
                <option value="az">Từ A - Z</option>
                <option value="za">Từ Z - A</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm tài khoản..."
              v-model="searchTerm"
              class="p-2 border border-gray-300 rounded"
            />
          </div>
          <table class="min-w-full bg-white border border-gray-300 rounded">
            <thead>
              <tr class="bg-gray-200">
                <th class="py-2 px-4 border">STT</th>
                <th class="py-2 px-4 border">Tên Tài Khoản</th>
                <th class="py-2 px-4 border">Email</th>
                <th class="py-2 px-4 border">Trạng Thái Khóa</th>
                <th class="py-2 px-4 border">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(account, index) in filteredAccounts" :key="account.id" class="hover:bg-gray-100">
                <td class="py-2 px-4 border">{{ index + 1 }}</td>
                <td class="py-2 px-4 border">{{ account.nameAccount }}</td>
                <td class="py-2 px-4 border">{{ account.email }}</td>
                <td class="py-2 px-4 border">
                  <span
                    class="status-icon cursor-pointer"
                    :style="{ color: account.lock ? 'green' : 'red' }"
                    @click="toggleLock(account.id)"
                  >
                    <IonIcon :icon="account.lock ? lockOpenOutline : lockClosedOutline" />
                    {{ account.lock ? 'Mở khóa' : 'Đã khóa' }}
                  </span>
                </td>
                <td class="py-2 px-4 border">
                  <button @click="viewDetails(account)" class="text-blue-500 hover:underline mr-2">
                    <IonIcon icon="eyeOutline" /> Xem
                  </button>
                  <button
                    @click="toggleLock(account.id)"
                    class=" hover:underline"
                    :style="{ color: account.lock ? 'green' : 'red' }"
                  >
                    {{ account.lock ? 'Khóa' : 'Mở khóa' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Account {
  id: number;
  nameAccount: string;
  email: string;
  lock: boolean;
  status: number; // Add status property to the interface
}

const accounts = ref<Account[]>([]);
const sortOptionId = ref<string>('all'); // Changed default value
const sortOptionName = ref<string>('default');
const searchTerm = ref<string>('');

// Fetch accounts data from the API on component mount
onMounted(() => {
  axios.get<Account[]>('http://localhost:8080/userList')
    .then(response => {
      accounts.value = response.data;
    })
    .catch(error => console.error('Error fetching data:', error));
});

// Filter accounts based on search term and status
const filteredAccounts = computed(() => {
  let result = accounts.value.filter(account => account.status !== 0); // Exclude admin accounts

  // Filter based on lock status
  if (sortOptionId.value === 'unlocked') {
    result = result.filter(account => account.lock); // Show only unlocked accounts
  } else if (sortOptionId.value === 'locked') {
    result = result.filter(account => !account.lock); // Show only locked accounts
  }

  // Filter based on search term
  result = result.filter(account =>
    account.nameAccount.toLowerCase().includes(searchTerm.value.toLowerCase())
  );

  // Sort by name if the name sorting option is selected
  if (sortOptionName.value === 'az') {
    result.sort((a, b) => a.nameAccount.localeCompare(b.nameAccount));
  } else if (sortOptionName.value === 'za') {
    result.sort((a, b) => b.nameAccount.localeCompare(a.nameAccount));
  }

  return result;
});

// Toggle lock status of an account
const toggleLock = (id: number) => {
  const account = accounts.value.find(acc => acc.id === id);
  if (!account) return;

  Swal.fire({
    title: `Bạn có chắc muốn ${account.lock ? 'khóa' : 'mở khóa'} tài khoản này?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Có",
    cancelButtonText: "Không"
  }).then(result => {
    if (result.isConfirmed) {
      axios.put(`http://localhost:8080/userList/${id}`, {
        ...account,
        lock: !account.lock // Toggle the lock status
      })
      .then(response => {
        const updatedAccounts = accounts.value.map(acc =>
          acc.id === id ? { ...acc, lock: !acc.lock } : acc
        );
        accounts.value = updatedAccounts;
        Swal.fire({
          title: `Tài khoản đã được ${account.lock ? 'khóa' : 'mở khóa'}.`,
          icon: "success",
        });
      })
      .catch(error => {
        console.error('Error updating account lock status:', error);
        Swal.fire({
          title: 'Lỗi khi cập nhật trạng thái khóa/mở khóa!',
          icon: 'error',
        });
      });
    }
  });
};

// View account details
const viewDetails = (account: Account) => {
  Swal.fire({
    title: 'Thông tin tài khoản',
    html: `
      <strong>ID:</strong> ${account.id}<br/>
      <strong>Tên tài khoản:</strong> ${account.nameAccount}<br/>
      <strong>Email:</strong> ${account.email}<br/>
      <strong>Trạng thái khóa:</strong> ${account.lock ? 'Mở khóa' : 'Đã khóa'}
    `,
    icon: 'info'
  });
};
</script>
