const ursersUrl = 'http://localhost:3000/users'
const avatarsUrl = 'http://localhost:3000/avatars'
const board = document.querySelector('#board')
const h1 = document.querySelector('#header')

//use this funcation to change background
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
          line.className = "lines"
          line.setAttribute('dataset', `${avatar.skills}`)
          line.innerText = `🔥${whoPlayed} as ${avatar.name} scored ${avatar.points} points gained ${avatar.skills} skills in ${avatar.turns} turns`
          board.append(line)
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
    h1.style.display ='none'
    background("https://media1.giphy.com/media/3o7TKAW5scXkqmqTdK/200.webp?cid=ecf05e4704e31d4a3404cf2c2569491fdce225a4c6a9eb2d&rid=200.webp")
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
