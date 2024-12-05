// Ini File JavaScript
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const tinggiInput = document.getElementById("input-tinggi-badan");
    const beratInput = document.getElementById("input-berat-badan");
    const usiaInput = document.getElementById("input-usia");
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const hasilDiv = document.getElementById("hasil-kalkulasi");
    const infoHasil = document.getElementById("info-hasil");
    const artikelInfo = document.getElementById("artikel-kisaran");
    const kategoriInfo = document.getElementById("kategori-info");
    const headerInfoBMI = document.querySelector('header h2:nth-of-type(2)'); 
    const headerKategoriBMI = document.querySelector('header h3:nth-of-type(1)');
    const headerPenyakitTerkait = document.querySelector('header h3:nth-of-type(2)'); 
    const solusiBmi = document.getElementById("solusi-bmi");
    const reminderBmi = document.getElementById("reminder-bmi");
    const penyakitList = document.getElementById("penyakit-list");
    
    
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
        isValid = false; // Set isValid menjadi false jika jenis kelamin tidak dipilih
      }
  
      if (isValid) {
        const tinggi = parseFloat(tinggiInput.value) / 100; // Konversi cm ke meter
        const berat = parseFloat(beratInput.value);
  
        const bmi = (berat / (tinggi * tinggi)).toFixed(2); // Rumus BMI
        hasilDiv.textContent = bmi; // Menampilkan hasil di elemen dengan id "hasil-kalkulasi"
        
        // Gulir otomatis ke bagian hasil kalkulasi
        const resultSection = document.querySelector(".result-box");
        resultSection.scrollIntoView({ behavior: "smooth", block: "center" });

        // Tentukan kategori berdasarkan BMI
        let kategori = "";
        let solusi = "";
        let reminder = "";
        let penyakit = [];
  
        if (bmi < 18.5) {
          kategori = "Kekurangan berat badan";
          solusi = "Disarankan untuk meningkatkan asupan kalori dengan makanan bergizi dan konsultasi dengan ahli gizi.";
          reminder = "Penting untuk memeriksakan diri ke dokter untuk memastikan tidak ada masalah kesehatan lain.";
          penyakit = ["Anemia", "Osteoporosis", "Gangguan sistem kekebalan tubuh"];
        } else if (bmi >= 18.5 && bmi <= 24.9) {
          kategori = "Normal (ideal)";
          solusi = "Teruskan gaya hidup sehat dengan menjaga pola makan seimbang dan rutin berolahraga.";
          reminder = "Jaga pola hidup agar tetap dalam kisaran berat badan yang sehat.";
          penyakit = [];
        } else if (bmi >= 25 && bmi <= 29.9) {
          kategori = "Kelebihan berat badan";
          solusi = "Mulai dengan diet sehat dan olahraga teratur untuk menurunkan berat badan secara bertahap.";
          reminder = "Penting untuk menghindari penyakit terkait obesitas, seperti diabetes dan hipertensi.";
          penyakit = ["Diabetes tipe 2", "Hipertensi", "Gangguan tidur (Sleep Apnea)", "Penyakit jantung"];
        } else {
          kategori = "Kegemukan (Obesitas)";
          solusi = "Konsultasikan dengan dokter atau ahli gizi untuk merencanakan penurunan berat badan yang aman.";
          reminder = "Obesitas berisiko menyebabkan berbagai penyakit serius, penting untuk segera melakukan perubahan gaya hidup.";
          penyakit = ["Diabetes tipe 2", "Hipertensi", "Stroke", "Penyakit jantung", "Sleep Apnea", "Kanker"];
        }
  
        // Tampilkan kategori dan solusi pada elemen kategori-info
        infoHasil.textContent = kategori;
        kategoriInfo.innerHTML = `<p>Anda memiliki ${kategori}</p>
                                  <p><strong>Solusi:</strong> ${solusi}</p>
                                  <p><strong>Reminder:</strong> ${reminder}</p>`;
  
        // Menampilkan kategori dan penyakit yang mungkin terkait
        if (penyakit.length > 0) {
            penyakitList.innerHTML = penyakit.map(p => `<li>${p}</li>`).join('');
            document.getElementById("penyakit-bmi").style.display = "block"; // Pastikan bagian ini tampil
        } else {
            penyakitList.innerHTML = "<li>Tidak ada penyakit terkait untuk kategori ini.</li>";
            document.getElementById("penyakit-bmi").style.display = "block"; // Tampilkan walau kosong
        }

        // Menampilkan artikel dengan kisaran hasil jika desimal
        const bmiDecimal = parseFloat(bmi);
        if (bmiDecimal % 1 !== 0) {
          // Hasil BMI dalam desimal
          const lower = Math.floor(bmiDecimal);
          const upper = Math.ceil(bmiDecimal);
          artikelInfo.textContent = `Hasil BMI Anda berada di antara ${lower} dan ${upper}.`;
        } else {
          // Hasil BMI adalah angka bulat
          artikelInfo.textContent = `Hasil BMI Anda adalah ${bmiDecimal}.`;
        }
  
        // Tampilkan elemen-elemen setelah hasil dihitung
        artikelInfo.style.display = "block";
        kategoriInfo.style.display = "block";
        penyakitList.style.display = "block";
  
      } else {
        alert("Harap isi semua data dengan benar!"); // Menampilkan satu alert untuk semua validasi
      }
    });
  
    form.addEventListener("reset", () => {
      hasilDiv.textContent = "0"; // Reset hasil kalkulasi ke 0
      infoHasil.textContent = ""; // Reset info hasil
      artikelInfo.textContent = ""; // Reset artikel info
      kategoriInfo.innerHTML = ""; // Reset kategori info
      penyakitList.innerHTML = ""; // Reset penyakit list
      
    // Reset hasil kalkulasi
    hasilDiv.textContent = "-"; // Kembali ke tanda "-"
    infoHasil.textContent = "Belum ada hasil"; // Kembali ke teks default
    
    // Reset artikel informasi dan kategori
    artikelInfo.textContent = ""; // Kosongkan artikel info
    kategoriInfo.innerHTML = ""; // Kosongkan kategori info
    penyakitList.innerHTML = ""; // Kosongkan daftar penyakit

    // Reset warna border semua input
    [tinggiInput, beratInput, usiaInput].forEach((input) => {
        input.style.borderColor = ""; // Kembalikan ke default
    });

    // Reset pilihan jenis kelamin
    genderInputs.forEach((input) => {
        input.checked = false;
    });
  
      // Sembunyikan informasi hasil BMI
      artikelInfo.style.display = "none";
      kategoriInfo.style.display = "none";
      penyakitList.style.display = "none";


    });
  });
  