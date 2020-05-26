document.addEventListener('DOMContentLoaded', function(e){

const usersUrl = 'http://localhost:3000/users'
const avatarsUrl = 'http://localhost:3000/avatars'
const board = document.querySelector('#grid')






// clear leaderboard screen goes to sign in prompt
function clearLeaderBoard(){
    const header = document.createElement('h1').innerHTML = 'Welcome to flatiron-school-experience-game'
    board.innerHTML = '<h3> Please Create New Username or Sign In </h3>' 
    board.id = "leader-board"
    const signIn = document.createElement('input')
    signIn.setAttribute('placeholder', 'your name')
    const button = document.createElement('button', 'submit')
    button.innerHTML = 'Submit'
    board.appendChild(header)
    board.appendChild(signIn)
    board.appendChild(button)
   //// fetch request for the avatars matching this persons id
   //// or post request creating user 
}

/// our leader board can be up for like 5-7 seconds before user is prompted to sign in
function leaderBoard(array){

    document.querySelector('h1').innerHTML = 'Alumni Board'
    array.forEach(person => {
        const whoPlayed = person.username
        person.avatars.forEach(avatar => {
            line = document.createElement('h3')
            line.setAttribute('dataset', `${avatar.skills}`)
            line.innerText = `${whoPlayed} as ${avatar.name} scored ${avatar.points} points gained ${avatar.skills} skills in ${avatar.turns} turns`
            board.append(line)
        })
    })

   board.createElement('h1').innerHTML = 'Alumni Board'
   array.forEach(person => {
      const whoPlayed = person.username
      person.avatars.forEach(avatar => {
          line = document.createElement('h3')
          line.setAttribute('dataset', `${avatar.skills}`)
          line.innerText = `${whoPlayed} as ${avatar.name} scored ${avatar.points} points gained ${avatar.skills} skills in ${avatar.turns} turns`
          board.append(line)
      })
  })

}

fetch(usersUrl).then(res => res.json()).then(users => leaderBoard(users))

//leaderboard only lasts 6 seconds on the page 
window.setTimeout(clearLeaderBoard, 6000)



})