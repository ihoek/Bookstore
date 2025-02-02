//변수 선언 - input id
const id_input = document.getElementById("id_input");
const name_input = document.getElementById("name_input");
const price_input = document.getElementById("price_input");
const content_input = document.getElementById("content_input");

//error div
const error_id = document.getElementById("error_id");

//배열 선언 - localStorage
let data_map = [];
let id_arr = [];
let ls = window.localStorage.getItem("_data", data_map);

//버튼
const save_btn = document.getElementById("save");
let btn_active = [false, false, false];

//수정 삭제 버튼
const delete_btn = document.querySelector(".btnDel");
let modify_cnt = 0;

//img arr
const img_arr = [
  "./Img/a_forecast_of_the_times.jpg",
  "./Img/a_report_of_genius.jpg",
  "./Img/Contradiction.jpg",
  "./Img/don_t_say_goodbye.jpg",
  "./Img/Here_comes_the_boy.jpg",
  "./Img/strong_current.jpg",
  "./Img/the_art_of_mind.jpg",
  "./Img/Vegetarian.jpg",
  "./Img/White.jpg",
  "./Img/Your_Utopia.jpg",
  "./Img/Fish_don't_exist.jpg",
  "./Img/Human_disqualification.jpg",
  "./Img/Little_Life1.jpg",
  "./Img/Proof_of_the_sphere.jpg",
  "./Img/the_psychology_of_money.jpg",
  "./Img/Damien.jpg",
];


// 테이블 헤드 생성
const tableWrap = document.querySelector(".main-wrap");
tableWrap.innerHTML = ` 
<div class="table">
      <div class="row">
      <div class="row_image">이미지</div>
        <div class="row_name">상품명</div>
        <div class="row_price">가격</div>
        <div class="row_content">상세</div>
        <div class="row_management">관리</div>
      </div>
      <div class="tBody"></div>
    </div>
 `;

// 테이블 바디 생성 함수
function dataPrint() {
  const tbBody = document.querySelector(".tBody");
  tbBody.innerHTML = data_map
    .map((item) => {
      return `
      <div class="table_data">
          <div class="inputImg"><img class="imgstyle" src="${item.img}" alt="${item.img}"></div>
          <div class="inputName" id = inputname${item.id}>${item.name}</div>
          <div class="inputPrice" id = inputprice${item.id}>${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
          <div class="inputContent" id = inputcontent${item.id}>${item.content}</div>
          
        <div class="data_btn">
          <button class="btnCor" id = modify_${item.id} onClick = "modify_fuc(${item.id})">수정</button>
          <button class="btnDel" id = delete_${item.id} onClick = "delete_fuc(${item.id})">삭제</button>
        </div>
      </div>
      `;
    })
    .join("");
}

//실시간 키보드 값 출력
function printId() {
  const content = document.getElementById("id_input").value;

  if (id_arr.slice(0, id_arr.length).includes(content)) {
    document.getElementById("error_id").innerText =
      "동일한 id값을 입력하셨습니다";
    btn_active[0] = false;
  } else {
    document.getElementById("error_id").innerText = "";
    btn_active[0] = true;
  }

  if (btn_active.indexOf(false) === -1) {
    //false 찾지 못한 경우 즉, 모두 True인 경우
    save_btn.disabled = false; // 활성화
  } else {
    save_btn.disabled = true; // 비활성화
  }
}
function printPrice() {
  const content = document.getElementById("price_input").value;
  if (content.length > 0) {
    btn_active[1] = true;
  } else {
    btn_active[1] = false;
  }
  
  if (btn_active.indexOf(false) === -1) {
    //false 찾지 못한 경우 즉, 모두 True인 경우
    save_btn.disabled = false; // 활성화
  } else {
    save_btn.disabled = true; // 비활성화
  }
}
function printContent() {
  const content = document.getElementById("content_input").value;
  if (content.length > 0) {
    btn_active[2] = true;
  } else {
    btn_active[2] = false;
  }
  if (btn_active.indexOf(false) === -1) {
    //false 찾지 못한 경우 즉, 모두 True인 경우
    save_btn.disabled = false; // 활성화
  } else {
    save_btn.disabled = true; // 비활성화
  }
}

//잘못된 저장 확인 함수
function jugment(content) {
  let cnt = 0;
  //content -> infoData 현재 입력되 값 total -> data_map 전체 데이터 값
  //id 중복 판단
  if (id_arr.slice(0, id_arr.length - 1).includes(content.id)) {
    error_id.innerText = "아이디를 중복 입력하셨습니다.";
    cnt++;
  } else {
    error_id.innerText = "";
  }

  if (cnt >= 1) {
    //오류 메시지가 하나라도 있는 경우 로컬 스토리지에 저장된 값 삭제
    data_map.pop();
  }
}

//수정 버튼 클릭 함수
function modify_fuc(event) {
  //event는 item._id값

  const modify_btn = document.getElementById(`modify_${event}`); //수정버튼
  const content = document.getElementById(`inputcontent${event}`); //현재행의 content
  const name = document.getElementById(`inputname${event}`); // 현재행의 name
  const price = document.getElementById(`inputprice${event}`); //현재행의 price

  //현재 행 값
  const currentValue = content.textContent;
  const currentValue_name = name.textContent;
  const currentValue_price = price.textContent;

  if (modify_btn.innerText === "수정") {
    modify_btn.innerHTML = "<div>수정완료</div>";

    // 기존 데이터를 input 필드로 교체
    content.innerHTML = `<input class="modify_input${event}" value="${currentValue}"/><div class="modify_input_fuc"></div>`;
    name.innerHTML = `<input class="modify_input_name${event}" value="${currentValue_name}"/><div class="modify_input_name_fuc"></div>`;
    price.innerHTML = `<input class="modify_input_price${event}" value="${currentValue_price}"/><div class="modify_input_price_fuc"></div>`;

    //input content
    const inputField = content.querySelector(`.modify_input${event}`);
    const messageDiv = content.querySelector(".modify_input_fuc");

    const inputField_name = name.querySelector(`.modify_input_name${event}`);
    const messageDiv_name = name.querySelector(".modify_input_name_fuc");

    const inputField_price = price.querySelector(`.modify_input_price${event}`);
    const messageDiv_price = price.querySelector(".modify_input_price_fuc");

    

    // name - 공백 확인
    inputField_name.addEventListener("input", () => {
      const newValue_name = inputField_name.value;
      if (newValue_name.length === 0) {
        messageDiv_name.innerText = "글자를 입력하시오";
        modify_btn.disabled = true;
      } else {
        messageDiv_name.innerText = "";
        modify_btn.disabled = false;
      }
    });

     // price 
     inputField_price.addEventListener("input", () => {
      const newValue_price = inputField_price.value;
      if (newValue_price.length < 0) {
        messageDiv_price.innerText = "글자를 입력하시오.";
        modify_btn.disabled = true;
      } else {
        messageDiv_price.innerText = "";
        modify_btn.disabled = false;
      }
    });

     // content -  입력값 글자 수 검사
     inputField.addEventListener("input", () => {
      const newValue = inputField.value;
      if (newValue.length < 0) {
        messageDiv.innerText = "글자를 입력하시오.";
        modify_btn.disabled = true;
      } else {
        messageDiv.innerText = "";
        modify_btn.disabled = false;
      }
    });

  } else {
    // 수정 완료 상태
    const newValue = content.querySelector(`.modify_input${event}`).value;
    const newValue_name = name.querySelector(
      `.modify_input_name${event}`
    ).value;
    const newValue_price = price.querySelector(`.modify_input_price${event}`).value;

    //innerHTML 수정
    content.innerHTML = `<div>${newValue}</div>`;
    name.innerHTML = `<div>${newValue_name}</div>`;
    price.innerHTML = `<div>${newValue_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>`;

    //버튼 수정
    modify_btn.innerHTML = "<div>수정</div>";

    //localStorage
    let new_data = data_map.map((element) => {
      if (Number(element.id) === event) {
        return {
          ...element,
          name: newValue_name,
          content: newValue,
          price: newValue_price,
        };
      } else {
        return {
          ...element,
        };
      }
      //console.log("element 이후", element);
    });
    data_map = new_data;
    window.localStorage.setItem("_data", JSON.stringify(new_data));
  }
}

//삭제 버튼 클릭 함수
function delete_fuc(event) {
  //event === item.id
  const new_data = data_map.filter((item) => Number(item.id) !== event);
  id_arr.filter((item) => Number(item) !== event)

  data_map = new_data;
  const del = document.getElementById(`delete_${event}`);
  del.parentNode.parentNode.remove(del);

  window.localStorage.setItem("_data", JSON.stringify(new_data));
}

//window 로드 이벤트
window.onload = function () {

  save_btn.disabled = true; // 비활성화
  if (ls !== null) {
    for (let j in JSON.parse(ls)) {
      data_map.push(JSON.parse(ls)[j]);
      id_arr.push(data_map[j].id);
    }
    console.log("data", data_map)
    console.log("id_arr",id_arr);
  }

  dataPrint();
  
  //버튼 클릭 이벤트
  save_btn.addEventListener("click", () => {
    save_btn.disabled = true; // 비활성화
    btn_active = [false, false, false];
    const randomNumber = Math.floor(Math.random()*16);
    let infoData = {
      img: img_arr[randomNumber],
      id: id_input.value,
      name: name_input.value,
      price: price_input.value,
      content: content_input.value,
      heart_chk : false, //main 페이지의 배열 초기값 세팅
      heart_src : "./Img/heart.png",
    };
    id_arr.push(infoData.id);
    data_map.push(infoData);
    jugment(infoData);

    window.localStorage.setItem("_data", JSON.stringify(data_map));


    //데이터 data_map에 push 후 해당 input 초기화
    id_input.value = "";
    name_input.value = "";
    price_input.value = "";
    content_input.value = "";
    //table에 행 달기
    dataPrint();
  });
};
