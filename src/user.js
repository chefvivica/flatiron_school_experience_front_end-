
//use this funcation to change background
const background = (imgUrl) =>{
  document.body.style.backgroundImage = `url(${imgUrl})`;
}

const ursersUrl = 'http://localhost:3000/users'
const avatarsUrl = 'http://localhost:3000/avatars'
const board = document.querySelector('#board')

function leaderBoard(array){
  // board.createElement('h1').innerHTML = 'Alumni Board'
  array.forEach(person => {
     const whoPlayed = person.username
     person.avatars.forEach(avatar => {
         line = document.createElement('h3')
         line.setAttribute('dataset', `${avatar.skills}`)
         line.setAttribute('class','robot')
         line.innerText = `${whoPlayed} as ${avatar.name} scored ${avatar.points} points gained ${avatar.skills} skills in ${avatar.turns} turns`
         board.appendChild(line)
     })
 })
}

fetch(ursersUrl).then(res => res.json()).then(users => leaderBoard(users))


// use this funcation to change background

const background = (imgUrl) =>{
  document.body.style.backgroundImage = `url(${imgUrl})`;
}


  /// our leader board can be up for like 5-7 seconds before user is prompted to sign in
fetch(ursersUrl).then(res => res.json()).then(users => leaderBoard(users))
function leaderBoard(users){
  users.forEach(person => {
      const whoPlayed = person.username
      person.avatars.forEach(avatar => {
          line = document.createElement('h3')
          line.setAttribute('dataset', `${avatar.skills}`)
          line.innerText = `${whoPlayed} as ${avatar.name} scored ${avatar.points} points gained ${avatar.skills} skills in ${avatar.turns} turns`
          board.append(line)
      })
  })
}






//starting here
document.body.style.backgroundImage =  "url('https://cdn.dribbble.com/users/8894/screenshots/3370036/flatiron-school_gif.gif')";

const logInForm = document.querySelector('#logInForm')
document.addEventListener('click',e=>{
  e.preventDefault()
  switch(e.target.className){
    case("log_in"):
    logInForm.innerHTML = `
    <label for="user_name">Name</label>
    <input type="text" name="user[name]" id="user_name" placeholder="please enter your user name here"/>
    
    <input type="submit" name="commit" value="Go" class="log_in_btn" />
    `
    document.body.append(logInForm)
   
    break;

    case("log_in_btn"):
    board.style.display = 'none'
    background("https://media3.giphy.com/media/yoJC2xC7FRU3D7yguY/giphy.gif?cid=ecf05e47ffbf69ba614324c6a378bfc815e1f8715f18e5c1&rid=giphy.gif")
    const btn = document.querySelector('#log_in').style.display = "none"
    logInForm.style.display ="none"
    const pickAvatarBtn = document.createElement('button')
    pickAvatarBtn.className = 'pickAvatarBtn'
    pickAvatarBtn.textContent = 'Pick Your Avatar'
    document.body.append(pickAvatarBtn)
    break;

    case("pickAvatarBtn"):
    document.body.style.backgroundImage ='none'
    document.body.style.backgroundColor = "#9edee6"
    const avatarBtn = document.querySelector(".pickAvatarBtn").style.display = "none"
    const avatarDiv = document.createElement('div')
    avatarDiv.className = 'avatarSelectDiv'
    avatarDiv.innerHTML =`
    <span class="avatars"><img src = './img/avt1.png'/></span>
    <span class="avatars"><img src = './img/avt2.png'/></span>
    <span class="avatars"><img src = './img/avt3.png'/></span>
    <span class="avatars"><img src = './img/avt4.png'/></span>
    <span class="avatars"><img src = './img/avt5.png'/></span>
    <span class="avatars"><img src = './img/avt6.png'/></span>
    <span class="avatars"><img src = './img/avt7.png'/></span>
    `
    document.body.append(avatarDiv)
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
      <input type="text" name="avatar['name']" placeholder = "please give your avatar a name"/><br><br>
      <input type="submit" value="submit" class="picked_avatar"/>
      `
      document.body.append(pickedAvt)
      document.body.append(pickedAvtNameForm)

    }

  })


})
