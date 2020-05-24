document.addEventListener('DOMContentLoaded', function(e){

const ursersUrl = 'http://localhost:3000/users'
const avatarsUrl = 'http://localhost:3000/avatars'


function leaderBoard(array){
   

}


fetch(ursersUrl).then(res => res.json()).then(users => console.log(users))



})