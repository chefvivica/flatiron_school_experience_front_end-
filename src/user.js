//use this funcation to change background
const background = (imgUrl) =>{
  document.body.style.backgroundImage = `url(${imgUrl})`;
}

document.body.style.backgroundImage =  "url('https://secure.meetupstatic.com/photos/event/8/c/4/f/600_467315919.jpeg')";

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
