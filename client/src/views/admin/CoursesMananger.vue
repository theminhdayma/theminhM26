<template>
  <div>
    <div class="container-content-admin">
      <section class="attendance" style="width: 80%;">
        <div class="attendance-list">
          <h1 class="manage-title">Quản lí khóa học</h1>
          <button @click="showFormAddCourse" class="addcourses">Thêm khóa học</button>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Khóa học</th>
                <th>Hình ảnh</th>
                <th>Mô tả</th>
                <th>Chi tiết</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(course, index) in paginatedCourses" :key="course.id">
                <td>{{ (currentPage - 1) * postsPerPage + index + 1 }}</td>
                <td>{{ course.title }}</td>
                <td>
                  <img class="w-[100px] h-[100px]" :src="course.img" alt="Course Image" />
                </td>
                <td>{{ course.description }}</td>
                <td>
                  <router-link class="button" :to="`/admin/subjectManager/${course.id}`">Chi tiết</router-link>
                </td>
                <td>
                  <button @click="editCourse(course)">Sửa</button>
                  <button @click="deleteCourses(course.id)">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Phân trang -->
          <div class="w-full p-3 flex justify-end items-center gap-2 mt-4">
            <select
              class="border border-gray-800 p-2 bg-gray-700 text-white"
              v-model="postsPerPage"
            >
              <option value="2">2 bản ghi</option>
              <option value="3">3 bản ghi</option>
              <option value="4">4 bản ghi</option>
              <option value="5">5 bản ghi</option>
            </select>
            <!-- Page Numbers -->
            <div class="flex gap-2">
              <button
                v-for="number in totalPages"
                :key="number"
                class="border border-gray-950 p-1"
                :class="{ 'bg-gray-200 text-black': currentPage === number }"
                @click="paginate(number)"
              >
                {{ number }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref as firebaseRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref, onMounted, computed } from 'vue';
import Swal from "sweetalert2";
import axios from 'axios';
import { storage } from "../../config/firebse";

const courses = ref([]); // Danh sách khóa học
const selectedCourse = ref(null); // Khóa học đang được chỉnh sửa
const currentPage = ref(1); // Trang hiện tại
const postsPerPage = ref(2); // Số bản ghi trên mỗi trang

// Hàm lấy danh sách khóa học từ API
const fetchCourses = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/courses?page=${currentPage.value}&limit=${postsPerPage.value}`);
    courses.value = response.data; // Cập nhật danh sách khóa học
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

// Hàm phân trang
const totalPages = computed(() => Math.ceil(courses.value.length / postsPerPage.value));
const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage.value;
  return courses.value.slice(start, start + postsPerPage.value);
});

onMounted(() => {
  fetchCourses(); // Gọi hàm khi component được gắn
});

// Hàm chuyển trang
const paginate = (pageNumber) => {
  currentPage.value = pageNumber;
  fetchCourses(); // Gọi lại API khi chuyển trang
};

// Hàm thêm khóa học
const addCourse = async (courseData) => {
  try {
    const response = await axios.post('http://localhost:8080/courses', courseData);
    courses.value.push(response.data); // Thêm khóa học mới vào danh sách
    Swal.fire("Thêm thành công!", "Khóa học đã được thêm.", "success");
  } catch (error) {
    Swal.fire("Lỗi!", "Không thể thêm khóa học. Vui lòng thử lại.", "error");
    console.error("Error adding course:", error);
  }
};

// Hàm cập nhật khóa học
const updateCourse = async (courseData) => {
  try {
    await axios.put(`http://localhost:8080/courses/${selectedCourse.value.id}`, courseData);
    const index = courses.value.findIndex(course => course.id === selectedCourse.value.id);
    if (index !== -1) {
      courses.value[index] = { ...courses.value[index], ...courseData }; // Cập nhật khóa học trong danh sách
    }
    Swal.fire("Cập nhật thành công!", "Khóa học đã được cập nhật.", "success");
  } catch (error) {
    Swal.fire("Lỗi!", "Không thể cập nhật khóa học. Vui lòng thử lại.", "error");
    console.error("Error updating course:", error);
  }
};

// Hàm xóa khóa học
const deleteCourses = async (id) => {
  const result = await Swal.fire({
    title: "Bạn có chắc chắn muốn xóa?",
    text: "Điều này sẽ xóa tất cả các môn học liên quan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:8080/courses/${id}`);
      courses.value = courses.value.filter(course => course.id !== id); // Xóa khóa học khỏi danh sách
      Swal.fire("Xóa thành công!", "Khóa học đã được xóa.", "success");
    } catch (error) {
      Swal.fire("Lỗi!", "Không thể xóa khóa học. Vui lòng thử lại.", "error");
      console.error("Error deleting course:", error);
    }
  }
};

// Hàm hiển thị form thêm khóa học
const showFormAddCourse = () => {
  Swal.fire({
    title: "Thêm khóa học",
    html: `
      <input id="swal-input1" class="swal2-input" placeholder="Tên khóa học">
      <textarea id="swal-input2" class="swal2-textarea" placeholder="Mô tả"></textarea>
      <input type="file" id="swal-input3" class="swal2-file">
    `,
    focusConfirm: false,
    preConfirm: async () => {
      const title = (document.getElementById("swal-input1") as HTMLInputElement).value;
      const description = (document.getElementById("swal-input2") as HTMLTextAreaElement).value;
      const fileInput = document.getElementById("swal-input3") as HTMLInputElement;
      const file = fileInput.files ? fileInput.files[0] : null;

      if (!title || !description) {
        Swal.showValidationMessage("Vui lòng nhập đủ thông tin");
        return false;
      }

      let img = "";
      if (file) {
        // Tạo tham chiếu đến tệp trong Firebase Storage
        const storageRef = firebaseRef(storage, `courses/${file.name}`);
        try {
          // Tải tệp lên Firebase Storage
          await uploadBytes(storageRef, file);
          // Lấy URL tải xuống từ Firebase Storage
          img = await getDownloadURL(storageRef);
        } catch (error) {
          Swal.showValidationMessage("Không thể tải lên ảnh");
          return false;
        }
      }

      return { title, description, img };
    },
    confirmButtonText: "Thêm",
  }).then((result) => {
    if (result.isConfirmed) {
      const courseData = {
        title: result.value.title,
        description: result.value.description,
        img: result.value.img,
      };
      addCourse(courseData);
    }
  });
};


// Hàm hiển thị form chỉnh sửa khóa học
const editCourse = (course) => {
  selectedCourse.value = course;
  Swal.fire({
    title: "Sửa khóa học",
    html: `
      <input id="swal-input1" class="swal2-input" value="${course.title}" placeholder="Tên khóa học">
      <textarea id="swal-input2" class="swal2-textarea" placeholder="Mô tả">${course.description}</textarea>
      <input type="file" id="swal-input3" class="swal2-file">
    `,
    focusConfirm: false,
    preConfirm: async () => {
      const title = (document.getElementById("swal-input1") as HTMLInputElement).value;
      const description = (document.getElementById("swal-input2") as HTMLTextAreaElement).value;
      const fileInput = document.getElementById("swal-input3") as HTMLInputElement;
      const file = fileInput.files ? fileInput.files[0] : null;

      if (!title || !description) {
        Swal.showValidationMessage("Vui lòng nhập đủ thông tin");
        return false;
      }

      let img = course.img;
      if (file) {
        const storageRef = firebaseRef(storage, `courses/${file.name}`);
        try {
          await uploadBytes(storageRef, file);
          img = await getDownloadURL(storageRef);
        } catch (error) {
          Swal.showValidationMessage("Không thể tải lên ảnh");
          return false;
        }
      }

      return { title, description, img };
    },
    confirmButtonText: "Cập nhật",
  }).then((result) => {
    if (result.isConfirmed) {
      const courseData = {
        title: result.value.title,
        description: result.value.description,
        img: result.value.img,
      };
      updateCourse(courseData);
    }
  });
};
</script>

<style scoped>
.container-content-admin {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.attendance {
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.manage-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.addcourses {
  background-color: #4CAF50; /* Màu xanh lá cây */
  color: white;
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.addcourses:hover {
  background-color: #45a049; /* Màu xanh lá cây đậm hơn khi hover */
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2; /* Màu nền cho tiêu đề bảng */
  color: #333;
}

.table tr:nth-child(even) {
  background-color: #f9f9f9; /* Màu nền cho các dòng chẵn */
}

.table tr:hover {
  background-color: #f1f1f1; /* Màu nền khi hover lên dòng */
}

.table button {
  background-color: #007bff; /* Màu xanh dương cho nút */
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.table .button {
  background-color: #007bff; /* Màu xanh dương cho nút */
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.table button:hover {
  background-color: #0056b3; /* Màu xanh dương đậm hơn khi hover */
}

.table button:last-child {
  background-color: #dc3545; /* Màu đỏ cho nút xóa */
}

.table button:last-child:hover {
  background-color: #c82333; /* Màu đỏ đậm hơn khi hover */
}

</style>
