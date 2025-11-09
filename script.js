// FUNGSI BARU: Untuk membersihkan path
function cleanPath(path) {
  // 1. Hapus / di awal (jika ada)
  // 2. Hapus .html di akhir (jika ada)
  return path.replace(/^\//, "").replace(/\.html$/, "");
}

document.addEventListener("DOMContentLoaded", function () {
  // Muat header
  fetch("header.html")
    .then((response) => {
      // Tambahkan pengecekan jika header.html tidak ditemukan
      if (!response.ok) {
        console.error(
          "Error: header.html tidak ditemukan. Pastikan file ada di root folder."
        );
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // --- LOGIKA BARU YANG DIPERBAIKI ---

      // 1. Dapatkan path dari URL browser, bersihkan, dan atasi kasus homepage
      // (Misal: /bilangan_bulat -> "bilangan_bulat" ATAU / -> "index")
      const browserPath = cleanPath(window.location.pathname) || "index";

      // Cari semua link di navigasi
      const navLinks = document.querySelectorAll(
        ".nav-links a.nav-link, .nav-links .dropdown-content a"
      );

      navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");

        // 2. Dapatkan path dari link, bersihkan, dan atasi kasus homepage
        // (Misal: bilangan_bulat.html -> "bilangan_bulat" ATAU index.html -> "index")
        const linkPath = cleanPath(linkHref) || "index";

        // 3. Bandingkan versi yang sudah bersih
        if (linkPath === browserPath) {
          // Jika link ada di dalam dropdown
          if (link.closest(".nav-dropdown")) {
            // Tambahkan 'active' ke tombol dropdown utamanya (misal: "Quiz ▾")
            link
              .closest(".nav-dropdown")
              .querySelector(".dropbtn")
              .classList.add("active");
          }
          // Jika ini link biasa (bukan dropdown)
          else if (link.classList.contains("nav-link")) {
            link.classList.add("active");
          }
        }
      });
    })
    .catch((error) => {
      console.error("Gagal memuat header:", error);
      document.getElementById("header-placeholder").innerHTML =
        "<p style='color:red; text-align:center;'>Gagal memuat header.</p>";
    });
});
