<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Header from '../../components/user/Header.vue';
import Footer from '../../components/user/Footer.vue';

interface Account {
  id: number;
  nameAccount: string;
  email: string;
  address: string;
  phone: string;
  img: string;
  password: string;
  status: number;
}

interface Exam {
  id: string;
  idSubject: number;
  level: number;
  name: string;
  image: string;
  sequence: number;
  describe: string;
}

interface Answer {
  questionId: string;
  selectedAnswer: string | null;
  isCorrect: boolean;
}

interface ExamHistory {
  id: number;
  idExam: string;
  idUser: string;
  score: number;
  time: string;
  date: string;
  answers: Answer[];
}

const yourProfile = ref<Account | null>(null);
const examHistory = ref<ExamHistory[]>([]);
const examList = ref<Exam[]>([]);
const currentPage = ref(1);
const itemsPerPage = 5
const sortOption = ref({ type: 'date', order: 'asc' });
const userLogin = JSON.parse(localStorage.getItem('keyLogin') || '{}');

onMounted(async () => {
  if (userLogin) {
    try {
      yourProfile.value = userLogin;
      const historyResponse = await axios.get(`http://localhost:8080/userAnswer?userId=${userLogin.id}`);
      examHistory.value = historyResponse.data;

      const examResponse = await axios.get<Exam[]>('http://localhost:8080/examList');
      examList.value = examResponse.data;
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }
});

// Sort and filter history items
const sortedHistory = computed(() => {
  return [...examHistory.value].sort((a, b) => {
    if (sortOption.value.type === 'date') {
      return sortOption.value.order === 'asc' ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOption.value.type === 'score') {
      return sortOption.value.order === 'asc' ? a.score - b.score : b.score - a.score;
    }
    return 0;
  });
});

// Paginated items
const currentItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedHistory.value.slice(start, end).filter((history) => history.idUser === userLogin.id);
});

// Pagination control
const pageNumbers = computed(() => {
  return Array.from({ length: Math.ceil(sortedHistory.value.length / itemsPerPage) }, (_, i) => i + 1);
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Header />
    <br><br><br><br><br>
    <main class="flex-grow">
      <div class="py-16 px-8 max-w-5xl mx-auto">
        <div class="flex space-x-8 mb-10">
          <router-link to="/profile">
            <div class="px-4 py-2 bg-gray-200 rounded font-semibold text-center text-gray-800 cursor-pointer hover:bg-gray-300">Thông tin cá nhân</div>
          </router-link>
          <router-link to="/history">
            <div class="px-4 py-2 bg-gray-200 rounded font-semibold text-center text-gray-800 cursor-pointer hover:bg-gray-300">Lịch sử làm bài</div>
          </router-link>
        </div>
        <div class="bg-white shadow rounded-lg p-6">
          <h1 class="text-2xl font-bold text-gray-800 mb-6">Lịch sử làm bài</h1>
          <p v-if="currentItems.length === 0" class="text-gray-500">Không có lịch sử làm bài.</p>
          <div v-else>
            <table class="w-full text-left border-collapse mb-4">
              <thead>
                <tr class="bg-gray-100 text-gray-700">
                  <th>STT</th>
                  <th class="py-3 px-4 border">Mã đề</th>
                  <th class="py-3 px-4 border">Tên đề</th>
                  <th class="py-3 px-4 border">Điểm</th>
                  <th class="py-3 px-4 border">Thời gian</th>
                  <th class="py-3 px-4 border">Ngày làm</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(history, index) in currentItems" :key="history.id" class="hover:bg-gray-50">
                  <td>{{index + 1}}</td>
                  <td class="py-2 px-4 border">{{ history.idExam }}</td>
                  <td class="py-2 px-4 border">
                    <router-link :to="`/result/${history.id}`" class="text-blue-500 hover:underline">{{ examList.find((e) => e.id === history.idExam)?.name || 'Loading...' }}</router-link>
                  </td>
                  <td class="py-2 px-4 border">{{ history.score }}</td>
                  <td class="py-2 px-4 border">{{ history.time }}</td>
                  <td class="py-2 px-4 border">{{ history.date }}</td>
                </tr>
              </tbody>
            </table>
            <div class="flex justify-center space-x-2">
              <button
                v-for="number in pageNumbers"
                :key="number"
                @click="currentPage = number"
                :class="['px-3 py-1 rounded-md', number === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white']"
              >
                {{ number }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>
