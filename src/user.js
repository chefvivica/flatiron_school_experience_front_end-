const usersUrl = 'http://localhost:3000/users'
const avatarsUrl = 'http://localhost:3000/avatars'
let board = document.querySelector('#grid')
const h1 = document.querySelector('#header')
const logIn = document.querySelector('form')
const playButton = document.querySelector('.picked_avatar')
board.style.display = "none"
let allAvatarImage = []


// dice roll
const dice = document.querySelector('.dieBtn')
dice.addEventListener('click', function(e){
  const num = parseInt(document.querySelector('#die1').innerHTML)
  const dot = document.querySelector('.avatarCircle')
  const currentSquare = dot.parentElement.id
  const newSquare = parseInt(currentSquare) + num
  const destination = document.getElementById(newSquare)
  destination.appendChild(dot)
   const nS = destination.id
  if (nS == 13 || nS == 6){
    alert('Bundle Install, Start Again')
    document.getElementById(1).appendChild(dot)
  } else if (nS == 9 || nS == 15){
    alert('Internets not working, move back four spaces')
    document.getElementById(`${currentSquare} - 4`).appendChild(dot)
  } else if (nS == 13 || nS == 17 || nS == 20){
    alert('Congratulations! You passed the code challenge')
  } else if (nS == 6 || nS == 11){
    alert('Michelle explained something to you! Move forward an extra 3 steps')
    document.getElementById(`${nS} + 3`).appendChild(dot)
  } else if (nS == 12 || nS == 19){
    alert('Its blog week! Go back to the square you were at')
    document.getElementById(currentSquare).appendChild(dot)
  }
})

//use this function to change background
const background = (imgUrl) =>{
  document.body.style.backgroundImage = `url(${imgUrl})`;
}
  
fetch(usersUrl).then(res => res.json()).then(users => leaderBoard(users))
function leaderBoard(users){
  users.forEach(person => {
      const whoPlayed = person.username
      person.avatars.forEach(avatar => {
          line = document.createElement('h3')
          line.className = "lines"
          line.setAttribute('dataset', `${avatar.skills}`)
          line.innerText = `🔥${whoPlayed} as ${avatar.name} scored ${avatar.points} points gained ${avatar.skills} skills in ${avatar.turns} turns`
          logIn.append(line)
      })
  })
}




document.body.style.backgroundImage =  "url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQcyO7WgVaOZdHSuDkWuXeZGFtBYsY6pjzVLrv1Gk2kmONGljl9&usqp=CAU')";

const logInForm = document.querySelector('#logInForm')
document.addEventListener('click',e=>{
  e.preventDefault()
  switch(e.target.className){
    case("log_in"):
    board.style.display = 'none'
    logInForm.innerHTML = `
    <label for="user_name">Name</label>
    <input type="text" name="user[name]" id="user_name" placeholder="please enter your user name here"/>
    
    <input type="submit" name="commit" value="Go" class="log_in_btn" />
    `
    document.body.append(logInForm)
   
    break;

    case("log_in_btn"):
    const username = document.querySelector('input').value
    board.style.display = 'none'
    background("https://media3.giphy.com/media/yoJC2xC7FRU3D7yguY/giphy.gif?cid=ecf05e47ffbf69ba614324c6a378bfc815e1f8715f18e5c1&rid=giphy.gif")
    h1.style.display ='none'
    background("https://media1.giphy.com/media/3o7TKAW5scXkqmqTdK/200.webp?cid=ecf05e4704e31d4a3404cf2c2569491fdce225a4c6a9eb2d&rid=200.webp")
    const btn = document.querySelector('#log_in').style.display = "none"
    logInForm.style.display ="none"
    const pickAvatarBtn = document.createElement('button')
    pickAvatarBtn.className = 'pickAvatarBtn'
    pickAvatarBtn.textContent = 'Pick Your Avatar'
    document.body.append(pickAvatarBtn)
    /// welcome back message for returning players
    fetch(usersUrl).then(res => res.json()).then(users => users.forEach(user =>{
      if (user.username == username){ 
        const header = document.querySelector('div')
        header.innerHTML = `<h1 class='returningUser' id=${user.id}> Welcome Back ${username}!</h1><br><button class='picked_avatar'>Play</button>`
      } else {
        fetch(usersUrl, {
          method: 'POST', 
          headers: {
            "content-type": "application/json",
            accept: 'application/json'
          },
          body: JSON.stringify({
            username: username
          })
        }).then(res => res.json()).then(user => {const newUser = user.id}) )
      }
    }))

    break;

    case("pickAvatarBtn"):
    document.body.style.backgroundImage ='none'
    document.body.style.backgroundColor = "#9edee6"
    const avatarBtn = document.querySelector(".pickAvatarBtn").style.display = "none"
    const avatarDiv = document.createElement('div')
    avatarDiv.className = 'avatarSelectDiv'
  ////returning player has option of selecting from old avatars 
    const header =document.querySelector('h1')
    if (header.className == 'returningUser'){
        const returningPlayerId = document.querySelector('h1').id
      fetch(`${usersUrl}/${returningPlayerId}`).then(res => res.json()).then(player => {
        player.avatars.forEach(avatar => {
        const oldAvatarDiv = document.createElement('div')
        oldAvatarDiv.className = 'avatarSelectDiv'
        //// idk why the pictures are coming out weird maybe its my computer
        oldAvatarDiv.innerHTML =`<span id="${returningPlayerId} class="avatars"><img src="${avatar.image_url}"><br><h3 class='avatars' > ${avatar.name} | ${avatar.skills} Skills</h3><br><button class="${returningPlayerId}>Play As ${avatar.name}</button></span>`
        console.log(avatar.image_url)
        avatarDiv.append(oldAvatarDiv)
        })
        document.body.append(avatarDiv)
      })
    } else {      
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
  } 

    break;
    

    case ('avatars'):
      const source = e.target.parentElement
      const userID = source.id
      const pic = source.querySelector('img').src
      console.log(userID, pic)
      ////pulling out picture and user id from returning user just so we can have it to put in our board 

    break; 

    case('picked_avatar'):
    const pickedAv = document.querySelector('.pickedAvt')
    const pickedAvForm = document.querySelector('.pickedAvtForm')
    newAvatarName = pickedAvForm.name.value
    // pulling out the new avatar name from the form
    pickedAv.style.display = 'none'
    pickedAvForm.style.display = 'none'
    board.style.display = 'inline-grid'
    ///need post request to avatars 
    /// need to grab new user Id from line 109 
   console.log(newUser)

    const avCircle = document.createElement('span')
    avCircle.setAttribute('class','avatarCircle')
    console.log(avCircle)
    const startTile = document.getElementById(1)
    startTile.appendChild(avCircle)
    break;
  }

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
      <img src='${avt.children[0].src}'/>
      `
      const pickedAvtNameForm = document.createElement('form')
      pickedAvtNameForm.className = 'pickedAvtForm'
      pickedAvtNameForm.innerHTML = `
      <label for="avater_name">I am your avatar, please give me a name.</label><br><br>
      <input type="text" name="name" placeholder = "please give your avatar a name"/><br><br>
      <input type="submit" value="Play" class="picked_avatar"/>
      `
      document.body.append(pickedAvt)
      document.body.append(pickedAvtNameForm)

    }

  })


})
