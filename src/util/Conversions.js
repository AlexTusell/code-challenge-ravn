import {
  format,
  isAfter,
  isSameDay,
  isTomorrow,
  isYesterday,
  sub,
} from 'date-fns';

const orderList = ['BACKLOG', 'CANCELLED', 'TODO', 'IN_PROGRESS', 'DONE'];

export const numbersEstimatedPoints = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  FOUR: 4,
  EIGHT: 8,
};

export const formatDate = (date) => {
  const dateNow = new Date();
  const dateParsed = Date.parse(date);

  if (isSameDay(dateParsed, dateNow)) return 'Today';
  if (isTomorrow(dateParsed, dateNow)) return 'Tomorrow';
  if (isYesterday(dateParsed, dateNow)) return 'Yesteday';
  return format(Date.parse(date), 'PP');
};

export const taskTimeIndicator = (date) => {
  if (isAfter(new Date(), new Date(date))) {
    return 'orange';
  } else if (isAfter(new Date(), sub(new Date(date), { days: 2 }))) {
    return 'yellow';
  } else {
    return 'white';
  }
};

export const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTask = Array.from(sourceCol.tasks);
  const [removed] = newTask.splice(startIndex, 1);
  newTask.splice(endIndex, 0, removed);

  return newTask;
};

export const columnOrder = (dataTasks) => {
  const columns = [];
  for (const key of orderList) {
    const newColumn = {};
    newColumn.status = key;
    newColumn.tasks = dataTasks.tasks.filter((task) => task.status === key);
    columns.push(newColumn);
  }

  return columns;
};
