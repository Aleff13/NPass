const signBtn = document.getElementById('signBtn')
const inputPassword = document.getElementById('floatingPassword')
const inputName = document.getElementById('floatingInput')

//todo: clean the inputs for sqlinjections
const getInputValues = () => {
  const inputNameValue = inputName.value
  const inputPasswordValue = inputPassword.value

  return {inputNameValue, inputPasswordValue}
}

const {inputNameValue, inputPasswordValue} = getInputValues()

signBtn.addEventListener('click', () => {
  console.log(inputNameValue, inputPasswordValue)
  window.electronAPI.createDb(inputNameValue, inputPasswordValue)
})