const byResetIndex = (storedArr) => {
  const resetingArr = [];
  storedArr.forEach((task) => {
    const fixedTaskId = { ...task, index: resetingArr.length + 1 };
    resetingArr.push(fixedTaskId);
    localStorage.setItem('taskstored', JSON.stringify(resetingArr));
  });
};

export default byResetIndex;