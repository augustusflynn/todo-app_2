import moment from "moment";
import fs from 'react-native-fs';

const PATH = fs.DocumentDirectoryPath + '/DB.txt';

// @type Task {
//   id: Number;
//   label: String;
//   isDone: Boolean;
//   datetime: Date;
// }

export const createTask = async (text, date) => {
  let dataTask = await _getTask();
  const newTask = {
    id: dataTask.length,
    label: text,
    isDone: false,
    datetime: date.toDate().toISOString()
  };
  dataTask.push(newTask);
  _storeTask(dataTask);
  return newTask;
};

export const updateTask = async (data, id) => {
  let dataTask = await _getTask();
  const taskIndex = dataTask.findIndex((_task) => _task.id === id);
  if (taskIndex > -1) {
    dataTask[taskIndex] = {
      ...dataTask[taskIndex],
      ...data
    };
    _storeTask(dataTask);
    return true;
  }
  return false;
};

export const getTask = async (limit, skip, searchText, filter = {}, startDate, endDate) => {
  let dataTask = await _getTask();
  const start = limit * skip;
  const end = start + limit;
  if (start > dataTask.length) {
    return undefined;
  }
  if (searchText) {
    dataTask = dataTask.filter(
      (_task) => _task.label.indexOf(searchText) > -1
    );
  }
  let result = [];
  if (filter && Object.keys(filter).length > 0) {
    for (let key in filter) {
      for (let task of dataTask) {
        if (key === 'isDone' && filter[key] === undefined) {
          result.push(task);
        } else if (task[key] === filter[key]) {
          result.push(task);
        }
      }
    }
  } else {
    result = dataTask;
  }

  if (startDate) {
    result = result.filter(_task => {
      if (moment(startDate).toISOString() <= new Date(_task.datetime).toISOString()) {
        return true
      }
      return false;
    });
  }

  if (endDate) {
    result = result.filter(_task => {
      if (moment(endDate).toISOString() >= new Date(_task.datetime).toISOString()) {
        return true
      }
      return false;
    });
  }
  result.sort((a, b) => a.id - b.id);
  result = result.slice(start, end);
  return { dataTask: result, total: result.length };
};

export const checkIsDoneAllTask = async (startDate, endDate) => {
  let dataTask = await _getTask();

  if (startDate) {
    dataTask = dataTask.filter(_task => {
      if (moment(startDate).toISOString() <= new Date(_task.datetime).toISOString()) {
        return true
      }
      return false;
    });
  }

  if (endDate) {
    dataTask = dataTask.filter(_task => {
      if (moment(endDate).toISOString() >= new Date(_task.datetime).toISOString()) {
        return true
      }
      return false;
    });
  }
  const dataTaskDone = dataTask.filter(_task => _task.isDone);
  return (dataTask.length > 0 && dataTask.length === dataTaskDone.length);
}

export const deleteTask = async (id) => {
  let dataTask = await _getTask();
  dataTask = dataTask.filter(_task => _task.id !== id);
  _storeTask(dataTask);
}

const _storeTask = (dataTask) => {
  fs.writeFile(PATH, JSON.stringify(dataTask), 'utf8')
    .then(console.info)
    .catch(console.error);
};

const _getTask = async () => {
  return fs.readFile(PATH, "utf8")
    .then((content) => {
      return JSON.parse(content || "[]")
    });
}