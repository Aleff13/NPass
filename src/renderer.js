const signBtn = document.getElementById('signBtn')
const inputPassword = document.getElementById('floatingPassword')
const inputName = document.getElementById('floatingInput')

signBtn.addEventListener('click', () => {
  const inputNameValue = inputName.value
  const inputPasswordValue = inputPassword.value

  window.electronAPI.login(inputNameValue, inputPasswordValue)
})