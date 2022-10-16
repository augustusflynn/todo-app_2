import React, { useReducer } from "react";
import moment from "moment";
import { reducer, initialState, dispatchUpdateState } from './Utils'
import TodoApp from "../todoapp";
import { getTask, checkIsDoneAllTask } from "../todoapp/scripts";
import { View, Text, TouchableOpacity, Alert } from "react-native";
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

  const firstDayOfMonth = () => {
    let dateObject = state.dateObject;
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
  };

  // fix this
  const MonthList = (props) => {
    let months = [];
    props.data.forEach((data) => {
      months.push(
        <td
          key={Math.random()}
          className="calendar-month"
          onClick={(e) => {
            setMonth(data);
          }}
        >
          <Text>{data}</Text>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let monthlist = rows.map((d) => {
      return <tr key={Math.random()}>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colText="4">Chọn tháng</th>
          </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
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
    dispatch(dispatchUpdateState({
      dateObject: state.dateObject.subtract(1, curr)
    }));
  };

  const onNext = () => {
    let curr = "";
    if (state.showYearTable === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    dispatch(dispatchUpdateState({
      dateObject: state.dateObject.add(1, curr)
    }));
  };

  const setYear = (year) => {
    let dateObject = Object.assign({}, state.dateObject);
    dateObject = moment(dateObject).set("year", year);
    dispatch(dispatchUpdateState({
      dateObject: dateObject,
      showMonthTable: !state.showMonthTable,
      showYearTable: !state.showYearTable
    }));
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

  // fix this
  const YearTable = (props) => {
    let months = [];
    let nextten = moment().set("year", props).add("year", 12).format("Y");

    let tenyear = getDates(props, nextten);

    tenyear.forEach((data) => {
      months.push(
        <td
          key={Math.random()}
          className="calendar-month"
          onClick={() => {
            setYear(data);
          }}
        >
          <Text>{data}</Text>
        </td>
      );
    });
    let rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    let yearlist = rows.map((d) => {
      return <tr key={Math.random()}>{d}</tr>;
    });

    return (
      <table className="calendar-month">
        <thead>
          <tr>
            <th colText="4">Chọn năm</th>
          </tr>
        </thead>
        <tbody>{yearlist}</tbody>
      </table>
    );
  };

  // fix from this
  let weekdayshortname = weekdayshort.map((day) => {
    return <Text style={styles.th} key={Math.random()}>{day}</Text>;
  });

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<View style={styles.td} className="calendar-day empty"><Text>{""}</Text></View>);
  }
  let daysInMonthArray = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    let currentDateFormat = state.dateObject.format("DD/MM/YYYY")
    let currentDate = d < 10 ? `0${d}` : d

    let today = moment().format("DD/MM/YYYY")
    today = today.split("/")
    today[0] = currentDate
    today = today.join("/")
    let todayObj = moment(today, "DD/MM/YYYY")

    let date = currentDateFormat.split("/")
    date[0] = currentDate
    date = date.join("/")
    date = moment(date, "DD/MM/YYYY")

    let isHasTaskNotDone = getTask(1, 0, '', { isDone: false }, date.startOf('day'), date.endOf('d'))
    let isDoneAllTask = checkIsDoneAllTask(todayObj.startOf('day'), todayObj.endOf('d'))

    let isCurrentDay = currentDateFormat === today ? "today" : "";
    let classNameForTask = ""
    if (isDoneAllTask) {
      classNameForTask = "task-done-all"
    }
    if (!isDoneAllTask && isHasTaskNotDone && isHasTaskNotDone.total > 0) {
      classNameForTask = "task"
    }
    let classNameNextDate = new Date().toISOString() < date.toISOString() ? "next-date" : ""
    let classNamePrevDate = new Date().toISOString() > date.toISOString() ? "prev-date" : ""

    daysInMonthArray.push(
      <TouchableOpacity key={Math.random()} style={styles.td} className={`calendar-day ${isCurrentDay} ${classNameForTask} ${classNamePrevDate} ${classNameNextDate}`}>
        <Text
          onClick={() => {
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
          {d}
        </Text>
      </TouchableOpacity>
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
      // let insertRow = cells.slice();
      rows.push(cells);
    }
  });

  let daysinmonth = rows.map((d) => {
    return <View style={styles.tr} className="calendar-date-body" key={Math.random()}>{d}</View>;
  });
  /** to this */

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

        {/* <View style={styles.calendarDate}>
          {state.showYearTable && <YearTable props={year()} />}
          {state.showMonthTable && (
            <MonthList data={moment.months()} />
          )}
        </View> */}

        {state.showDateTable && (
          <View style={styles.calendarDate} className="calendar-date">
            <View style={styles.calendarDay} className="calendar-day">
              <View style={styles.thead}>
                <View style={styles.tr}>{weekdayshortname}</View>
              </View>
              <View style={styles.tbody}>{daysinmonth}</View>
            </View>
          </View>
        )}
      </View>
      {/* <TodoApp
        currentDateObj={state.dateObject}
        filter={filter}
        setFilter={setFilter}
        displaySetting={displaySetting}
      /> */}
    </>
  );
}
