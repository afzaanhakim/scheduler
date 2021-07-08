export function getAppointmentsForDay(state, day) {
  const dayName = state.days.find((d) => d.name === day);

  if (!dayName) {
    return [];
  }

  const apps = dayName.appointments.map((id) => state.appointments[id]);
  return apps;
}

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
