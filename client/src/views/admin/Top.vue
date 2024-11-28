<template>
  <div class="p-4">
    <div class="rank-list space-y-6">
      <!-- User Ranking Section -->
      <div class="list1 bg-white rounded-lg shadow-md p-4">
        <div class="row mb-4">
          <h4 class="text-xl font-semibold text-gray-800">Bảng xếp hạng</h4>
        </div>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b bg-gray-100">
              <th class="p-2">#</th>
              <th class="p-2">Họ và tên</th>
              <th class="p-2">Status</th>
              <th class="p-2">Số bài hoàn thành</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in topUsers"
              :key="user.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="p-2">{{ index + 1 }}</td>
              <td class="p-2">{{ user.nameAccount }}</td>
              <td class="p-2">
                <span
                  :class="user.lock === true ? 'text-green-600' : 'text-red-600'"
                >
                  {{ user.lock === true ? 'On' : 'Off' }}
                </span>
              </td>
              <td class="p-2">{{ user.result?.length || 0 }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Exam Section -->
      <div class="list2 bg-white rounded-lg shadow-md p-4">
        <div class="row mb-4">
          <h4 class="text-xl font-semibold text-gray-800">Đề thi tiêu biểu</h4>
        </div>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b bg-gray-100">
              <th class="p-2">#</th>
              <th class="p-2">Lượt thi</th>
              <th class="p-2">Tiêu đề</th>
              <th class="p-2">Độ khó</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(exam, index) in exams"
              :key="index"
              class="border-b hover:bg-gray-50"
            >
              <td class="p-2">{{ index + 1 }}</td>
              <td class="p-2">{{ exam.sequence }}</td>
              <td class="p-2">{{ exam.name }}</td>
              <td class="p-2">{{ exam.level }}</td>
            </tr>
          </tbody>  
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const exams = ref([]);

// Computed property to get the top 4 users based on the number of completed exams (result length)
const topUsers = computed(() => {
  return users.value
    .sort((a, b) => (b.result?.length || 0) - (a.result?.length || 0)) // Sort by result length in descending order
    .slice(0, 4); // Take the top 4 users
});

onMounted(() => {
  // Fetch users from external API
  axios.get('http://localhost:8080/userList')
    .then(response => {
      users.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });

  // Fetch exams from external API
  axios.get('http://localhost:8080/examList')
    .then(response => {
      const examData = response.data.map((exam) => ({
        name: exam.name,
        level: exam.level,
        sequence: exam.sequence,
      }));

      // Sort exams by sequence (descending order) and take top 4
      exams.value = examData.sort((a, b) => b.sequence - a.sequence).slice(0, 4);
    })
    .catch(error => {
      console.error('Error fetching exam data:', error);
    });
});
</script>

<style scoped>

</style>
