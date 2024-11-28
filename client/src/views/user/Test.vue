<template>
  <div v-if="login">
    <!-- Header Section -->
    <div class="header-exam">
      <div class="logo-header">
        <img
          src="https://static.vecteezy.com/system/resources/previews/009/182/690/original/thi-letter-logo-design-with-polygon-shape-thi-polygon-and-cube-shape-logo-design-thi-hexagon-logo-template-white-and-black-colors-thi-monogram-business-and-real-estate-logo-vector.jpg"
          alt="Logo"
        />
        <p>OnlineTest</p>
      </div>
      <div class="header-menu">
        <button @click="router.push(`/test/${idExam}`)" aria-label="Go back to test">
          <FontAwesomeIcon :icon="faSignOutAlt" />
        </button>
      </div>
    </div>

    <!-- Main Content Section -->
    <section class="main-menu">
      <!-- Left Menu Section -->
      <div class="menu-left">
        <div class="avt">
          <img :src="user.img" alt="User Avatar" />
          <p>{{ user.nameAccount }}</p>
        </div>
        <div class="time">
          <FontAwesomeIcon :icon="faClock" />
          <div id="countdown">{{ formatTime(countdown) }}</div>
        </div>
      </div>

      <!-- Middle Menu Section -->
      <div class="menu-mid">
        <div class="question">
          <h1>{{ `Câu ${currentQuestionIndex + 1}:` }}</h1>
          <span>{{ shuffledQuestions[currentQuestionIndex]?.questionName }}</span>
        </div>
        <form class="answer">
          <div
            v-for="(answer, idx) in shuffledQuestions[currentQuestionIndex]?.answerList"
            :key="idx"
            class="answer1"
          >
            <input
              type="radio"
              :checked="userAnswers[currentQuestionIndex] === idx.toString()"
              @change="handleAnswerChange(currentQuestionIndex, idx)"
              aria-label="Select answer"
            />
            <p>{{ answer.answer }}</p>
          </div>
        </form>
        <div class="button-menu">
          <button 
            @click="currentQuestionIndex = Math.max(0, currentQuestionIndex - 1)" 
            aria-label="Previous question">
            Câu trước
          </button>
          <button 
            @click="currentQuestionIndex = Math.min(shuffledQuestions.length - 1, currentQuestionIndex + 1)" 
            aria-label="Next question">
            Câu sau
          </button>
        </div>
      </div>

      <!-- Right Menu Section -->
      <div class="menu-right">
        <button
          v-for="(question, idx) in shuffledQuestions"
          :key="idx"
          :class="['c', userAnswers[idx] !== undefined ? 'answered' : '', currentQuestionIndex === idx ? 'current' : '']"
          @click="currentQuestionIndex = idx"
          aria-label="Go to question">
          {{ idx + 1 }}
        </button>
        <button class="submit-menu" @click="handleSubmit" aria-label="Submit answers">Nộp bài</button>
      </div>
    </section>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// State setup
const login = ref(false);
const user = ref<any>(null);
const yourProfile = ref<any>(null);
const shuffledQuestions = ref<any[]>([]);
const currentQuestionIndex = ref(0);
const userAnswers = ref<string[]>([]);
const countdown = ref(1200);
const isLoading = ref(true);
const router = useRouter();
const route = useRoute();
const idExam = route.params.id as string;

const fetchUser = async () => {
  const userLogin = localStorage.getItem('keyLogin');
  if (userLogin) {
    user.value = JSON.parse(userLogin);
    login.value = true;
    yourProfile.value = userLogin;
  } else {
    login.value = false;
    Swal.fire({
      title: "Bạn chưa đăng nhập!",
      text: "Vui lòng thực hiện đăng nhập",
      icon: "error",
    }).then(() => {
      router.push("/signInUser");
    });
  }
};

const fetchQuestions = async () => {
  try {
    const response = await axios.get("http://localhost:8080/question");
    const questions = response.data.filter((question: any) => question.idExam == idExam);
    const shuffled = shuffleArray(questions);
    shuffledQuestions.value = shuffled;
  } catch (error) {
    console.error("Error fetching questions:", error);
  } finally {
    isLoading.value = false; 
  }
};

// Shuffle question array
const shuffleArray = (array: any[]) => {
  return array.map((q) => ({
    ...q,
    answerList: q.answerList.sort(() => Math.random() - 0.5),
  })).sort(() => Math.random() - 0.5);
};

const handleAnswerChange = (index: number, answerIndex: number) => {
  userAnswers.value[index] = answerIndex.toString();
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers.value));
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

// Countdown timer
watch(countdown, (newCountdown) => {
  if (newCountdown === 0) handleSubmit();
});
const startCountdown = () => {
  const intervalId = setInterval(() => {
    if (countdown.value > 0) countdown.value--;
    else clearInterval(intervalId); // Clear interval when countdown reaches 0
  }, 1000);
};

// Submit answers
const handleSubmit = async () => {
  Swal.fire({
    title: "Bạn có chắc chắn nộp bài không?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let score = 0;
      const totalQuestions = shuffledQuestions.value.length;
      const correctAnswersCount = shuffledQuestions.value.reduce((count, question, index) => {
        if (userAnswers.value[index] && question.answerList[userAnswers.value[index]].status === 1) {
          return count + 1;
        }
        return count;
      }, 0);

      score = (correctAnswersCount / totalQuestions) * 10;
      const formattedTime = formatTime(1200 - countdown.value);
      const examResult = {
        id: Math.floor(Math.random() * 10000),
        idExam: +idExam,
        idUser: user.value.id,
        score,
        time: formattedTime,
        date: new Date().toLocaleString(),
        answers: shuffledQuestions.value.map((question, index) => ({
          questionId: question.id,
          selectedAnswer: userAnswers.value[index] ?? null,
          isCorrect: userAnswers.value[index] !== undefined && question.answerList[userAnswers.value[index]].status === 1,
        })),
      };
      try {
        await axios.post("http://localhost:8080/userAnswer", examResult);
        const updatedUser = {
          ...user.value,
          result: [...user.value.result, {
            idTest: +idExam,
            score,
            time: formattedTime,
            date: new Date().toLocaleString(),
          }],
        };
        await axios.patch(`http://localhost:8080/userList/${user.value.id}`, updatedUser);
        localStorage.setItem("keyLogin", JSON.stringify(updatedUser))
        Swal.fire({
          title: "Nộp bài thành công!",
          text: `Điểm của bạn là ${score.toFixed(2)}. Thời gian làm bài: ${formattedTime}`,
          icon: "success",
        });
        router.push(`/result/${examResult.id}`);
      } catch (error) {
        console.error("Error submitting exam:", error);
        Swal.fire({
          title: "Có lỗi xảy ra!",
          text: "Không thể nộp bài. Vui lòng thử lại.",
          icon: "error",
        });
      }
    }
  });
};

onMounted(() => {
  fetchUser();
  fetchQuestions();
  startCountdown();
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
body {
  background-color: #ffc85b28;
}
/* header */
.header-exam {
  width: 100%;
  height: 100px;
  display: flex;
  background-color: #fdb44b;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  border-radius: 10px;
}

.logo-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-header img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.logo-header p {
  font-size: 40px;
  font-weight: 600;
}

.main-menu {
  width: 100%;
  height: 87vh;
  background-color: #ffc85b28;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 60px;
}

.menu-left {
  width: 300px;
  height: 200px;
  background-color: white;
  border-radius: 20px;
}

.menu-mid {
  width: 620px;
  height: 600px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}

.menu-right {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: max-content;
  gap: 18px;
  background-color: white;
  border-radius: 20px;
  background-color: white;
  padding: 10px;
}

.c {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(193, 202, 209);
  border: aliceblue;
  color: beige;
}

.c:hover {
  background-color: grey;
}

.submit-menu {
  width: 100px;
  background-color: rgb(36, 250, 104);
  border: rgb(36, 250, 104);
  border-radius: 10px;
  margin-top: 40px;
  padding: 10px;
  grid-column: 1/6;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.238);
}
.submit-menu a {
  color: white !important;
}

.submit-menu:hover {
  background-color: rgb(0, 200, 140);
  margin-bottom: 10px;
  margin-left: 10px;
}

.avt {
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.avt img {
  border: 10px solid #ffc85b28;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.avt p {
  font-size: 22px;
  font-weight: 600;
}

.question {
  font-size: 20px;
  background-color: #ffc85b28;
  border-radius: 8px;
  margin: 8px;
  padding: 20px;
}

.answer {
  display: flex;
  flex-direction: column;
  font-size: 20px;
}

.answer {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
}

.answer1 {
  display: flex;
  align-items: center;
  gap: 30px;
}

.answer1 input {
  width: 30px;
  height: 30px;
}

.button-menu {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  align-items: end;
}

.button-menu button {
  border-radius: 10px;
  background-color: #ffc93c;
  color: white;
  border: #f96d00;
  margin-top: 70px;
  padding: 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.238);
}

.button-menu button:hover {
  margin: 0px 0px 4px 4px;
  background-color: #ff9a3c;
}

#countdown {
  font-size: 50px;
  font-weight: bold;
  color: orange;
}

.time {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.c {
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 5px;
    cursor: pointer;
    color: #f96d00;
  }
  
  .c.answered {
    background-color: #28a745;
    color: white;
  }
  
  .c.current {
    background-color: #007bff;
    color: white;
  }
  
  .c:hover {
    background-color: #ddd;
  }
</style>
