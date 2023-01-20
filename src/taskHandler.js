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
            <input ${storingparam[i].completed === true ? 'checked' : ''} value=${storingparam[i].completed} checkbox_index=${i} class="border_none checkbox_tag checkbox_${i}" type="checkbox">
            <input class="input_${i} border_none hide font3" data-inputID="${i}" type="text" value=${storingparam[i].description} required> 
            <p descId='${i}' class="describ line_through_${i} ${storingparam[i].completed === true ? 'rule_line_through' : ''} font3">${storingparam[i].description}</p>
        </fieldset>
  
        <figure>
            <span class="dots_${i} hide">&#8230;</span>
            <img class="bin_${i} remove_btn" index=${storingparam[i].index} src=${trashBinImg} alt="">
        </figure>
        </article>  `;
      }
      listBody.innerHTML = eachList;
      listBody.addEventListener('click', (e) => {
        const checkClickedBtn = e.target.classList.contains('remove_btn');
        const checkEditBtn = e.target.classList.contains('describ');
        const checkCheckBox = e.target.classList.contains('checkbox_tag');
        if (checkClickedBtn) {
          const clicked = e.target;
          this.removeToDo(clicked);
        }
        if (checkEditBtn) {
          const clickCheckEditBtn = e.target;
          this.updateDescriptions(clickCheckEditBtn);
        }
        if (checkCheckBox) {
          const clickCheckBoxBtn = e.target;
          this.updateTaskStatus(clickCheckBoxBtn);
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
    this.clearEmptyLocalStorage();
  }

  updateDescriptions(clickCheckEditBtn) {
    const editBtnAttribut = clickCheckEditBtn.getAttribute('descId');
    const getEditInputTag = document.querySelector(`.input_${editBtnAttribut}`);
    const getTripleDotsTag = document.querySelector(`.dots_${editBtnAttribut}`);
    const getBinImgTag = document.querySelector(`.bin_${editBtnAttribut}`);
    getEditInputTag.classList.remove('hide');
    getEditInputTag.value = clickCheckEditBtn.innerHTML;
    clickCheckEditBtn.classList.add('hide');
    getTripleDotsTag.classList.remove('hide');
    getBinImgTag.classList.add('hide');
    getEditInputTag.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.storedTasks[editBtnAttribut].description = getEditInputTag.value;
        localStorage.setItem('taskstored', JSON.stringify(this.storedTasks));
        const storingparam = this.storedTasks;
        byResetIndex(storingparam);
        this.displayToDoRecord();
        getEditInputTag.classList.add('hide');
        clickCheckEditBtn.classList.remove('hide');
        getBinImgTag.classList.remove('hide');
        getTripleDotsTag.classList.add('hide');
      }
    });
  }

  updateTaskStatus(clickCheckBoxBtn) {
    const checkBoxindex = clickCheckBoxBtn.getAttribute('checkbox_index');
    const ruleLinethrough = document.querySelector(`.line_through_${checkBoxindex}`);
    clickCheckBoxBtn.addEventListener('change', () => {
      if (clickCheckBoxBtn.checked === true) {
        this.storedTasks[checkBoxindex].completed = true;
        ruleLinethrough.style.textDecoration = 'line-through #04aa6d solid 2px';
        localStorage.setItem('taskstored', JSON.stringify(this.storedTasks));
      }
      if (clickCheckBoxBtn.checked === false) {
        this.storedTasks[checkBoxindex].completed = false;
        ruleLinethrough.style.textDecoration = 'none';
        localStorage.setItem('taskstored', JSON.stringify(this.storedTasks));
      }
    });
  }

  clearAll() {
    const filteredTasks = this.storedTasks.filter(
      (task) => task.completed !== true,
    );
    this.storedTasks = filteredTasks;
    localStorage.setItem('taskstored', JSON.stringify(this.storedTasks));
    const storingparam = this.storedTasks;
    byResetIndex(storingparam);
    this.displayToDoRecord();
    this.clearEmptyLocalStorage();
  }

  clearEmptyLocalStorage() {
    const empty = document.querySelector('.empty_todo_tasks');
    if (this.storedTasks.length === 0) {
      localStorage.removeItem('taskstored');
      empty.style.display = 'block';
    }
  }
}