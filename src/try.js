const usersUrl = 'http://localhost:3000/users'
const avatarsUrl = 'http://localhost:3000/avatars'
let board = document.querySelector('#grid')
const h1 = document.querySelector('#header')
const logInForm = document.querySelector('#logInForm')
const returningForm = document.querySelector('#returningForm')
const logInBtn = document.querySelector('#log_in')
const continueButton = document.querySelector('#return')
const logIn = document.querySelector('form')
const playButton = document.querySelector('.picked_avatar')
const notYetMsg = document.querySelector('.notYetMsg')
const audioBar = document.querySelector('.soundTrack')
notYetMsg.style.display = "none"
board.style.display = 'none'
audioBar.style.display = 'none'


const centerDisplayText = document.querySelector('#center-text')
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


// show the sign in form
logInBtn.addEventListener('click',e=>{
  continueButton.style.display = "none"
  logInForm.innerHTML = `
  <label for="user_name">Name</label>
  <input type="text" name="user[name]" id="user_name" placeholder="please enter your user name here"/>
  
  <input type="submit" name="commit" value="Go" class="log_in_btn" />
  `  
})

//case 2 user is a returning user
continueButton.addEventListener('click', function(e){
  e.preventDefault()
  logInBtn.style.display = 'none'
  continueButton.style.display = 'none'
  logIn.style.display = "none"
  returningForm.innerHTML = `
    <label for="user_name">Name</label>
    <input type="text" name="user[name]" id="return_user" placeholder="please enter your user name here"/>
    
    <input type="submit" name="commit" value="Go" class="log_in_btn" />
    `
    
  })
returningForm.addEventListener('submit', e =>{
  e.preventDefault()
  const returningUser = document.querySelector('input').value
  greetingReturning(returningUser)
})

const greetingReturning = returningUser =>{
  returningForm.style.display ="none"
  h1.style.display = 'none'
  const header = document.querySelector('div')
  header.id = 'oldAvt'

  fetch(usersUrl).then(res => res.json()).then(users => users.forEach(user =>{
    if(user.username == returningUser){
      header.innerHTML = `
      <h1 class='returningUser' id=${user.id}> Welcome Back ${user.username}!</h1><br>
      <h2> Here are your Avatars History</h2>
      <ul id='returnAvt'></ul>
      <button id="restart" data-name="${user.username}"> Start A New Game </button>
      `
      user.avatars.forEach(avt =>{
        const div = document.createElement('div')
        div.dataset.id = avt.id
        div.innerHTML = `
        <p>Avtar Name : ${avt.name}</p>
        <img src = ${avt.image_url}/>
        <p> Total point : ${avt.points}
        `
        const ul = document.querySelector('#returnAvt')
        ul.append(div)
        const btn = document.querySelector('#restart')
        btn.addEventListener('click', e=>{
          window.location.href = "./index.html?user%5Bname%5D=aaa&commit=Go"
        })
      })
    }
  }))
} 



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
  // fetch(usersUrl, {
  //   method: 'POST', 
  //   headers: {
  //     "content-type": "application/json",
  //     "accept": 'application/json'
  //   },
  //   body: JSON.stringify({
  //     username: username
  //   })
  // }).then(res => res.json()).then(user => userID = user.id)
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

  const pickedAvForm = document.querySelector('.pickedAvtForm')
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
    }).then(res => res.json()).then(res => avatarID = res.id)


  console.log(avatarID)

  pickedAv.style.display = 'none'
  pickedAvForm.style.display = 'none'
  board.style.display = 'inline-grid'
  audioBar.style.display = "block"

  const avCircle = document.createElement('span')
  avCircle.setAttribute('class','avatarCircle')

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
  rollDice()
  movePlayerPiece()

})


//////////////////////////////// helper functions 

const background = (imgUrl) =>{
  document.body.style.backgroundImage = `url(${imgUrl})`;
}

function winner(num){
  if (num >= 30 ){
    background('https://g.foolcdn.com/editorial/images/564190/winner.jpg')
    board.style.display ='none'
    audioBar.style.display ='none'
    document.querySelector('#userInfo').remove()

  

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

function rollDice(){
  let die1 = document.getElementById('die1')
  let status = document.getElementById('status')
  let d1 = Math.floor(Math.random() * 6) + 1
  let diceTotal = d1
  die1.innerHTML = d1
}

function movePlayerPiece(){
    
  const dot = document.querySelector('.avatarCircle')
  const idOfCurrentTile = parseInt(document.querySelector('.avatarCircle').parentNode.id)
  let rollNumber = parseInt(die1.textContent)
  let idOfTileToMoveTo = idOfCurrentTile + rollNumber

  if (!(idOfTileToMoveTo > 20)){
      notYetMsg.style.display = 'none'
      dot.remove()
      let tileToMoveTo = document.getElementById(`${idOfTileToMoveTo}`)
      tileToMoveTo.appendChild(dot)

      showTileEvents()
      
      function showTileEvents(){
          let eventMessage = document.querySelector('.h4-msg')
          let statusChange = document.querySelector('.h5-msg')

          if (idOfTileToMoveTo === 2){
              eventMessage.textContent = "You resolved an error by visiting Stack OverFlow!"
              statusChange.textContent = "Points + 2"
              totalPoints += 2
          } else if (idOfTileToMoveTo === 3){
              eventMessage.textContent = "You hung out with your cohort!"
              statusChange.textContent = "Points + 1"
              totalPoints += 1
          } else if (idOfTileToMoveTo === 4){
              eventMessage.textContent = "You installed an outdated extension. It caused bugs!"
              statusChange.textContent = "Points - 2"
              totalPoints -= 2
          } else if (idOfTileToMoveTo === 5){
  
              eventMessage.textContent = "Michelle explained some complex code to you."
              statusChange.textContent = "Points + 3"
              totalPoints += 3
          } else if (idOfTileToMoveTo === 6){
              eventMessage.textContent = "You asked a coach for help on your code!"
              statusChange.textContent = "Points + 3"
              totalPoints += 3
          } else if (idOfTileToMoveTo === 7){
              eventMessage.textContent = "You took a break from code... and realized a silly error."
              statusChange.textContent = "Points + 1"
              totalPoints += 1
          } else if (idOfTileToMoveTo === 8){
              eventMessage.textContent = "Your environment wasn't set up correctly!"
              statusChange.textContent = "Points - 4"
              totalPoints -= 4
          } else if (idOfTileToMoveTo === 9){
              //add skills check
              eventMessage.textContent = "You made it through another lecture!"
              statusChange.textContent = "Points + 3"
              totalPoints += 3
          } else if (idOfTileToMoveTo === 10){
              eventMessage.textContent = "You attended a review session!"
              statusChange.textContent = "Points + 4"
              totalPoints += 4
          } else if (idOfTileToMoveTo === 11){
              eventMessage.textContent = "The new Rails labs are all code-alongs."
              statusChange.textContent = "Points + 2"
              totalPoints += 2
          } else if (idOfTileToMoveTo === 12){
              eventMessage.textContent = "You installed an outdated extension. It caused bugs!"
              statusChange.textContent = "Points - 2"
              totalPoints -= 2
          } else if (idOfTileToMoveTo === 13){
              //add skills check
              eventMessage.textContent = "You converted coffee into code!"
              statusChange.textContent = "Points + 2"
              totalPoints += 2
          } else if (idOfTileToMoveTo === 14){
              eventMessage.textContent = "You asked a coach for help on your code!"
              statusChange.textContent = "Coding Knowledge + 3"
              totalPoints += 3
          } else if (idOfTileToMoveTo === 15){
              eventMessage.textContent = "You took a break from code... and realized a silly error."
              statusChange.textContent = "Points + 2"
              totalPoints += 2
          } else if (idOfTileToMoveTo === 16){
              eventMessage.textContent = "Event delegation is too confusing!"
              statusChange.textContent = "Points - 2"
              totalPoints -= 2
          } else if (idOfTileToMoveTo === 17){
              //add skills check
              eventMessage.textContent = "Pairing lab was super hard but you got through it"
              statusChange.textContent = "Points + 4"
              totalPoints += 4
          } else if (idOfTileToMoveTo === 18){
              eventMessage.textContent = "You attended a review session...but fell asleep."
              statusChange.textContent = "Points - 4"
              totalPoints -= 4
          } else if (idOfTileToMoveTo === 19){
              eventMessage.textContent = `React turns out to be "super easy"`
              statusChange.textContent = "Points + 4"
              totalPoints += 4
          } else if (idOfTileToMoveTo === 20){
              //add graduation eligibility check
              eventMessage.textContent = "You passed a code challenge!"
              statusChange.textContent = "Points + 5"
              totalPoints += 5
          } else if (totalPoints > 30){
            winner(totalPoints)
          }
          console.log(totalPoints)
          p.textContent = `${totalPoints} points`
          fetch(`${avatarsUrl}/${avatarID}`, {
            method: 'PATCH',
            headers: {
              "content-type": "application/json",
              accept: "application/json"
            }, body: JSON.stringify({
              points: totalPoints
            })
          })
      }
  } else {
      const startTile = document.getElementById('1')
      startTile.appendChild(dot) 
      notYetMsg.style.display = 'inline-grid'
  }
  // p.textContent = `${totalPoints} points`
  // fetch(`${avatarsUrl}/${avatarID}`, {
  //   method: 'PATCH',
  //   headers: {
  //     "content-type": "application/json",
  //     accept: "application/json"
  //   }, body: JSON.stringify({
  //     points: totalPoints
  //   })
  // }).then(res => res.json()).then(res => console.log(res))

  winner(totalPoints)
}


