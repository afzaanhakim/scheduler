import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  //state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
  //updating state based on day
  const setDay = (day) => setState({ ...state, day });

  //function spotsupdater

  function updateSpots(state, day) {
    const updatedState = { ...state };
    const currentDay = day || state.day;
    const currentDayObj = updatedState.days.find(
      (dayObj) => dayObj.name === currentDay
    );
    const listOfAppId = currentDayObj.appointments;

    const listOfNullAppId = listOfAppId.filter(
      (id) => !updatedState.appointments[id].interview
    );

    const spots = listOfNullAppId.length;
    const updatedDayObj = { ...currentDayObj, spots };
    updatedState.days.map((day) =>
      updatedDayObj.id === day.id ? (day.spots = updatedDayObj.spots) : null
    );
    return updatedState;
  }
  //getting data from api to set state
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //books interview and updates db with put request
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(
      setState((prev) => {
        const newState = { ...prev, appointments };
        const updatedNewState = updateSpots(newState, appointments.day);
        return updatedNewState;
      })
    );
  }

  //cancels/deletes interview and updates db with delete request
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(
      setState((prev) => {
        const newState = { ...prev, appointments };
        const updatedNewState = updateSpots(newState, appointments.day);
        return updatedNewState;
      })
    );
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
