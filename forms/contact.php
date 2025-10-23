<?php

  // ---------------------------------------------------
  // GANTI INI DENGAN EMAIL PENERIMA ANDA
  // ---------------------------------------------------
  $receiving_email_address = 'metroteknologiinformatika@gmail.com';
  // ---------------------------------------------------

  // Ambil data dari formulir
  // '??' artinya "jika tidak ada, gunakan string kosong"
  $name = $_POST['name'] ?? '';
  $email = $_POST['email'] ?? '';
  $subject_form = $_POST['subject'] ?? '';
  $message = $_POST['message'] ?? '';

  // Validasi sederhana: pastikan field penting tidak kosong
  if(empty($name) || empty($email) || empty($subject_form) || empty($message)) {
    // Kirim 'response' error ke JavaScript
    http_response_code(400); // 400 Bad Request
    echo 'Harap isi semua kolom yang wajib diisi.';
    exit;
  }

  // Siapkan email yang akan dikirim
  $subject_email = "Pesan Pendaftaran Baru dari: $name";
  $headers = "From: $name <$email>" . "\r\n";
  $headers .= "Reply-To: $email" . "\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";

  $email_content = "Anda menerima pesan pendaftaran baru:\n\n";
  $email_content .= "Nama: $name\n";
  $email_content .= "Email: $email\n";
  $email_content .= "Program yang Diminati: $subject_form\n\n";
  $email_content .= "Pesan:\n$message\n";

  // Kirim email menggunakan fungsi mail() bawaan PHP
  if (mail($receiving_email_address, $subject_email, $email_content, $headers)) {
    // Jika sukses, kirim 'OK' ke JavaScript
    http_response_code(200);
    echo 'OK';
  } else {
    // Jika gagal, kirim 'response' error ke JavaScript
    http_response_code(500); // 500 Internal Server Error
    echo 'Terjadi masalah pada server saat mengirim pesan.';
  }

?>