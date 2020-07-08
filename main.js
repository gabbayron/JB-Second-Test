// URL with Filter
const allUrl = 'https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;borders;flag;'
// HTML Elements and Events

const allBtn = document.querySelector('#all').addEventListener('click', function () { postData(allUrl) }) // Get all 
const searchInput = document.querySelector('#searchInput')
const searchBtn = document.querySelector('#searchBtn')
    .addEventListener('click', function (e) {
        e.preventDefault()
        let value = searchInput.value
        postData(`https://restcountries.eu/rest/v2/name/${value}`)
    })

let resultDiv = document.getElementById('result')

// Functions

function postData(url) {
    let xhr = new XMLHttpRequest;
    xhr.addEventListener('load', function () {
        if (this.status === 404) {
            resultDiv.innerHTML = `<h2 class="mt-4">No Matches Found<h2>`
            searchInput.focus()
            return
        }
        arr = JSON.parse(this.responseText)
        let html = arr.map(item => {
            return (`
      <tr ><td>${item.name}</td>
      <td>${item.topLevelDomain}</td>
      <td>${item.capital}</td>
      <td>${item.currencies.map(currency => currency.code)}  ${item.currencies.map(currency => currency.name)}  ${item.currencies.map(currency => currency.symbol)}</td>
      <td>${item.borders.map(val => ` ${val}`)}</td>
      <td><img src="${item.flag}"></td>
       </tr>`)
        }).join('')
        resultDiv.innerHTML = `<table class="table table-hover">
        <th scope="row">Country Name</th><th scope="row">Top Level Domain</th> <th scope="row">Capital</th> <th scope="row">Currencies</th> <th scope="row">Borders</th> <th>Flag</th></tr>
        ${html}</table>`

    })
    xhr.open('GET', url)
    xhr.send();
}


