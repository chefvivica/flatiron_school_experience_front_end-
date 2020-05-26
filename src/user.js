const ursersUrl = 'http://localhost:3000/users'
const avatarsUrl = 'http://localhost:3000/avatars'
let board = document.querySelector('#grid')
const h1 = document.querySelector('#header')
const logIn = document.querySelector('form')
const playButton = document.querySelector('.picked_avatar')
board.style.display = "none"


//use this funcation to change background
const background = (imgUrl) =>{
  document.body.style.backgroundImage = `url(${imgUrl})`;
}


fetch(ursersUrl).then(res => res.json()).then(users => leaderBoard(users))
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
    fetch(ursersUrl).then(res => res.json()).then(users => users.forEach(user =>{
      if (user.username == username){ 
        const heaer = document.querySelector('div')
        heaer.innerHTML = `<h1 class='returningUser' id=${user.id}> Welcom Back ${username}!</h1>`
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
       fetch(`${ursersUrl}/${returningPlayerId}`).then(res => res.json()).then(player => {
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
    <span class="avatars"><img src = './img/avt1.png'/></span>
    <span class="avatars"><img src = './img/avt2.png'/></span>
    <span class="avatars"><img src = './img/avt3.png'/></span>
    <span class="avatars"><img src = './img/avt4.png'/></span>
    <span class="avatars"><img src = './img/avt5.png'/></span>
    <span class="avatars"><img src = './img/avt6.png'/></span>
    <span class="avatars"><img src = './img/avt7.png'/></span>
    `
    document.body.append(avatarDiv) }
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
    console.log(pickedAv)
    pickedAv.style.display = 'none'
    pickedAvForm.style.display = 'none'
    board.style.display = 'inline-grid'
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
      <input type="submit" value="Play" class="picked_avatar"/>
      `
      document.body.append(pickedAvt)
      document.body.append(pickedAvtNameForm)

    }

  })


})
