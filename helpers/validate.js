
const validatePassword = (password, errors) => {
  if (!password) {
    console.log('paswodnya bang :'+password);
    errors.set('password', { message: 'Password tidak boleh kosong' })
  }

  if (password.length < 6) {
    errors.set('password', { message: 'Password harus memiliki setidaknya 6 karakter' })
  }

  if (password.length > 23) {
    errors.set('password', { message: 'Password tidak boleh lebih dari 23 karakter' })
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])/
  if (!passwordRegex.test(password)) {
    errors.set('password', { message: 'Password tidak boleh kosong atau harus mengandung kombinasi huruf dan angka' })
  }
}

const validateEmail = (email, errors) => {
  if (!email) {
    errors.set('email', { message: 'email tidak boleh kosong' })
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errors.set('email', { message: 'email tidak valid' })
    }
  }
}

const validateName = (name, errors) => {
  if (!name) {
    errors.set('name', { message: 'name tidak boleh kosong' })
  } else {
    const nameRegex = /^[a-zA-Z\s]+$/
    if (!nameRegex.test(name)) {
      errors.set('name', { message: 'name tidak valid' })
    }
  }
}

const validateNo_telepon = (no_telepon, errors) => {
  if (!no_telepon) {
    errors.set('no_telepon', { message: 'nomor telefon tidak boleh kosong' })
  } else {
    const no_teleponRegex = /^\d{10,12}$/
    if (!no_teleponRegex.test(no_telepon)) {
      errors.set('no_telepon', { message: 'Format nomor telepon tidak valid' })
    }
  }
}

module.exports = { validatePassword, validateEmail, validateName, validateNo_telepon }
