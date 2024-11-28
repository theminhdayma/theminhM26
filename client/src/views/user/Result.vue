<template>
  <div>
    <Header />
    <section class="flex px-10 justify-between mt-24">
      <div class="max-w-full mt-24 w-full" v-if="exam && result">
        <div class="flex gap-5 items-center mb-6">
          <img :src="exam.image" alt="Exam Image" class="h-[80px] w-[80px] rounded-lg" />
          <h1 class="text-2xl font-bold">{{ exam.name }}</h1>
        </div>
        <p class="text-xl text-gray-600">Điểm: <span class="text-red-600">{{ result.score }}</span></p>
        <p class="text-xl text-gray-600">Thời gian làm bài: <span class="text-red-600">{{ result.time }}</span></p>
        <p class="text-xl text-gray-600">Ngày làm bài: <span class="text-red-600">{{ result.date }}</span></p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </section>

    <div v-for="(question, index) in currentQuestions" :key="index" class="border border-gray-300 rounded-lg p-4 mb-4">
      <h3 class="text-lg font-semibold">{{ index + 1 }}. {{ question.questionName }}</h3>
      <div v-for="(answer, idx) in question.answerList" :key="idx" class="ml-4">
        <input type="radio" :name="'question_' + question.questionId" :value="answer.answer" 
               :disabled="true" 
               :checked="result?.answers[index]?.selectedAnswer === answer.answer" />
        <label :class="{ 'text-green-500': result?.answers[index]?.isCorrect && result?.answers[index]?.selectedAnswer === answer.answer,
                        'text-red-500': !result?.answers[index]?.isCorrect && result?.answers[index]?.selectedAnswer === answer.answer }">
          {{ answer.answer }}
        </label>
      </div>
      <div v-if="question.explanation" class="mt-2 text-gray-500">
        <strong>Giải thích:</strong> {{ question.explanation }}
      </div>
    </div>

    <div class="flex justify-center mt-4" v-if="currentQuestions.length">
      <Pagination :currentPage="currentPage" :totalItems="questions.length" :itemsPerPage="questionsPerPage" @paginate="paginate" />
    </div>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Header from "../../components/user/Header.vue";
import Footer from "../../components/user/Footer.vue"

interface UserAnswer {
  id: number;
  idExam: string;
  idUser: string;
  score: number;
  time: string;
  date: string;
  answers: {
    questionId: string;
    selectedAnswer: string | null;
    isCorrect: boolean;
  }[];
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
  answer: string;
  status: number; 
}

interface Question {
  questionId: string; 
  idExam: string; 
  questionName: string;
  answerList: Answer[];
  explanation?: string; 
}

const route = useRoute();
const idTest = +route.params.id;
const result = ref<UserAnswer | null>(null);
const exam = ref<Exam | null>(null);
const questions = ref<Question[]>([]);
const currentPage = ref<number>(1);
const questionsPerPage = 2;

const fetchResult = async () => {
  try {
    const response = await axios.get<UserAnswer[]>(`http://localhost:8080/userAnswer`);
    const resultData = response.data.find((r) => r.id === idTest);
    result.value = resultData || null;
  } catch (error) {
    console.error("Error fetching result:", error);
  }
};

const fetchExam = async () => {
  if (result.value) {
    try {
      const response = await axios.get<Exam[]>(`http://localhost:8080/examList`);
      const examData = response.data.find((e) => e.id === result.value.idExam);
      exam.value = examData || null;
    } catch (error) {
      console.error("Error fetching exam:", error);
    }
  }
};

const fetchQuestions = async () => {
  if (result.value) {
    try {
      const response = await axios.get<Question[]>(`http://localhost:8080/question`);
      const questionsData = response.data.filter((q) => q.idExam === result.value.idExam);
      questions.value = questionsData;
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }
};

const paginate = (pageNumber: number) => {
  currentPage.value = pageNumber;
};

onMounted(() => {
  fetchResult();
});

watch(result, fetchExam);
watch(result, fetchQuestions);

const indexOfLastQuestion = computed(() => currentPage.value * questionsPerPage);
const indexOfFirstQuestion = computed(() => indexOfLastQuestion.value - questionsPerPage);
const currentQuestions = computed(() => questions.value.slice(indexOfFirstQuestion.value, indexOfLastQuestion.value));

// if (!result.value || !exam.value || questions.value.length === 0) {
//   return <div>Loading...</div>;
// }
</script>
  
  <style scoped>

  </style>
  