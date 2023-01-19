// import { storedTasks } from "./localStore.js";

const byResetIndex = (storedArr)=>{
    const resetingArr = []
        storedArr.forEach(task => {
            console.log(task);
            const fixedTaskId = { ...task, index: resetingArr.length + 1 };
            resetingArr.push(fixedTaskId);
            localStorage.setItem('taskstored', JSON.stringify(resetingArr));
        })
    
}

export {byResetIndex}