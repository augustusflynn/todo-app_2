import React, { useCallback, useLayoutEffect, useReducer } from "react";
import moment from "moment";
import { reducer, initialState, dispatchUpdateState } from './Utils'
import TodoApp from "../todoapp";
import { getTask, checkIsDoneAllTask } from "../todoapp/scripts";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from './calendarStyles';

const weekdayshort = moment.weekdaysShort();

export default function Calendar({
  setFilter, filter,
  displaySetting,
  setDisplaySetting,
  currentDateObj,
  setCurrentDateObj
}) {
  const [state, dispatch] = useReducer(reducer, initialState, initFunction);

  function initFunction(initialState) {
    if (displaySetting.length > 1) {
      const dateObject = moment(currentDateObj)
      return {
        ...initialState,
        dateObject: dateObject
      }
    } else {
      return initialState
    }
  }

  const daysInMonth = () => {
    return state.dateObject.daysInMonth();
  };

  const year = () => {
    return state.dateObject.format("Y");
  };

  const firstDayOfMonth = (dateObject) => {
    let firstDay = moment(dateObject).startOf("month").format("d"); // index of day in week
    return firstDay;
  };

  const month = () => {
    return state.dateObject.format("MMMM");
  };

  const showMonth = () => {
    dispatch(dispatchUpdateState({
      showMonthTable: !state.showMonthTable,
      showDateTable: !state.showDateTable
    }));
  };

  const setMonth = (month) => {
    let monthNo = state.allmonths.indexOf(month);
    let dateObject = Object.assign({}, state.dateObject);
    dateObject = moment(dateObject).set("month", monthNo);
    dispatch(dispatchUpdateState({
      dateObject: dateObject,
      showMonthTable: !state.showMonthTable,
      showDateTable: !state.showDateTable
    }));
    setDaysInMonth(dateObject)
  };

  const MonthList = (props) => {
    let months = [];
    props.data.forEach((data) => {
      months.push(
        <TouchableOpacity
          style={[styles.td, styles.selectMonth]}
          onPress={() => {
            setMonth(data);
          }}
        >
          <Text>{data}</Text>
        </TouchableOpacity>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 6 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d) => {
      return <View style={[styles.tr, styles.yearListWrapper]} key={Math.random()}>{d}</View>;
    });

    return (
      <View className="calendar-month">
        <View style={styles.thead}>
          <View style={styles.tr}>
            <Text style={styles.selectYear}>Chọn tháng</Text>
          </View>
        </View>
        <View style={styles.tbody}>{monthlist}</View>
      </View>
    );
  };

  const showYearTable = () => {
    dispatch(dispatchUpdateState({
      showYearTable: !state.showYearTable,
      showDateTable: !state.showDateTable
    }));
  };

  const onPrev = () => {
    let curr = "";
    if (state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    const newDate = state.dateObject.subtract(1, curr)
    dispatch(dispatchUpdateState({
      dateObject: newDate
    }));
    setDaysInMonth(newDate)
  };

  const onNext = () => {
    let curr = "";
    if (state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    const newDate = state.dateObject.add(1, curr)
    dispatch(dispatchUpdateState({
      dateObject: newDate
    }));
    setDaysInMonth(newDate)
  };

  const setYear = (year) => {
    let dateObject = Object.assign({}, state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    dispatch(dispatchUpdateState({
      dateObject: dateObject,
      showMonthTable: !state.showMonthTable,
      showYearTable: !state.showYearTable
    }));
    setDaysInMonth(dateObject)
  };

  function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY"));
      currentDate = moment(currentDate).add(1, "year");
    }
    return dateArray;
  }

  const YearTable = (currentYear) => {
    let months = [];
    let nextten = moment().set("year", currentYear).add(12, "year").format("Y");

    let tenyear = getDates(currentYear, nextten);

    tenyear.forEach((data) => {
      months.push(
        <TouchableOpacity
          style={styles.td}
          onPress={() => {
            setYear(data);
          }}
        >
          <Text style={styles.yearText}>{data}</Text>
        </TouchableOpacity>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 6 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d) => {
      return <View style={[styles.tr, styles.yearListWrapper]} key={Math.random()}>{d}</View>;
    });

    return (
      <View className="calendar-month">
        <View style={styles.thead}>
          <View style={styles.tr}>
            <Text style={styles.selectYear}>Chọn năm</Text>
          </View>
        </View>
        <View style={styles.tbody}>{yearlist}</View>
      </View>
    );
  };

  let weekdayshortname = weekdayshort.map((day) => {
    return <Text style={styles.th} key={Math.random()}>{day}</Text>;
  });

  const setDaysInMonth = useCallback(async (dateObject = state.dateObject) => {
    let blanks = [];
    for (let i = 0; i < firstDayOfMonth(dateObject); i++) {
      blanks.push(<View style={styles.td}><Text>{""}</Text></View>);
    }
    let daysInMonthArray = [];
    for (let d = 1; d <= daysInMonth(); d++) {
      let currentDateFormat = dateObject.format("DD/MM/YYYY")
      let currentDate = d < 10 ? `0${d}` : d

      let today = moment().format("DD/MM/YYYY")
      today = today.split("/")
      today[0] = currentDate
      today = today.join("/")

      let date = currentDateFormat.split("/")
      date[0] = currentDate
      date = date.join("/")
      date = moment(date, "DD/MM/YYYY")
      let isHasTaskNotDone = await getTask(1, 0, '', { isDone: false }, date.startOf('day'), date.endOf('d'))
      let isDoneAllTask = await checkIsDoneAllTask(date.startOf('day'), date.endOf('d'))
      const styleDate = [styles.td]
      const styleText = []
      if (currentDateFormat === today) {
        styleText.push(styles.today)
      }
      if (new Date().toISOString() < date.toISOString()) {
        styleText.push(styles.nextDate)
      }
      if (new Date().toISOString() > date.toISOString()) {
        styleText.push(styles.prevDate)
      }
      if (isDoneAllTask) {
        styleDate.push(styles.taskDoneAll)
      }
      if (!isDoneAllTask && isHasTaskNotDone && isHasTaskNotDone.total > 0) {
        styleDate.push(styles.task)
      }

      daysInMonthArray.push(
        <TouchableOpacity
          style={styleDate}
          onPress={() => {
            setCurrentDateObj(date)
            setDisplaySetting(`D`)
            setFilter({
              limit: 20,
              skip: 0,
              filter: {},
              searchText: "",
              startDate: date.startOf('day').toDate(),
              endDate: date.endOf('day').toDate()
            })
          }}
        >
          <Text
            style={styleText}
          >
            {d}
          </Text>
        </TouchableOpacity >
      );
    }
    var totalSlots = [...blanks, ...daysInMonthArray];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    let daysinmonth = rows.map((d) => {
      return <View style={styles.tr} key={Math.random()}>{d}</View>;
    });
    dispatch(dispatchUpdateState({
      daysinmonth: daysinmonth
    }));
  }, [])

  useLayoutEffect(() => {
    setDaysInMonth();
  }, [setDaysInMonth])

  return (
    <>
      <View style={styles.tailDatetimeCalendar}>
        <View style={styles.calendarNavi}>
          <TouchableOpacity
            onPress={onPrev}
          >
            <Text
              style={[styles.calendarButton, styles.buttonPrev]}
            >‹</Text>
          </TouchableOpacity>
          <View style={styles.selectTime}>
            {!state.showMonthTable && (
              <TouchableOpacity
                onPress={showMonth}
              >
                <Text
                  style={styles.calendarLabel}
                >
                  {month()}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={showYearTable}
            >
              <Text
                style={styles.calendarLabel}
              >
                {year()}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onNext}>
            <Text
              style={[styles.calendarButton, styles.buttonNext]}
            >›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendarDate}>
          {state.showYearTable && <YearTable currentYear={year()} />}
          {state.showMonthTable && (
            <MonthList data={moment.months()} />
          )}
        </View>

        {state.showDateTable && (
          <View style={styles.calendarDate} className="calendar-date">
            <View style={styles.calendarDay} className="calendar-day">
              <View style={styles.thead}>
                <View style={styles.tr}>{weekdayshortname}</View>
              </View>
              <View style={styles.tbody}>
                {state.daysinmonth}
              </View>
            </View>
          </View>
        )}
      </View>
      <TodoApp
        currentDateObj={state.dateObject}
        filter={filter}
        setFilter={setFilter}
        displaySetting={displaySetting}
      />
    </>
  );
}
