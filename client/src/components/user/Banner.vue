<template>
    <div>
      <div class="baner">
        <div class="baner-left">
          <img
            src="https://img6.thuthuatphanmem.vn/uploads/2022/04/29/anh-dep-nhat-ve-sach_094223992.jpg"
            alt=""
          />
        </div>
        <div class="baner-mid-main">
          <div class="baner-mid">
            <h1 class="baner-mid-5">Công cụ ôn thi</h1>
            <div class="baner-mid-1">Trắc Nghiệm hiệu quả</div>
            <div class="baner-mid-2">
              <p>Thông qua các bài thi trắc nghiệm,</p>
              <p>công cụ sẽ giúp bạn học tập, ôn thi hiệu quả hơn, đạt điểm</p>
              <p>cao hơn.</p>
            </div>
            <div class="baner-mid-4">
              <router-link to="/subject/1">
                <button class="baner-mid-3">Thi Ngay</button>
              </router-link>
              <div class="baner-bottom"></div>
            </div>
          </div>
          <div class="baner-bottom">
            <div class="baner-bottom1">
              <p>10M+</p>
              <p>Lượt truy cập</p>
            </div>
            <div class="baner-bottom1">
              <p>10K+</p>
              <p>Đề thi</p>
            </div>
            <div class="baner-bottom1">
              <p>100M+</p>
              <p>Lượt thi</p>
            </div>
          </div>
        </div>
        <div class="baner-right">
          <img
            src="https://kenh14cdn.com/2017/img-0191-1500372920465.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>

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
* {
  box-sizing: border-box;
}

.container1 {
  width: 500px;
  margin: auto;
}

#myInput {
  background-repeat: no-repeat;

  width: 500px;
  font-size: 16px;
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  height: 40px;
  border-radius: 6px;
  outline: transparent;
}

#myUL {
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-width: 600px;
  max-height: 200px;
  overflow-y: auto;
  display: none;
  margin-top: -10px;
  border-radius: 6px;
}

#myUL li a {
  border: 1px solid #ddd;
  background-color: #f6f6f6;
  padding: 12px;
  text-decoration: none;
  font-size: 14px;
  color: black;
  display: block;
  gap: 20px;
}

#myUL li a.header {
  background-color: #e2e2e2;
  cursor: default;
}

#myUL li a:hover:not(.header) {
  background-color: #eee;
}

a {
  text-decoration: none;
}

.header {
  background-color: #fdb44b;
  width: 100%;
  height: 110px;
  display: flex;
  text-align: center;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.ipad-header-top {
  display: flex;
  gap: 10px;
}

.header-left {
  padding-top: 16px;
  width: 250px;
  height: 78px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.header-left p {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: 600;
}

.header-mid {
  width: max-content;
  height: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#header-seach {
  width: 500px;
  height: 40px;
  position: relative;
  padding: 10px;
  border-radius: 8px;
  border: white;
}

.icon-seach {
  width: 50px;
  height: 34px;
  position: absolute;
  margin-left: -56px;
  margin-top: 2px;
  border-radius: 5px;
  border: white;
  background-color: #fdb44b;
}

.header-right {
  width: 900px;
  height: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.header-nav {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  font-weight: 600;
}

.nav-item {
  font-size: 20px;
  color: black;
}

.nav-item:hover {
  color: #f5f5f5;
}

.header .dangnhap {
  width: 150px;
  height: 50px;
  border-radius: 30px;
  background-color: black;
  border: transparent;
  box-shadow: rgba(40, 40, 71, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  color: #f5f5f5;
}

.header .dangnhap:hover {
  background-color: #f8e796;
}

/* body */

.subject-category {
  padding: 0 154px;
  margin: 54px 0;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.title-category {
  margin: 10px 0;
  border-bottom: 4px solid #f5f5f5;
}

.title-sebject {
  display: flex;
}

.subject-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.subject-item {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.card-img-top {}

/* ------------------------------- banner*/
.attend-exam .attend-banner {}

/* attend--------------------------- */
.attend-exam {
  padding: 0 154px;
  margin: 24px 0;
}

.card {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

#sequence {
  color: red;
}

.attend-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

/* footer----------------------- */
.footer {
  padding: 60px 154px 60px 154px;
  background-color: #fdb44b;
  font-family: Arial, Helvetica, sans-serif;
}

.footer .footer-content {
  display: flex;
  gap: 100px;
  margin-bottom: 60px;
}

.footer .footer-content .footer-left {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.footer-content .footer-left p {
  color: black;
}

.footer-content .footer-left .footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: black;
}

.footer-content .footer-left .flogo-list {
  margin-top: -20px;
  font-size: 40px;
  display: flex;
  gap: 10px;
  color: black;
}

.footer-content .footer-right {
  width: 50%;
}

.footer-right .ftable {
  width: 100%;
}

.ftable .ftable-items .ftable-item {
  padding: 20px;
  text-align: center;
  color: black;
}

.ftable .ftable-items {
  color: black;
}

.footer .end {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
}

/* baner */
.baner {
  width: 100%;
  height: 690px;
  border-radius: 10px;
  background-image: url(https://thanglongedu.vn/public/upload/online.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 40px;
}

.baner-left {
  width: 300px;
  height: 700px;
}

.baner-left img {
  width: 250px;
  height: 400px;
  border-radius: 100px;
  margin-top: -20px;
}

.baner-mid-main {
  width: 600px;
  height: 650px;
  margin-top: 50px;
}

.baner-bottom {
  width: 600px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  color: rgb(235, 95, 1);
}

.baner-bottom1 {
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: -10px;
}

.baner-bottom1 p:first-child {
  font-size: 40px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.baner-bottom1 p:last-child {
  font-size: 20px;
  font-weight: 400;
  color: #050505;
}

.baner-mid {
  width: 620px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  justify-content: space-between;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  /* Thay đổi độ mờ ở đây */
  border-radius: 20px;
  margin-top: -20px;
}

@keyframes change1 {
  0% {
    margin-top: 10px;
  }

  25% {
    margin-top: 20px;
  }

  50% {
    margin-top: 30px;
  }

  75% {
    margin-top: 40px;
  }

  100% {
    margin-top: 10px;
  }
}

.baner-left {
  width: 300px;
  height: 700px;
}

.baner-left img {
  width: 250px;
  height: 400px;
  border-radius: 100px;
  animation-name: change1;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  margin-top: 20px;
  margin-left: 30px;
}

.baner-right {
  width: 300px;
  height: 700px;
}

@keyframes change2 {
  0% {
    margin-top: 250px;
  }

  25% {
    margin-top: 240px;
  }

  50% {
    margin-top: 230px;
  }

  75% {
    margin-top: 220px;
  }

  100% {
    margin-top: 250px;
  }
}

.baner-right img {
  width: 250px;
  height: 400px;
  border-radius: 100px;
  margin-top: 250px;
  animation-name: change2;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

.baner-mid-1 {
  width: 500px;
  height: 70px;
  background-color: rgb(252, 186, 44);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 600;
  border-radius: 10px;
}

.baner-mid-2 {
  width: 550px;
  height: 100px;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgb(0, 3, 0);
}

@keyframes example {
  0% {
    width: 200px;
    height: 60px;
    font-size: 20px;
  }

  50% {
    width: 220px;
    height: 70px;
    font-size: 23px;
  }

  100% {
    width: 200px;
    height: 60px;
    font-size: 20px;
  }
}

.baner-mid-5 {
  color: black;
  font-weight: 700;
  font-size: 60px;
}

.baner-mid-4 {
  width: 800px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 600px;
}

.baner-mid-3 {
  width: 200px;
  height: 60px;
  font-size: 20px;
  background-color: rgb(250, 168, 14);
  color: white;
  border-radius: 40px;
  border: rgb(51, 51, 253);
  animation-name: example;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

/* chat */
.chat {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  position: fixed;
  bottom: 0;
  right: 0;
  gap: 30px;
}

.chat .right-chat button {
  font-size: 30px;
  width: 42px;
  height: 42px;
  border: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
}

.chat .left-chat {
  width: 350px;
  background-color: red;
}

.chat .left-chat h2 {
  text-align: center;
  background-color: gold;
}

.chat .left-chat input {
  width: 100%;
}

.chat-content .recei-container .mess-recei {
  width: 70%;
  height: max-content;
  float: left;
  background-color: aqua;
}

.chat-content .recei-container {
  width: 100%;
  height: max-content;
}

.chat-content .send-container .mess-send {
  width: 70%;
  height: max-content;
  float: right;
  background-color: aqua;
}

.chat-content .send-container {
  width: 100%;
  height: max-content;
}

.chat .input-send {
  display: flex;
}

.chat .chat-content {
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media screen and (max-width: 1024px) {

  /* header */
  .container1 {
    width: 40%;
    margin: 0 !important;
  }

  #myInput {
    background-repeat: no-repeat;
    width: 100%;
    font-size: 16px;
    padding: 14px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
    height: 40px;
    border-radius: 6px;
    outline: transparent;
  }

  #myUL {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 400px;
    max-height: 200px;
    overflow-y: auto;
    display: none;
    margin-top: -10px;
    border-radius: 6px;
    position: absolute;
  }

  #myUL li a {
    border: 1px solid #ddd;
    background-color: #f6f6f6;
    padding: 12px;
    text-decoration: none;
    font-size: 14px;
    color: black;
    display: block;
    gap: 20px;
  }

  #myUL li a.header {
    background-color: #e2e2e2;
    cursor: default;
  }

  #myUL li a:hover:not(.header) {
    background-color: #eee;
  }

  a {
    text-decoration: none;
  }

  .header {
    background-color: #fdb44b;
    width: 100%;
    height: 110px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    position: fixed;
    top: 0;
    left: 0;
  }

  .ipad-header-top {
    display: flex;
  }

  .header-left {
    padding: 0;
    width: max-content;
    height: max-content;
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .header-left p {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 30px;
    font-weight: 600;
  }

  .icon-seach {
    width: 50px;
    height: 34px;
    position: absolute;
    margin-left: -56px;
    margin-top: 2px;
    border-radius: 5px;
    border: white;
    background-color: #fdb44b;
  }

  .header-right {
    margin-left: 260px;
    width: max-content;
    height: 78px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }

  .header-nav {
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }

  .nav-item {
    font-size: 20px;
    color: black;
  }

  .nav-item:hover {
    color: #f5f5f5;
  }

  .header .dangnhap {
    width: 150px;
    height: 50px;
    border-radius: 30px;
    background-color: black;
    border: transparent;
    box-shadow: rgba(40, 40, 71, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    color: #f5f5f5;
  }

  .header .dangnhap:hover {
    background-color: #f8e796;
  }

  .header .dangxuat {
    width: max-content;
    position: relative;
    bottom: 40px;
  }

  /* body */

  .subject-category {
    padding: 0 50px;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  .title-category {
    border-bottom: 4px solid #f5f5f5;
    text-align: center;
  }

  .title-sebject {
    display: flex;
  }

  .subject-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .subject-item {
    width: 200px !important;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .subject-item h3 {
    font-size: medium;
  }

  .card-img-top {
    height: 140px;
  }

  /* ------------------------------- banner*/
  .slide img {
    height: 500px !important;
  }

  /* attend--------------------------- */
  .attend-exam {
    padding: 0 50px;
    margin: 24px 0;
  }

  .card {
    width: 200px !important;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  #sequence {
    color: red;
  }

  .attend-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .attend-list .card {
    display: flex;
    gap: 6px;
  }

  .attend-list .card h4,
  h5,
  span {
    font-size: medium;
  }

  .attend-list .card img {
    height: 140px !important;
  }

  /* footer----------------------- */
  .footer {
    padding: 0 50px;
    background-color: #fdb44b;
    font-family: Arial, Helvetica, sans-serif;
  }

  .footer .footer-content {
    display: flex;
    gap: 100px;
    margin-bottom: 60px;
  }

  .footer .footer-content .footer-left {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .footer-content .footer-left p {
    color: black;
  }

  .footer-content .footer-left .footer-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    color: black;
  }

  .footer-content .footer-left .flogo-list {
    margin-top: -20px;
    font-size: 40px;
    display: flex;
    gap: 10px;
    color: black;
  }

  .footer-content .footer-right {
    width: 50%;
  }

  .footer-right .ftable {
    width: 100%;
  }

  .ftable .ftable-items .ftable-item {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: center;
    padding: 20px;
    text-align: center;
    color: black;
    
  }

  .ftable .ftable-items {
    color: black;
  }

  .footer .end {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  /* baner */
  .baner {
    width: 100%;
    height: 400px;
    border-radius: 10px;
    background-image: url(https://thanglongedu.vn/public/upload/online.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-top: 40px;
  }

  .baner-left {
    width: 300px;
    height: 700px;
  }

  .baner-left img {
    display: none;
  }

  .baner-mid-main {
    width: 600px;
    height: 650px;
    margin-top: 50px;
  }

  .baner-bottom {
    width: 600px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    color: rgb(235, 95, 1);
  }

  .baner-bottom1 {
    display: none;
  }

  .baner-bottom1 p:first-child {
    font-size: 40px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  .baner-bottom1 p:last-child {
    font-size: 20px;
    font-weight: 400;
    color: #050505;
  }

  .baner-mid {
    width: 620px;
    height: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    justify-content: space-between;
    gap: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    /* Thay đổi độ mờ ở đây */
    border-radius: 20px;
    position: relative;
    top: 150px;
  }

  @keyframes change1 {
    0% {
      margin-top: 10px;
    }

    25% {
      margin-top: 20px;
    }

    50% {
      margin-top: 30px;
    }

    75% {
      margin-top: 40px;
    }

    100% {
      margin-top: 10px;
    }
  }

  .baner-left {
    width: 300px;
    height: 700px;
  }

  .baner-left img {
    width: 250px;
    height: 400px;
    border-radius: 100px;
    animation-name: change1;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    margin-top: 20px;
    margin-left: 30px;
  }

  .baner-right {
    width: 300px;
    height: 700px;
  }

  @keyframes change2 {
    0% {
      margin-top: 250px;
    }

    25% {
      margin-top: 240px;
    }

    50% {
      margin-top: 230px;
    }

    75% {
      margin-top: 220px;
    }

    100% {
      margin-top: 250px;
    }
  }

  .baner-right img {
    display: none;
  }

  .baner-mid-1 {
    width: 500px;
    height: 70px;
    background-color: rgb(252, 186, 44);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    font-weight: 600;
    border-radius: 10px;
  }

  .baner-mid-2 {
    display: none;
  }

  @keyframes example {
    0% {
      width: 200px;
      height: 60px;
      font-size: 20px;
    }

    50% {
      width: 220px;
      height: 70px;
      font-size: 23px;
    }

    100% {
      width: 200px;
      height: 60px;
      font-size: 20px;
    }
  }

  .baner-mid-5 {
    color: black;
    font-weight: 700;
    font-size: 60px;
  }

  .baner-mid-4 {
    width: 800px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 600px;
  }

  .baner-mid-3 {
    width: 200px;
    height: 60px;
    font-size: 20px;
    background-color: rgb(250, 168, 14);
    color: white;
    border-radius: 40px;
    border: rgb(51, 51, 253);
    animation-name: example;
    animation-duration: 3s;
    animation-iteration-count: infinite;
  }
}

.user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 12px;

  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}

/* Styling for the user info container */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 17px;
  font-weight: 500;

}

/* Styling for the logout button */
.logout-btn {
  padding: 8px 16px;
  border-radius: 25px;
  border: 0;
  background-color: #f8e796;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.logout-btn:hover {
  background-color: #ebcd28;
  transform: translateY(-2px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
}

.btnlogin{
  display: flex;
  width: 300px;
  gap: 20px;
  font-size: 32px;
  font-weight: 500;
  color: #2c2b2b;
  justify-content: end;
}


.container1 {
  width: 500px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
}

.search-input {
  width: 100%;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 6px;
  outline: none;
}

.myUL {
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 6px;
}

.search-results {
  border: 1px solid #ddd;
  background-color: #f6f6f6;
  padding: 12px;
  margin-bottom: 4px;
  text-decoration: none;
  font-size: 14px;
  color: black;
  display: block;
}

.search-results:hover {
  background-color: #eee;
}

.search-results a {
  text-decoration: none;
  color: inherit;
  display: block;
}

/* Định dạng chung cho phần container của đề thi */
.attend-exam {
  padding: 40px 0;
  background-color: #f9f9f9;
}

.attend-exam h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 40px;
  color: #333;
}

/* Định dạng danh sách đề thi */
.attend-list {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

/* Định dạng từng thẻ card */
.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Định dạng hình ảnh */
.card img {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 100%;
  object-fit: cover;
}

/* Định dạng nội dung card */
.card-body {
  padding: 15px;
}

.card h4 {
  font-size: 1.25rem;
  color: #e04350;
  margin-bottom: 10px;
}

.card h5 {
  font-size: 1rem;
  color: #28a745;
  margin-bottom: 8px;
}

#sequence {
  font-size: 0.9rem;
  color: #555;
  display: block;
  margin-top: 5px;
}

/* Responsive - Điều chỉnh layout cho màn hình nhỏ */
@media (max-width: 768px) {
  .attend-list {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 90%;
  }
}
/* Loại bỏ gạch chân cho tất cả các thẻ <a> */
a {
  text-decoration: none;
}

/* Đảm bảo các link trong thẻ card không bị gạch chân */
.attend-list a {
  text-decoration: none;
  color: inherit; /* Giữ nguyên màu sắc của thẻ cha */
}
.header-nav a {
  text-decoration: none;
  color: inherit; /* Giữ nguyên màu sắc của thẻ cha */
}
  </style>
  