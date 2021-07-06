import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const mapDay = props.days.map(day => {
    console.log("this is dayid",day.id)
    return (
      <ul>
        <DayListItem
          key ={day.id}
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
