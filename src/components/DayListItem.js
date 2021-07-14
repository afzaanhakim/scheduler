import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = (props) => {
    let val = "";
    if (props.spots === 0) {
      val += `no spots remaining`;
    }
    if (props.spots === 1) {
      val += `${props.spots} spot remaining`;
    }

    if (props.spots > 1) {
      val += `${props.spots} spots remaining`;
    }
    return val;
  };
  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{formatSpots(props)}</h3>
    </li>
  );
}
