//time and date

setInterval(showTime, 1000);
function showTime(){
let dat = new Date();
let dt = new Date().toUTCString();
dt = dt.slice(0, dt.length-13);
let hours = (dat.getHours().toString().length == 1)?`0${dat.getHours()}`:`${dat.getHours()}`;
let mins = (dat.getMinutes().toString().length == 1)?`0${dat.getMinutes()}`:`${dat.getMinutes()}`;
let secs = (dat.getSeconds().toString().length == 1)?`0${dat.getSeconds()}`:`${dat.getSeconds()}`;
document.querySelector(".date").innerHTML = `${dt}, ${hours}:${mins}:${secs}`;
}

// menu sidenav

const ain = document.getElementsByClassName("ainnav");
let menumob = document.getElementById("menumob");
menumob.addEventListener('click', function (){
  document.querySelector(".sidenav").style.width = "55%";
  ain[0].style.fontSize= "2rem";
  for(let j=1; j<ain.length; j++)
  ain[j].style.fontSize= "1.2rem";
});
let closebtn = document.querySelector(".closebtn");
closebtn.addEventListener('click', function(){
  document.querySelector(".sidenav").style.width = "0%";
  for(let j=0; j<ain.length; j++)
  ain[j].style.fontSize= "0rem";
})

//news

const params = new URLSearchParams(window.location.search);
const news = params.get('category');
const q = params.get('q');

//sidenav

sideNavArr = {
  entertainment: ['TV series', 'Web Series', 'Anime', 'Movies', 'Actors', 'Actressess', 'Animated Movies'],
  education: ['Exams', 'Jobs', 'Schools', 'Universities and Institutes', 'Exam Results'],
  lifestyle: ['Coronavirus','Food','Travel','Books', 'Fashion', 'Home', 'Beauty', 'Health and Fitness', 'Relationships'],
  sports: ['Cricket', 'Football', 'Basketball', 'Badminton', 'Lawn Tennis', 'Hockey', 'Athletics', 'Shooting', 'Volleyball', 'Chess', 'Boxing', 'Wrestling', 'Swimming', 'Olympics'],
  business: ['International Business', 'Trade', 'Budget', 'Banking', 'Business Companies', 'E-Commerce'],
  technology: ['Gadgets', 'Mobiles', 'Computer', 'Laptops', 'Cars', 'Automobiles', 'Tech Companies'],
  world: ['Geography', 'Religion', 'Weather', 'Asia', 'North America', 'Europe', 'South America', 'Africa', 'Australia']
};

const page = sideNavArr[`${q}`];
const menubody = document.getElementById('menubody');

for(let i=0; i<page.length; i++)
{
  menuitems = `<a href="news.html?category=${page[i]}&q=${q}" class="menuitems">${page[i]}</a>`;
  menubody.insertAdjacentHTML('beforeend', menuitems);
}


//news
let purl = "http://cors-anywhere.herokuapp.com/";

let url = `https://newsapi.org/v2/everything?q=${news}&apiKey=29095409dba9478ba9fa8f6390a1d7f0`;
let newsContainer = document.getElementById("news");
document.querySelector(`.${news}`).style.backgroundColor = "rgb(15,15,15)";

fetch(url)
.then(function(response){
    return (response.json());
})
.then(function(data){

 
    let arr = [];
for(let i=0; i<data.articles.length; i++)
  {  
    let url = ((data.articles)[i]).url;
    let img = ((data.articles)[i]).urlToImage;
    let title = ((data.articles)[i]).title;
    let content = ((data.articles)[i]).content;
    let a = content.length-1;
    for(let i=content.length-1; i>=0; i--)
    {
        if(content.charAt(i) == '[')
        {
          a = i;
          break;
        }
    }
    content = content.slice(0,a);
    let htmlDocAppend = `<div class="new n${i}", style="background-image: url(${img}) ; background-size: 100% 100%;">
<div class="vid"><img class="iframe" src=${img}></iframe></div>
<div class="paras"><div class="newstitle nt">${title}<span class="viewfulln"><a class="viewfull", href=${url}, target="_blank">View full news</a></span></div><div class="newscont">${content}<a href=${url}, target="_blank", class="readmore">Read more</a></div></div>
</div>`;

arr.push(img);

newsContainer.insertAdjacentHTML("beforeend", htmlDocAppend);
  }

  document.querySelector(`.n${data.articles.length-1}`).style.marginBottom = '10px';

  for(let i=0; i<data.articles.length; i++)
  {

  let ele = document.querySelector(`.n${i}`);
  ele.style.backgroundImage = `linear-gradient(transparent 15%, rgba(30,30,30,1) 90%), url(${arr[i]})`;
  }
});

