const setButton = document.getElementById('signBtn')

setButton.addEventListener('click', () => {
  window.electronAPI.createDb()
})