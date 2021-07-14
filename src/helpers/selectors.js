
//getting appointments for a specific day
export function getAppointmentsForDay(state, day) {
  const dayName = state.days.find((d) => d.name === day);

  if (!dayName) {
    return [];
  }

  const apps = dayName.appointments.map((id) => state.appointments[id]);
  return apps;
}

//getting a specific interview object

export function getInterview(state, interview) {
  const int = {};
  if (!interview) {
    return null;
  } else {
    int["student"] = interview.student;
    int["interviewer"] = state.interviewers[interview.interviewer];
  }
  return int;
}
//getting interviewer objects for a selected day
export function getInterviewersForDay(state, day) {
  const dayName = state.days.find((d) => d.name === day);

  if (!dayName) {
    return [];
  }

  const interviewers = dayName.interviewers.map((id) => state.interviewers[id]);
  return interviewers;
}
