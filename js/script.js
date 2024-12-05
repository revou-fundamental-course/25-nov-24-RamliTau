// FILE Java Script
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const tinggiInput = document.getElementById("input-tinggi-badan");
    const beratInput = document.getElementById("input-berat-badan");
    const hasilDiv = document.getElementById("hasil-kalkulasi");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Mencegah submit form secara default
      
      const tinggi = parseFloat(tinggiInput.value) / 100; // Konversi cm ke meter
      const berat = parseFloat(beratInput.value);
  
      if (tinggi > 0 && berat > 0) {
        const bmi = (berat / (tinggi * tinggi)).toFixed(2); // Rumus BMI
        hasilDiv.textContent = bmi; // Menampilkan hasil di elemen dengan id "hasil-kalkulasi"
      } else {
        alert("Masukkan data tinggi dan berat badan yang valid!");
      }
    });
  
    form.addEventListener("reset", () => {
      hasilDiv.textContent = "0"; // Reset hasil kalkulasi ke 0
    });
  });