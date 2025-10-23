/**
 * Kode Tambahan untuk PHP Email Form
 * Ini akan menangani pengiriman formulir .php-email-form
 */
(function() {
  "use strict";

  // Fungsi helper untuk memilih elemen
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  // Ambil semua formulir dengan kelas .php-email-form
  let phpEmailForms = select('.php-email-form', true);

  phpEmailForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Mencegah halaman refresh saat tombol submit diklik

      let thisForm = this;
      let action = thisForm.getAttribute('action'); // Mendapat 'forms/contact.php'
      let loading = thisForm.querySelector('.loading');
      let errorMessage = thisForm.querySelector('.error-message');
      let sentMessage = thisForm.querySelector('.sent-message');

      // Tampilkan pesan "Loading"
      loading.classList.add('d-block');
      errorMessage.classList.remove('d-block');
      sentMessage.classList.remove('d-block');

      let formData = new FormData(thisForm);

      // Kirim data formulir ke file PHP
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
      })
      .then(response => {
        // Cek apakah server merespons 'OK' (status 200)
        if (response.ok) {
          return response.text();
        } else {
          // Jika server merespons error (400 atau 500)
          return response.text().then(text => {
            throw new Error(text || 'Terjadi error. Status: ' + response.status);
          });
        }
      })
      .then(data => {
        // Jika PHP merespons dengan teks 'OK'
        if (data.trim() === 'OK') {
          loading.classList.remove('d-block');
          sentMessage.classList.add('d-block'); // Tampilkan pesan sukses
          thisForm.reset(); // Kosongkan formulir
        } else {
          // Jika PHP merespons selain 'OK' (meskipun status 200)
          throw new Error(data || 'Respon server tidak valid.');
        }
      })
      .catch(error => {
        // Jika terjadi error (network, atau dari 'throw new Error' di atas)
        loading.classList.remove('d-block');
        errorMessage.innerHTML = error.message;
        errorMessage.classList.add('d-block'); // Tampilkan pesan error
      });
    });
  });

})();