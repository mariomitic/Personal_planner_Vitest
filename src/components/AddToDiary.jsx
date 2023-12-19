import React from "react";
import { useRef } from "react";

function AddToDiary(props) {
  const weightEntered = useRef();
  const dateRef = useRef();

  const dataToAdd = () => {
    if (dateRef.current.value === "") {
      props.setalertMessage("Must pick a date!");
    } else if (
      isNaN(weightEntered.current.value) ||
      weightEntered.current.value < 1
    ) {
      props.setalertMessage("Must enter valid weight!");
    } else {
      props.addToDiary(weightEntered.current.value, dateRef.current.value);
      props.setaddToDiaryWindow(false);
    }
  };

  return (
    <div className="addToDiaryParameters">
      <div className="enterWeightDiv">
        <h3>Enter weight</h3>

        <input className="enterWeightInput" ref={weightEntered}></input>
      </div>

      <div className="pickAdateDiv">
        <h3>Pick a date</h3>

        <input
          className="pickAdateInput"
          ref={dateRef}
          type="date"
          id="datepicker"
        ></input>
      </div>

      <div className="addToDiaryBtns">
        <button className="addToDiaryBtn1" onClick={() => dataToAdd()}>
          OK
        </button>
        <button
          className="addToDiaryBtn2"
          onClick={() => props.setaddToDiaryWindow(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddToDiary;
