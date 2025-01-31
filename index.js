const express = require("express"); //express 모듈 세팅
const ejs = require("ejs"); // 페이지 로딩을 위해 필수
const app = express();

//let local_data = window.localStorage.getItem("_data");

//view 엔진을 ejs를 쓰겠다는 설정
app.set("view engine", "ejs");
app.use(express.static("public"));
// 페이지 로딩 함수
app.get("/main", function (req, res) {
  res.render("main", {}); // views 폴더 밑에 있는 파일을 참조함
});

app.get("/manager", function (req, res) {
  //console.log(res)
  res.render("manager", {}); // views 폴더 밑에 있는 파일을 참조함
});

app.get("/submain", function (req, res) {
  //console.log(res)
  res.render("submain", {}); // views 폴더 밑에 있는 파일을 참조함
});
// 서버 띄울때 포트 정보 셋팅 및 처음 실행 시 필요한 기능 수행 가능
app.listen(3000, function () {
  console.log("server running");
});
