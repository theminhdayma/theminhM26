<template>
  <div>
    <Header />
    <br /><br /><br /><br /><br /><br />
    <div class="container mx-auto text-center px-4">
      <h1 class="text-5xl font-semibold mb-6">Danh sách Khóa học</h1>

      <!-- Introduction Section -->
      <div class="mb-8">
        <p class="text-xl">
          Chào mừng bạn đến với danh sách các khóa học của chúng tôi. Chúng tôi cung cấp các khóa học luyện thi từ tiểu học đến trung học phổ thông để giúp bạn đạt được thành tích cao trong các kỳ thi.
        </p>
      </div>

      <!-- Courses Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="course in currentCourses"
          :key="course.id"
          class="course-card bg-white border border-gray-200 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105"
        >
          <router-link :to="`/subject/${course.id}`">
            <img :src="course.img" :alt="course.title" class="course-image w-full h-[400px] object-cover rounded-t-lg" />
            <h2 class="text-xl font-semibold p-4">{{ course.title }}</h2>
            <p class="p-4 text-gray-600">{{ course.description }}</p>
          </router-link>
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-8 flex justify-center space-x-2">
        <button
          @click="handlePreviousPage"
          :disabled="currentPage === 1"
          class="pagination-button bg-gray-200 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Previous
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="handlePageChange(page)"
          :class="{'bg-blue-500 text-white': currentPage === page, 'bg-gray-200': currentPage !== page}"
          class="pagination-button border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          {{ page }}
        </button>

        <button
          @click="handleNextPage"
          :disabled="currentPage === totalPages"
          class="pagination-button bg-gray-200 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
    <br>
    <BannerTeacherVue/>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Header from '../../components/user/Header.vue';
import Footer from '../../components/user/Footer.vue';
import BannerTeacherVue from '../../components/user/BannerTeacher.vue';
// Define the Course interface
interface Course {
  id: string;
  title: string;
  img: string;
  description: string;
}

// States for courses and pagination
const courses = ref<Course[]>([]);
const currentPage = ref(1);
const coursesPerPage = 3;

// Fetch courses data
const fetchCourses = async () => {
  try {
    const response = await axios.get('http://localhost:8080/courses');
    courses.value = response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

onMounted(fetchCourses);

// Computed properties for pagination
const totalPages = computed(() => Math.ceil(courses.value.length / coursesPerPage));
const currentCourses = computed(() => {
  const start = (currentPage.value - 1) * coursesPerPage;
  return courses.value.slice(start, start + coursesPerPage);
});

// Pagination handlers
const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const handlePreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
</script>

<style scoped>
.pagination-button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.pagination-button.active {
  background-color: #4299e1;
  color: #ffffff;
}
</style>
