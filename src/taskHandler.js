import ToDo from './modules/toDo.js';
import storedTasks from './modules/localStore.js';
import trashBinImg from './img/trashbin.png';
import byResetIndex from './modules/manipulateStore.js';

export default class ToDoRecord {
  constructor() {
    this.storedTasks = storedTasks;
  }

  addNewTask(description) {
    if (!this.storedTasks) {
      this.storedTasks = [];
    }
    const tasksLength = this.storedTasks.length + 1;
    const newToDo = new ToDo(description.value, false, tasksLength);
    this.storedTasks.push(newToDo);
    localStorage.setItem('taskstored', JSON.stringify(this.storedTasks));
    const storingparam = this.storedTasks;
    byResetIndex(storingparam);
    this.displayToDoRecord();
  }

  displayToDoRecord() {
    const empty = document.querySelector('.empty_todo_tasks');
    const listBody = document.querySelector('.itemBox');
    if (!this.storedTasks) {
      empty.innerHTML = 'No current task being tracked';
    } else {
      empty.style.display = 'none';
      let eachList = '';
      const storingparam = this.storedTasks;
      byResetIndex(storingparam);
      for (let i = 0; i < storingparam.length; i += 1) {
        eachList
          += `<article key=${storingparam[i].index} class=" todo_item">
            <fieldset class="border_none">
            <input class="border_none" type="checkbox">
            <input class="input_${i} border_none hide font3" data-inputID="${i}" type="text" value=${storingparam[i].description} required> 
            <p descId='${i}' class="describ font3">${storingparam[i].description}</p>
        </fieldset>
  
        <figure>
            <!-- <span>&#8230;</span> -->
            <img class="remove_btn" index=${storingparam[i].index} src=${trashBinImg} alt="">
        </figure>
        </article>  `;
      }
      listBody.innerHTML = eachList;
      listBody.addEventListener('click', (e) => {
        const checkClickedBtn = e.target.classList.contains('remove_btn');
        const checkEditBtn = e.target.classList.contains('describ');
        if (checkClickedBtn) {
          const clicked = e.target;
          this.removeToDo(clicked);
        }
        if (checkEditBtn) {
          const clickCheckEditBtn = e.target;
          this.updateDescriptions(clickCheckEditBtn);
        }
      });
    }
  }

  removeToDo(clicked) {
    const index = clicked.getAttribute('index');
    const filteredTasks = this.storedTasks.filter((task) => task.index.toString() !== index);
    this.storedTasks = filteredTasks;
    localStorage.setItem('taskstored', JSON.stringify(this.storedTasks));
    const storingparam = this.storedTasks;
    byResetIndex(storingparam);
    this.displayToDoRecord();
  }

  updateDescriptions(clickCheckEditBtn) {
    const editBtnAttribut = clickCheckEditBtn.getAttribute('descId');
    const getEditInputTag = document.querySelector(`.input_${editBtnAttribut}`);
    getEditInputTag.classList.remove('hide');
    clickCheckEditBtn.classList.add('hide');
    getEditInputTag.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.storedTasks[editBtnAttribut].description = getEditInputTag.value;
        localStorage.setItem('taskstored', JSON.stringify(this.storedTasks));
        const storingparam = this.storedTasks;
        byResetIndex(storingparam);
        this.displayToDoRecord();
        getEditInputTag.classList.add('hide');
        clickCheckEditBtn.classList.remove('hide');
      }
    });
  }
}