const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const result = document.querySelector('#result')

weatherForm.addEventListener('submit', e => {
  e.preventDefault()
  const location = search.value
  result.textContent = 'Loading ...'
  fetch('http://localhost:3001/weather?address=' + location).then(response => {
    response.json().then(data => {
      if (data?.error) {
        return console.error(data.error)
      }

      result.textContent = data.forecast
    })
  })
})
