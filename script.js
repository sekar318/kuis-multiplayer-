// Firebase config kamu
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
  namaPengguna = document.getElementById("username").value.trim();
  if (namaPengguna === "") return alert("Isi nama dulu!");
  document.getElementById("login").style.display = "none";
  document.getElementById("kuis").style.display = "block";
  ambilSoal();
}

function ambilSoal() {
  db.ref("soal/teks").on("value", (snap) => {
    document.getElementById("soal").innerText = snap.val() || "Soal belum dibuat";
  });
}

function kirimJawaban() {
  const jawaban = document.getElementById("jawaban").value.trim();
  if (jawaban === "") return;

  db.ref("soal/kunci").once("value").then((snap) => {
    const kunci = snap.val();
    const benar = jawaban.toLowerCase() === kunci.toLowerCase();
    const status = benar ? "Benar" : "Salah";

    db.ref("jawaban/" + namaPengguna).set({
      jawaban: jawaban,
      status: status
    });

    alert("Jawaban kamu: " + status);
    document.getElementById("jawaban").value = "";
  });
}
