import React, { useCallback, useEffect, useRef, useState } from "react";
import { styles } from './styles';
import { View, Text, TextInput } from 'react-native'
import * as Utils from "./scripts";
import moment from "moment";

export default function TodoApp({
  filter, setFilter,
  displaySetting,
  currentDateObj
}) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0)
  const [selectedKey, setSelectedKey] = useState()
  const editTaskRef = useRef()

  const onSubmit = (e) => {
    e.preventDefault();
    const inputNode = e.target["todo-text"];
    const newTaskText = inputNode.value;
    const newTask = Utils.createTask(newTaskText, currentDateObj);
    setTasks((prev) => [...prev, newTask]);
    inputNode.value = "";
  };

  const onUpdateTask = (newVal, id, cb = () => { }) => {
    let isSuccess = Utils.updateTask(newVal, id);
    if (isSuccess) {
      onGetTask(filter);
      cb();
    }
  };

  const onGetTask = useCallback((currentFilter = filter) => {
    const res = Utils.getTask(
      currentFilter.limit,
      currentFilter.skip,
      currentFilter.searchText,
      currentFilter.filter,
      currentFilter.startDate,
      currentFilter.endDate
    );
    if (!res) {
      return;
    }
    setTasks(res.dataTask)
    setTotal(res.total)
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    onGetTask();
  }, [onGetTask]);

  const onScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const newSkip = filter.skip + 1
    if (
      scrollTop + clientHeight === scrollHeight &&
      filter.limit * newSkip < total
    ) {
      setFilter(prev => ({ ...prev, skip: newSkip }))
      const res = Utils.getTask(
        filter.limit,
        filter.skip,
        filter.searchText,
        filter.filter,
        filter.startDate,
        filter.endDate
      );
      if (!res) {
        return;
      }
      setTasks(prev => ([...prev, ...res.dataTask]))
    }
  }

  const onChangeFilter = (newFilter) => {
    setFilter(newFilter)
    onGetTask(newFilter)
  }

  const onDeleteTask = (id) => {
    Utils.deleteTask(id);
    onGetTask();
  }

  return (
    <View className="todo-app">
      <View className="todo-app-filter">
        <View className="title">
          <Text>Bộ lọc</Text>
        </View>
        <View className="status-wrapper">
          <View className="status">
            <Input
              type="checkbox"
              id="all"
              checked={filter.filter.isDone === undefined}
              onChange={() => {
                onChangeFilter({
                  ...filter,
                  filter: {
                    isDone: undefined
                  }
                })
              }}
            />
            <Text>
              Toàn bộ
            </Text>
          </View>
          <View className="status">
            <Input
              type="checkbox"
              id="done"
              checked={filter.filter.isDone === true}
              onChange={() => {
                onChangeFilter({
                  ...filter,
                  filter: {
                    isDone: true
                  }
                })
              }}
            />
            <Text htmlFor="done">
              Đã xong
            </Text>
          </View>
          <View className="status">
            <Input
              id="doing"
              type="checkbox"
              checked={filter.filter.isDone === false}
              onChange={() => {
                onChangeFilter({
                  ...filter,
                  filter: {
                    isDone: false
                  }
                })
              }}
            />
            <Text htmlFor="doing">
              Chưa xong
            </Text>
          </View>
        </View>
        <View className="search">
          <Input
            placeholder="Tìm kiếm"
            type="search"
            onKeyDown={e => {
              if (e.key === "Enter") {
                onChangeFilter({
                  ...filter,
                  searchText: e.target.value
                })
              }
            }}
          />
        </View>
      </View>

      {/* {
        displaySetting.indexOf("D") > -1 && (
          <form className="todo-app-form" onSubmit={onSubmit}>
            <input id="todo-text" placeholder="Nhập gì đó ..." required />
            <button type="submit">Tạo</button>
          </form>
        )
      } */}

      {/* <ul className="task-list" onScroll={onScroll}>
        {tasks.reverse().map((task) => (
          <li id={task.id} key={task.id} className="task">
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={(e) => onUpdateTask({ isDone: e.target.checked }, task.id)}
            />
            {
              displaySetting.indexOf("D") > -1 && (
                selectedKey === task.id ? (
                  <></>
                ) : (
                  <span className="task-action">
                    <span
                      onClick={() => {
                        setSelectedKey(task.id)
                        setTimeout(() => {
                          if (editTaskRef && editTaskRef.current) {
                            editTaskRef.current.value = task.Text
                            editTaskRef.current.focus()
                          }
                        }, 500)
                      }}
                    >✎</span>
                    <span
                      onClick={() => {
                        if (window.confirm('Bạn có chắc muốn xoá?')) {
                          onDeleteTask(task.id)
                        }
                      }}
                    >🗑</span>
                  </span>
                )
              )
            }
            <span className={`${task.isDone ? "task-done" : ""}`}>
              {
                selectedKey === task.id ? (
                  <input
                    type="text"
                    ref={editTaskRef}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        window.alert("Không được để trống")
                      } else {
                        onUpdateTask(
                          { Text: e.target.value },
                          task.id,
                          () => {
                            setSelectedKey()
                          }
                        )
                      }
                    }}
                  />
                ) : (
                  <span>{task.Text}</span>
                )
              }
              {
                displaySetting === "M" && (
                  <span>&nbsp;-&nbsp;{moment(task.datetime).format("DD/MM/YYYY")}</span>
                )
              }
            </span>
          </li>
        ))}
      </ul> */}
    </View>
  );
}
