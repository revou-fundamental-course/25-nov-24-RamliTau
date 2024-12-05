// FILE Java Script
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const tinggiInput = document.getElementById("input-tinggi-badan");
    const beratInput = document.getElementById("input-berat-badan");
    const usiaInput = document.getElementById("input-usia");
    const hasilDiv = document.getElementById("hasil-kalkulasi");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Mencegah submit form secara default
  
      let isValid = true;
  
      // Fungsi untuk memeriksa input dan memberi warna merah jika kosong
      const validateInput = (input) => {
        if (!input.value || parseFloat(input.value) <= 0) {
          input.style.borderColor = "red"; // Ubah warna border jadi merah
          isValid = false;
        } else {
          input.style.borderColor = ""; // Kembalikan ke border default
        }
      };
  
      // Validasi semua input
      validateInput(tinggiInput);
      validateInput(beratInput);
      validateInput(usiaInput);
  
      if (isValid) {
        const tinggi = parseFloat(tinggiInput.value) / 100; // Konversi cm ke meter
        const berat = parseFloat(beratInput.value);
  
        const bmi = (berat / (tinggi * tinggi)).toFixed(2); // Rumus BMI
        hasilDiv.textContent = bmi; // Menampilkan hasil di elemen dengan id "hasil-kalkulasi"
      } else {
        alert("Harap isi semua data dengan benar!");
      }
    });
  
    form.addEventListener("reset", () => {
      hasilDiv.textContent = "0"; // Reset hasil kalkulasi ke 0
      // Reset warna border semua input
      [tinggiInput, beratInput, usiaInput].forEach((input) => {
        input.style.borderColor = ""; // Kembali ke default
      });
    });
  });