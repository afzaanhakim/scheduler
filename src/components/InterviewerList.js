import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

function InterviewerList(props) {
  const mapInterviewerList = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        name={interviewer.name}
        interviewer={interviewer.name}
        avatar={interviewer.avatar}
        key={interviewer.id}
        selected={interviewer.id === props.value}
        setInterviewer={(event) => props.onChange(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light"> Interviewer</h4>
      <ul className="interviewers__list">{mapInterviewerList}</ul>
    </section>
  );
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
