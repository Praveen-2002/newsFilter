// apikey- b10e9e87ad884a6c93caa3c18adfd095

// card
{/* <div class="col">
  <div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
  </div>
</div> */}

var newsDiv = document.getElementById('newsDiv');

const xhr = new XMLHttpRequest();

function display() {
  xhr.onprogress = function () {
    newsDiv.innerHTML = '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>'
  }

  xhr.onload = function () {
    newsDiv.innerHTML = '';
    if (this.status == 200) {
      var json = JSON.parse(this.response);
      var inner = ''
      var d = document.createElement('div');
      for (i in json.articles) {
        d.innerHTML = json.articles[i].description;
        inner += `<div class="col">
      <div class="card">
        <img src="${json.articles[i].urlToImage}" class="card-img-top" alt="image${i}">
        <div class="card-body">
          <h5 class="card-title">${json.articles[i].title}</h5>
          <a href="${json.articles[i].url}" class="card-text">${d.innerText}</a>
        </div>
      </div>
      </div>`
        newsDiv.innerHTML = inner;
      }
    } else {
      newsDiv.innerHTML = "<p class='alert alert-danger'>Sorry we are out of Server.</p>"
      setTimeout(() => {
        newsDiv.innerHTML = '';
      }, 3000)
    }
  }
  xhr.send();
}

function trending() {
  xhr.open('GET', 'https://newsapi.org/v2/everything?q=trending%20india%20news&apiKey=b10e9e87ad884a6c93caa3c18adfd095', true);
  display();
}
function film() {
  xhr.open('GET', 'https://newsapi.org/v2/everything?q=trending%20india%20film&apiKey=b10e9e87ad884a6c93caa3c18adfd095', true);
  display();
}
function sports() {
  xhr.open('GET', 'https://newsapi.org/v2/everything?q=trending%20india%20sports&apiKey=b10e9e87ad884a6c93caa3c18adfd095', true);
  display();
}
function tech() {
  xhr.open('GET', 'https://newsapi.org/v2/everything?q=trending%20india%20tech&apiKey=b10e9e87ad884a6c93caa3c18adfd095', true);
  display();
}
trending();

document.getElementById('films').addEventListener('click', function (e) {
  e.preventDefault();
  film();
})

document.getElementById('sports').addEventListener('click', function (e) {
  e.preventDefault();
  sports();
})

document.getElementById('tech').addEventListener('click', function (e) {
  e.preventDefault();
  tech();
})

document.querySelector('#navSearch button').addEventListener('click',function(e){
  e.preventDefault();
  var q = document.querySelector('#navSearch input').value;
  xhr.open('GET',`https://newsapi.org/v2/everything?q=${q}&apiKey=b10e9e87ad884a6c93caa3c18adfd095`,true);
  display();
})
document.querySelector('#navSearch button').addEventListener('click',function(e){
  e.preventDefault();
})

var pageSearch = document.querySelector('#newsSearch input')

pageSearch.addEventListener('input',function(){
  var child = Array.from(newsDiv.childNodes);
  for(let i =0;i<child.length;i++){
    if(child[i].innerText.includes(pageSearch.value)){
      child[i].style.display = 'block';
    }else{
      child[i].style.display = 'none';
    }
}
})