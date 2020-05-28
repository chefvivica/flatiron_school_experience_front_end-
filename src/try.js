const usersUrl = 'http://localhost:3000/users'
const avatarsUrl = 'http://localhost:3000/avatars'
let board = document.querySelector('#grid')
const h1 = document.querySelector('#header')
const logInForm = document.querySelector('#logInForm')
const logInBtn = document.querySelector('#log_in')
const logIn = document.querySelector('form')
const playButton = document.querySelector('.picked_avatar')
let newPlayer = {}
let newAvatar = {}
let totalPoints = 0
const p = document.createElement('p')
const centerTile = document.querySelector('.center-tile')
centerTile.appendChild(p)
const ul = document.createElement('ul')
ul.id = "centerAvt"
centerTile.append(ul)
let userID = null 
let avatarID = null 
let avatarName = null 
let newAvatarImageUrl = null 
let turns = 0

//starting welcome page display the leader-board and sign in 

document.body.style.backgroundImage =  "url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQcyO7WgVaOZdHSuDkWuXeZGFtBYsY6pjzVLrv1Gk2kmONGljl9&usqp=CAU')";
board.style.display = 'none'


// show the sign in form

logInBtn.addEventListener('click',e=>{
    logInForm.innerHTML = `
    <label for="user_name">Name</label>
    <input type="text" name="user[name]" id="user_name" placeholder="please enter your user name here"/>
    
    <input type="submit" name="commit" value="Go" class="log_in_btn" />
    `
    document.body.append(logInForm)    
})



// //grabing the user name
logInForm.addEventListener("submit",e=>{
  e.preventDefault()
  const username = document.querySelector('input').value
  getNewUser(username)
})

const getNewUser = username =>{
  background("https://media1.giphy.com/media/3o7TKAW5scXkqmqTdK/200.webp?cid=ecf05e4704e31d4a3404cf2c2569491fdce225a4c6a9eb2d&rid=200.webp")
  logInForm.style.display ="none"
  h1.style.display = 'none'
  const btn = document.querySelector('#log_in').style.display = "none"
  const pickAvatarBtn = document.createElement('button')
  pickAvatarBtn.className = 'pickAvatarBtn'
  pickAvatarBtn.textContent = 'Pick Your Avatar'
  document.body.append(pickAvatarBtn)
  pickAvatarBtn.dataset.name = username
  console.log(pickAvatarBtn)
  fetch(usersUrl, {
    method: 'POST', 
    headers: {
      "content-type": "application/json",
      "accept": 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  }).then(res => res.json()).then(user => userID = user.id)
  pickAvatarBtn.addEventListener('click', getAvatar)
}



// click butter to selete a avatar
const getAvatar = (e)=>{
  const username = e.target.dataset.name 
  newPlayer.id= e.target.dataset.id
  document.body.style.backgroundImage ='none'
  document.body.style.backgroundColor = "#9edee6"
  e.target.style.display ='none'
  const avatarDiv = document.createElement('div')
  avatarDiv.dataset.name = username
  avatarDiv.className = 'avatarSelectDiv'
  avatarDiv.innerHTML =`
  <span class="avatars"><img src = 'https://i.pinimg.com/originals/fa/c2/ab/fac2abb69ff8503d184be8d5417ea650.png'/></span>
  <span class="avatars"><img src = 'https://i.ya-webdesign.com/images/character-transparent-pixel-16.png'/></span>
  <span class="avatars"><img src = 'https://i.pinimg.com/originals/5f/b9/a7/5fb9a78a47f499a08cc32d890d4252ee.png'/></span>
  <span class="avatars"><img src = 'https://i.ya-webdesign.com/images/drawing-avatars-avatar-face-17.png'/></span>
  <span class="avatars"><img src = 'https://i.pinimg.com/originals/04/9e/c3/049ec39b121d26f40a9bf5620a821857.png'/></span>
  <span class="avatars"><img src = 'https://i.pinimg.com/originals/bb/14/66/bb146666c1e70354a6555c650375fbc8.png'/></span>
  <span class="avatars"><img src = 'https://i.pinimg.com/originals/70/d1/da/70d1da88428daf4610a70081ec8b28aa.png'/></span>
  `
  document.body.append(avatarDiv)
  pickAvatar(avatarDiv)
}

// pick a Avatar from collection and name it 
const pickAvatar =(avatarDiv) =>{
  const username = avatarDiv.dataset.name
  console.log(username)
  const avatarChars = document.querySelectorAll('.avatars')
  let avatarCharArray = Array.from(avatarChars)
  avatarCharArray.forEach(avt=>{
    avt.addEventListener('mouseover',e=>{
      e.target.style.backgroundColor = "yellow"
    })
  })
  avatarCharArray.forEach(avt=>{
    avt.addEventListener('mouseout',e=>{
      e.target.style.backgroundColor = ""
    })
  })
  avatarCharArray.forEach(avt=> {
    avt.onclick = function(){
      const avtDiv = document.querySelector('.avatarSelectDiv').style.display ="none"
      const pickedAvt = document.createElement('div')

      pickedAvt.className = 'pickedAvt'
      pickedAvt.innerHTML = `
      <img id='myAvt' src='${avt.children[0].src}'/>
      `
      const pickedAvtNameForm = document.createElement('form')
      pickedAvtNameForm.className = 'pickedAvtForm'
      pickedAvtNameForm.dataset.name = username
     
      pickedAvtNameForm.innerHTML = `
      <label for="avatar_name" class="avatarName">I'm your avatar! Please give me a name.</label><br><br>
      <input type="text" name="name" placeholder = "please give your avatar a name"/><br><br>
      <input type="submit" value="Play" class="picked_avatar"/>
      `
      document.body.append(pickedAvt)
      document.body.append(pickedAvtNameForm)
      let img = document.querySelector('#myAvt')
      newAvatarImageUrl = img.src
      pickedAvtNameForm.dataset.img = newAvatarImageUrl
      pickedAvtNameForm.addEventListener('submit',startGame)
    }
  })
}

//starting game!!!!!!let's go!
const startGame = (e) =>{
  e.preventDefault()
  const username = e.target.dataset.name
  const  pickedAvForm = document.querySelector('.pickedAvtForm')
  const pickedAv = document.querySelector('.pickedAvt')
  newAvatar.name =  pickedAvForm.name.value
  newAvatarImageUrl = e.target.dataset.img
  console.log(newAvatarImageUrl)
    fetch(avatarsUrl, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        'accept': "application/json"
      },
      body: JSON.stringify({
        name: newAvatar.name,
        user_id: userID,
        image_url: newAvatarImageUrl,
        points: 0,
        turns: 0
      })
    }).then(res => res.json()).then(res => console.log(res))



  pickedAv.style.display = 'none'
  pickedAvForm.style.display = 'none'
  board.style.display = 'inline-grid'

  const avCircle = document.createElement('span')
  avCircle.setAttribute('class','avatarCircle')
  console.log(avCircle)
  const startTile = document.getElementById(1)
  startTile.appendChild(avCircle)
  const avtUl = document.querySelector('#centerAvt')
  
  const yourAvt = document.createElement('div')
  yourAvt.className = 'yourAvt'
  yourAvt.innerHTML =`
  <h2>${newAvatar.name}</h3>
  <img src = '${newAvatarImageUrl}'/>
  `
  // centerTile.append(yourAvt)
  const ul = createUserUl(username)
  ul.id = "userInfo"
  document.body.append(ul)
  ul.append(yourAvt)

}
const dice = document.querySelector('.dieBtn')
dice.addEventListener('click', function(e){
  const num = parseInt(document.querySelector('#die1').innerHTML)
  const dot = document.querySelector('.avatarCircle')
  const currentSquare = dot.parentElement.id
  const newSquare = parseInt(currentSquare) + num
  const destination = document.getElementById(newSquare)
  destination.appendChild(dot)
  const nS = destination.id
  if (nS == 13 || nS == 8){
    alert('Bundle Install, loose two points')
    totalPoints -= 2
  } else if (nS == 9 || nS == 15){
    alert('Internets not working, loose one points')
    totalPoints -= 1
  } else if (nS == 17 || nS == 20){
    alert('Congratulations! You passed the code challenge, earn five points')
    totalPoints += 5
  } else if (nS == 6 || nS == 11){
    alert('Michelle explained something to you! Earn three points')
    totalPoints += 3
  } else if (nS == 12 || nS == 19){
    alert('Its blog week! Loose one point')
    totalPoints -= 1 
  } else if (nS == 3 || nS == 14){
    alert('Congradulations! You made it through another leacture, earn five points')
    totalPoints += 5
  } else if (nS == 1 || nS == 5){
    alert('Pairing lab was super hard but you got throught it, earn four points.')
    totalPoints += 4
  } else if (nS == 2 || nS == 10){
    alert('New Rails labs are all code alongs, earn 3 point.')
    totalPoints += 3
  } else if (nS == 4 || nS == 16){
    alert('Event delegation is too confusing, loose two points.')
    totalPoints -= 2
  } else if (nS == 7 || nS == 18){
    alert('React is super easy, earn six points.')
    totalPoints += 6
  }
  p.textContent = `${totalPoints} points`
  winner(totalPoints)
  
})


//////////////////////////////// helper functions 

const background = (imgUrl) =>{
  document.body.style.backgroundImage = `url(${imgUrl})`;
}

function winner(num){
  if (num >= 30 ){
    background('https://banner2.cleanpng.com/20180218/xge/kisspng-graduation-ceremony-free-content-clip-art-college-graduation-cliparts-5a89ba621cf799.1946926815189755861187.jpg')
    board.style.display ='none'
  

  }
}

fetch(usersUrl).then(res => res.json()).then(users => leaderBoard(users))
function leaderBoard(users){
  users.forEach(person => {
      const whoPlayed = person.username
      person.avatars.forEach(avatar => {
          line = document.createElement('h3')
          line.className = "lines"
          line.setAttribute('dataset', `${avatar.skills}`)
          line.innerText = `🔥${whoPlayed} as ${avatar.name} scored ${avatar.points} points in ${avatar.turns} turns`
          logIn.append(line)
      })
  })
}

const createUserUl = (username) =>{
 const ul = document.createElement('ul')
 ul.innerHTML =`
 <h1> Welcome ${username}</h1>
 <p> Here is your Avatar</p>
 `
 return ul
}



