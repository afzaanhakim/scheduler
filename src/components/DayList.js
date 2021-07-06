import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  console.log(props.days);

  const mapDay = props.days.map(day => {
    return (
      <ul>
        <DayListItem
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      </ul>
    );
  });

  return mapDay
}
