import React, { useCallback, useEffect, useRef, useState } from "react";
import { styles } from './styles';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, FlatList } from 'react-native'
import * as Utils from "./scripts";
import moment from "moment";
import commonStyle from '../../commonStyles'
import CheckBox from '../Checkbox'
export default function TodoApp({
  filter, setFilter,
  displaySetting,
  currentDateObj
}) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0)
  const [selectedKey, setSelectedKey] = useState()
  const [newTaskValue, setNewTaskValue] = useState()
  const [valueEditing, setValueEditing] = useState()
  const onSubmit = async () => {
    if (!newTaskValue) {
    } else {
      const newTask = await Utils.createTask(newTaskValue, currentDateObj);
      setTasks((prev) => [...prev, newTask]);
      setNewTaskValue()
    }
  };

  const onUpdateTask = async (newVal, id, cb = () => { }) => {
    let isSuccess = await Utils.updateTask(newVal, id);
    if (isSuccess) {
      onGetTask(filter);
      cb();
    }
  };

  const onGetTask = useCallback(async (currentFilter = filter) => {
    const res = await Utils.getTask(
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
  }, [filter]);

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

  const onDeleteTask = async (id) => {
    await Utils.deleteTask(id);
    onGetTask();
  }

  return (
    <KeyboardAvoidingView style={styles.todoApp}>
      <View>
        <View>
          <Text style={styles.todoAppTitle}>Bộ lọc</Text>
        </View>
        <View style={styles.statusWrapper}>
          <CheckBox
            isChecked={filter.filter.isDone === undefined}
            setIsChecked={() => {
              onChangeFilter({
                ...filter,
                filter: {
                  isDone: undefined
                }
              })
            }}
            title="Toàn bộ"
          />
          <CheckBox
            isChecked={filter.filter.isDone === true}
            setIsChecked={() => {
              onChangeFilter({
                ...filter,
                filter: {
                  isDone: true
                }
              })
            }}
            title="Đã xong"
          />
          <CheckBox
            isChecked={filter.filter.isDone === false}
            setIsChecked={() => {
              onChangeFilter({
                ...filter,
                filter: {
                  isDone: false
                }
              })
            }}
            title="Chưa xong"
          />
        </View>
        <View style={styles.search}>
          <TextInput
            placeholder="Tìm kiếm"
            placeholderTextColor="#fff"
            style={commonStyle.input}
            value={filter.searchText}
            onChangeText={text => setFilter(prev => ({ ...prev, searchText: text }))}
          />
        </View>
      </View>

      {
        displaySetting.indexOf("D") > -1 && (
          <View style={styles.todoAppForm}>
            <TextInput
              placeholderTextColor="#fff"
              style={[commonStyle.input, styles.createTaskInput]}
              placeholder="Nhập gì đó ..."
              value={newTaskValue}
              onChangeText={setNewTaskValue}
            />
            <TouchableOpacity
              onPress={onSubmit}
              style={styles.todoAppBtnCreate}
            >
              <Text
                style={styles.todoAppBtnCreateText}
              >Tạo</Text>
            </TouchableOpacity>
          </View>
        )
      }
      <FlatList
        data={tasks.reverse()}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.taskList}>
              <View style={styles.task}>
                <CheckBox
                  isChecked={item.isDone}
                  setIsChecked={() => onUpdateTask({ isDone: !item.isDone }, item.id)}
                />
                {
                  displaySetting.indexOf("D") > -1 && (
                    selectedKey === item.id ? (
                      <></>
                    ) : (
                      <View style={styles.taskAction}>
                        <Text
                          style={{ color: '#fff', marginRight: 8 }}
                          onPress={() => {
                            setSelectedKey(item.id)
                            setValueEditing(item.label)
                          }}
                        >✎</Text>
                        <Text
                          style={{ color: '#fff' }}
                          onPress={() => {
                            Alert.alert(
                              "Vui lòng xác nhận",
                              "Bạn có chắc muốn xoá?",
                              [
                                {
                                  text: "Xoá",
                                  onPress: () => onDeleteTask(item.id)
                                },
                                {
                                  text: "Huỷ"
                                }
                              ]
                            )
                          }}
                        >🗑</Text>
                      </View>
                    )
                  )
                }
                <View style={styles.todoLabel}>
                  {
                    selectedKey === item.id ? (
                      <TextInput
                        style={[commonStyle.input, { width: "94%" }]}
                        value={valueEditing}
                        onChangeText={setValueEditing}
                        onSubmitEditing={() => {
                          if (!valueEditing) {
                            Alert.alert("Lỗi", "Không được để trống nội dung")
                          } else {
                            onUpdateTask({ label: valueEditing }, item.id, () => {
                              setSelectedKey()
                              setValueEditing()
                              onGetTask(filter)
                            })
                          }
                        }}
                        onBlur={(e) => {
                          // if (!e.target.value) {
                          //   Alert.alert("Không được để trống")
                          // } else {
                          //   onUpdateTask(
                          //     { label: e.target.value },
                          //     item.id,
                          //     () => {
                          //       setSelectedKey()
                          //     }
                          //   )
                          // }
                        }}
                      />
                    ) : (
                      <Text style={[{ color: "#fff" }, item.isDone ? styles.taskDone : {}]}>{item.label}</Text>
                    )
                  }
                  {
                    displaySetting === "M" && (
                      <Text style={{ color: "#fff" }}>&nbsp;-&nbsp;{moment(item.datetime).format("DD/MM/YYYY")}</Text>
                    )
                  }
                </View>
              </View>
            </View>
          )
        }}
        ListEmptyComponent={(
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Danh sách trống!</Text>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}
