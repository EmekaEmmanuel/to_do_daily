import './style.css';
import ToDoRecord from './taskHandler.js';
import refreshImg from './img/Refresh_icon.svg.png';
import arrowIconImg from './img/favpng_arrow-icon-design.png';

const appContainer = document.querySelector('.app_container');

const appContainerTemplate = () => `
    <header class="header_section innerspace">
    <li class="font1">Today's To Do</li>
    <li class="appendrefresh">
      <img class="refresh_img" src=${refreshImg} alt="">
    </li>
  </header>

  <main>
    <form class="todo_form">
      <fieldset class="border_none">
        <input class="description_input todo_form_input font2 border_none" type="text" placeholder="Add to your list..."
          required>
      </fieldset>
      <fieldset class="border_none">
        <button class="border_none"><img src=${arrowIconImg} alt=""></button>
      </fieldset>
    </form>

    <div class="empty_todo_tasks"></div>

    <div class="itemBox">
      
    </div>
  </main>

  <footer class="todo_footer">
    <p class="clear_all font4">Clear all completed</p>
  </footer>
</section>
`;

appContainer.innerHTML = appContainerTemplate();

const description = document.querySelector('.description_input');
const refreshIcon = document.querySelector('.refresh_img');

const form = document.querySelector('.todo_form');

const newToDoRec = new ToDoRecord();

const clearallBtn = document.querySelector('.clear_all');

clearallBtn.addEventListener('click', () => {
  newToDoRec.clearAll();
});

refreshIcon.addEventListener('click', () => {
  newToDoRec.displayToDoRecord();
});

const clearInputFields = (description) => {
  description.value = '';
};

window.addEventListener('load', () => {
  newToDoRec.displayToDoRecord();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  newToDoRec.addNewTask(description);
  clearInputFields(description);
});