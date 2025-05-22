// Firebase config kamu (ganti pakai milikmu sendiri)
const firebaseConfig = {
  apiKey: "AIzaSyBvm7UyWXRPf0caU64I7oCStlSN8PDOsoY",
  authDomain: "kuis-multiplayer.firebaseapp.com",
  databaseURL: "https://kuis-multiplayer-default-rtdb.firebaseio.com",
  projectId: "kuis-multiplayer",
  storageBucket: "kuis-multiplayer.appspot.com",
  messagingSenderId: "435482498030",
  appId: "1:435482498030:web:0520081ca273d8033834ff"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let namaPengguna = "";

function masuk() {
  namaPengguna = document.getElementById("username").value;
  if (namaPengguna === "") return alert("Isi nama dulu!");
  document.getElementById("login").style.display = "none";
  document.getElementById("kuis").style.display = "block";
  ambilSoal();
}

function ambilSoal() {
  db.ref("soal").on("value", (snap) => {
    document.getElementById("soal").innerText = snap.val() || "Soal belum dibuat";
  });
}

function kirimJawaban() {
  const jawaban = document.getElementById("jawaban").value;
  if (jawaban === "") return;
  db.ref("jawaban/" + namaPengguna).set(jawaban);
  document.getElementById("jawaban").value = "";
}
