//url paramas 경로 id값
const url = new URL(window.location.toString());
const urlParams = url.searchParams;
//console.log(urlParams.get("id"));

//변수 선언 - DOM
const container_main = document.querySelector(".container_main");

//변수 선언 - localStorage
let local_data = window.localStorage.getItem("_data");
let cart_list  = [];
let cart_list_data = window.localStorage.getItem("cart_data");

//중복 확인용 배열
let arr = [];

//메인 화면 구성 함수
function dataPrint(item){
    container_main.innerHTML = `
        <div class="main_image"><img class="imageStyle" src="${item.img}" alt="${item.img}"></div>
        <div class="row"><div>상품명</div><div>${item.name}</div></div>
        <div class="row"><div>가격</div><div>${item.price}</div></div>
        <div class="row"><div>상세설명</div><div>${item.content}</div></div>
        <button id="shop_btn${item._id}">장바구니</button>
    `
}


//window 화면 로드 함수
window.onload = function (){
    if(cart_list_data !== null){//이미 값이 존재할 경우
        JSON.parse(cart_list_data).map((element) => {
            cart_list.push(element);
            arr.push(element.id);
        })
        window.localStorage.setItem("cart_data",JSON.stringify(cart_list));    
    }
    //dataPrint 메인 화면 구성 
    JSON.parse(local_data).map((element) => {
        if(Number(element._id) === Number(urlParams.get("id"))){
            //해당하는 파라미터의 값인 경우 - 해당 id값에 따른 localStorage값이 나와야함
            
            //console.log("해당하는 id값", Number(element._id));
            //console.log("element",element)
            dataPrint(element);
            
            const shop_btn = document.getElementById(`shop_btn${element._id}`);
            shop_btn.addEventListener("click", () => {
                shop_basket(element._id);
            })
            
        }
    });    
    
}

//버튼 클릭 함수
function shop_basket(item){
    //item -> element._id 값값
    
    arr.push(item); 
    if(arr.slice(0,arr.length-1).includes(item)){//중복값이라면
        alert("이미 입력된 값입니다.");
    }else{
        JSON.parse(local_data).map((element) => {
            if(Number(element._id) === Number(item)){
                let infoData = {
                    id : element._id,
                    name : element.name,
                    price : element.price,
                    content : element.content,
                }
                cart_list.push(infoData);
            }
        });
        
        window.localStorage.setItem("cart_data",JSON.stringify(cart_list));
        console.log(arr);
    }
    
    
}