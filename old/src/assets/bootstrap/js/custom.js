$(document).ready(function(){
  $('[data-toggle="popover"]').popover();
});


const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

if(signUpButton !== null){
  signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
  });
}

if(signInButton !== null) {
  signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
  });
}
