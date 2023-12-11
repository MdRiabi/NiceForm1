// Questions Array
const questions = [
    { question: 'Enter Your First Name' },
    { question: 'Enter Your Last Name' },
    { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
    { question: 'Create A Password', type: 'password' }
  ];


const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // Transition Between Questions

// Init Position At First Question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');


//Event to load the page 
document.addEventListener("DOMContentLoaded", getQuestion);

// next button click
nextBtn.addEventListener('click', validate)
// input field enter Click
inputField.addEventListener('keyup', (e) => {
  if(e.key === "Enter"){
    validate();
  }
});

//function 
function getQuestion(){

  // get current question
  inputField.innerHTML = questions[position].question;

  // get current type
  inputField.type = questions[position].type || 'text';

  //get current Answer
  inputField.value = questions[position].answer || '';
  
  //focus on Element
  inputField.focus();

  // set progress bar width - variable to the questions length
  progress.style.width = (position * 100) / questions.length + '%';

  // add user icon or arrow depending on a questtion 

  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();

}

// display question to user
function showQuestion(){
  // change the style of inputGroup, inputProgress
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;

}

//transform to create shake motion
function transform(x, y){

  formBox.style.transform = ` translate(${x}px, ${y}px)`;
}

//validate field
function validate(){

  // make sure pattern matches if there is one 
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    
    inputFail();

  }else{
    inputPass();
  }
}

function inputFail(){

  formBox.className = 'error';
  // repeat shake motion - set i to number of shakes
  for(let i = 0 ; i<6 ; i++){
    setTimeout(transform , shakeTime*i, ((i%2)*2-1)*20, 0);
    setTimeout(transform, shakeTime*6,0,0);
    inputField.focus();
  }
}

function inputPass(){

  formBox.className = '';
  setTimeout(transform, shakeTime*0, 0,10);
  setTimeout(transform, shakeTime*10, 0 , 0);

  // store anwser in array
  questions[position].answer = inputField.value;
  // increment the position index
  position++;

  //if a new question, hide current and get next
  if (questions[position]) {

    hideQuestion();
    getQuestion();
  } else{
    //remove if no more questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    //form complete 
    formComplete();

  }

}

//hide question from user

function hideQuestion(){

  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}
function formComplete(){

  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(
    document.createTextNode(`Thanks ${questions[0].answer} You are registred and will get an email shortly`)
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);

}

