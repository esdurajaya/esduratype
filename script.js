
const dialog = document.getElementById("dialog");
const guru = document.getElementById("guru");
const input = document.getElementById("input");
const subjectSelect = document.getElementById("subject");
let score=0,time=30,timer,currentWord="",correctChars=0,totalChars=0,correctWords=0,combo=0,currentSubject="informatika";

const subjects = {
informatika:["kode","pixel","algoritma","program","data","browser","event","loop","array","input"],
matematika:["angka","fungsi","geometri","aljabar","bilangan","pecahan","persamaan","grafik","variabel","integral"],
bahasa:["kata","kalimat","puisi","tata","bahasa","paragraf","cerita","maksud","simile","majestic"],
ipa:["atom","energi","tumbuhan","hewan","gravitasi","massa","sel","mikroba","foton","gelombang"]
};

const dialogGood = ["Bagus!","Mantap!","Cepat sekali!","Hebat!"];
const dialogWrong = ["Perhatikan ejaannya","Coba lagi","Jangan terburu-buru"];
function randomText(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

subjectSelect.addEventListener("change",()=>{ currentSubject=subjectSelect.value; });

function setGuruFrame(frame){
  switch(frame){
    case "idle": guru.style.objectPosition="0 0"; break;
    case "type": guru.style.objectPosition="-128px 0"; break;
    case "wrong": guru.style.objectPosition="-256px 0"; break;
  }
}

function startGame(){
  score=0; time=30; correctChars=0; totalChars=0; correctWords=0; combo=0;
  document.getElementById("score").innerText=score;
  document.getElementById("time").innerText=time;
  document.getElementById("wpm").innerText=0;
  document.getElementById("accuracy").innerText=100;
  document.getElementById("combo").innerText=0;
  words = subjects[currentSubject];
  dialog.innerText="Ayo mulai, fokus ya!";
  setGuruFrame("idle");
  input.disabled=false; input.value=""; input.focus();
  nextWord();
  timer=setInterval(()=>{
    time--; document.getElementById("time").innerText=time;
    updateStats();
    if(time<=0) endGame();
  },1000);
}

function nextWord(){
  currentWord = words[Math.floor(Math.random()*words.length)];
  document.getElementById("word").innerText = currentWord;
}

input.addEventListener("input",()=>{
  totalChars++;
  if(currentWord.startsWith(input.value)){
    correctChars++;
    setGuruFrame("type");
    dialog.innerText="Teruskan...";
  } else {
    combo=0; document.getElementById("combo").innerText=combo;
    setGuruFrame("wrong");
    dialog.innerText=randomText(dialogWrong);
  }
  if(input.value===currentWord){
    score++; correctWords++; combo++;
    document.getElementById("score").innerText=score;
    document.getElementById("combo").innerText=combo;
    input.value="";
    nextWord();
    setGuruFrame("idle");
    if(combo>=5) dialog.innerText="🔥 Luar biasa! Pertahankan!";
    else dialog.innerText=randomText(dialogGood);
  }
  updateStats();
});

function updateStats(){
  const elapsedTime = (30-time)/60;
  const wpm = elapsedTime>0? Math.round(correctWords/elapsedTime):0;
  const accuracy = totalChars>0? Math.round((correctChars/totalChars)*100):100;
  document.getElementById("wpm").innerText=wpm;
  document.getElementById("accuracy").innerText=accuracy;
}

function endGame(){
  clearInterval(timer);
  input.disabled=true;
  setGuruFrame("idle");
  document.getElementById("word").innerText="SELESAI";
  dialog.innerText="Terus berlatih ya, kamu hebat!";
  alert("Skor akhir: "+score);
}
