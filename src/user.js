
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

document.body.style.backgroundImage =  "url('https://secure.meetupstatic.com/photos/event/8/c/4/f/600_467315919.jpeg')";

const logInForm = document.querySelector('#logInForm')
document.addEventListener('click',e=>{
  board.innerHTML = ' '
  e.preventDefault()
  switch(e.target.className){
    case("log_in"):
    logInForm.innerHTML = `
    <label for="user_name">Name</label>
    <input type="text" name="user[name]" id="user_name" placeholder="please enter your user name here"/>
    
    <input type="submit" name="commit" value="go" class="log_in_btn" />
    </form> `
    document.body.append(logInForm)
    break;

    case("log_in_btn"):
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
    <span class="avatar_pic"><img src = './img/avt1.png'/></span>
    <span class="avatar_pic"><img src = './img/avt2.png'/></span>
    <span class="avatar_pic"><img src = './img/avt3.png'/></span>
    <span class="avatar_pic"><img src = './img/avt4.png'/></span>
    <span class="avatar_pic"><img src = './img/avt5.png'/></span>
    <span class="avatar_pic"><img src = './img/avt6.png'/></span>
    <span class="avatar_pic"><img src = './img/avt7.png'/></span>
   

    `
    document.body.append(avatarDiv)
  }

  // const getAvatar = () =>{
  //   fetch()
  // }

})
