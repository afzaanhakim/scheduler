import React from "react";
import axios from "axios";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    //Validate to verify that appoint element contains the text SAVING immediately after save is clicked
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    

    //confirm to show student name is shown after SAVING indicator is hidden
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // 3. Click Delete on a booked appointment
    fireEvent.click(queryByAltText(appointment, "Delete"));
   // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
 // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "DELETING")).toBeInTheDocument();
  
    
      // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"))
 
 
  const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
     // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

    
  });
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);
   // 2. Wait until the text "Archie Cohen" is displayed.
   await waitForElement(() => getByText(container, "Archie Cohen"));
   const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );
  
  // 3. Click Edit on a booked appointment
  fireEvent.click(queryByAltText(appointment, "Edit"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" },
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));
    //Validate to verify that appoint element contains the text SAVING immediately after save is clicked
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    

    //confirm to show student name is shown after SAVING indicator is hidden
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
});
it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();

  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"))

  const appointment = getAllByTestId(container, "appointment")[0];

  //Book an appointment 
  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" },
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "SAVING")).toBeInTheDocument();

//when appointment fails to save check to display error message element
  await waitForElement(() => getByText(appointment, "could not save appointment"))


  fireEvent.click(getByAltText(appointment, "Close"));
  expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument()
  debug()
});







it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.delete.mockRejectedValueOnce();

  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"))

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  //Delete an appointment
  fireEvent.click(getByAltText(appointment, "Delete"));
  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
 // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));


  expect(getByText(appointment, "DELETING")).toBeInTheDocument();

//when appointment fails to delete, check to display error message element
  await waitForElement(() => getByText(appointment, "could not delete appointment....."))

  fireEvent.click(getByAltText(appointment, "Close"));
 
  expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  console.log(prettyDOM(appointment))
  debug()
});

})
