export function getAppointmentsForDay(state, day) {
 const dayName = state.days.find(d =>  d.name === day )
 
if (!dayName){
  return [];
}

const apps = dayName.appointments.map(id => state.appointments[id])
return apps;
}