const logInForm = document.querySelector('#logInForm')
document.addEventListener('click',e=>{
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
    
  }

})
