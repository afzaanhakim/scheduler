import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useApplicationData(){
//state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
//updating state based on day
  const setDay = (day) => setState({ ...state, day });

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
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
return axios.put(`/api/appointments/${id}`, {interview})
    .then(setState(({...state, appointments})));
  }

//cancels/deletes interview and updates db with delete request
  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(() => setState(({...state, appointments})));

  }


return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}

}