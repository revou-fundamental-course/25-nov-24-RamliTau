// Ini File JavaScript
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const tinggiInput = document.getElementById("input-tinggi-badan");
    const beratInput = document.getElementById("input-berat-badan");
    const usiaInput = document.getElementById("input-usia");
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const hasilDiv = document.getElementById("hasil-kalkulasi");
    const infoHasil = document.getElementById("info-hasil");
  
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
  
      // Validasi semua input numerik
      validateInput(tinggiInput);
      validateInput(beratInput);
      validateInput(usiaInput);
  
      // Validasi jenis kelamin
      const genderSelected = Array.from(genderInputs).some((input) => input.checked);
      if (!genderSelected) {
        alert("Harap pilih jenis kelamin!");
        isValid = false;
      }
  
      if (isValid) {
        const tinggi = parseFloat(tinggiInput.value) / 100; // Konversi cm ke meter
        const berat = parseFloat(beratInput.value);
  
        const bmi = (berat / (tinggi * tinggi)).toFixed(2); // Rumus BMI
        hasilDiv.textContent = bmi; // Menampilkan hasil di elemen dengan id "hasil-kalkulasi"
  
        // Tentukan kategori berdasarkan BMI
        let kategori = "";
        if (bmi < 18.5) {
          kategori = "Anda memiliki kekurangan berat badan.";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
          kategori = "Berat badan Anda normal (ideal).";
        } else if (bmi >= 25 && bmi <= 29.9) {
          kategori = "Anda memiliki berat badan berlebihan.";
        } else {
          kategori = "Anda mengalami kegemukan (obesitas).";
        }
  
        // Tampilkan kategori pada elemen info-hasil
        infoHasil.textContent = kategori;
      } else {
        alert("Harap isi semua data dengan benar!");
      }
    });
  
    form.addEventListener("reset", () => {
      hasilDiv.textContent = "0"; // Reset hasil kalkulasi ke 0
      infoHasil.textContent = ""; // Reset info hasil
      // Reset warna border semua input
      [tinggiInput, beratInput, usiaInput].forEach((input) => {
        input.style.borderColor = ""; // Kembali ke default
      });
  
      // Reset pilihan jenis kelamin
      genderInputs.forEach((input) => {
        input.checked = false;
      });
    });
  });
  