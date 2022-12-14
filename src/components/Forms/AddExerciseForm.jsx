import { useLibraryItems } from "../AdminComponents/Library/Hooks/use-library-items";
import { Fragment, useEffect, useState } from "react";
import classes from "./AddExerciseForm.module.css";
import useInput from "./Hooks/use-input";

const AddExerciseForm = ({ exerciseNumber, getExerciseData }) => {
  const [exerciseIsSubmitted, setExerciseIsSubmitted] = useState(false);
  const [exerciseTitlePlaceholder, setExerciseTitlePlaceholder] =
    useState("Title");
  const [caloriesPlaceholder, setCaloriesPlaceholder] = useState(0);

  // get all the library items
  const { data: libraryData } = useLibraryItems();
  
  const textNotEmpty = (value) => value !== "";

  const selectIsValid = (value) => {
    return value !== "select..." && value !== "";
  };

  const isANumber = (value) => {
    const number = parseInt(value);
    return !isNaN(number);
  };

  const getExerciseDataHandler = () => {
    const updateQuestionValue = questioValue === "yes" ? true : false;

    const exercise = {
      exerciseNumber,
      title: exerciseTitleValue,
      workTime: workTimeValue,
      restTime: restTimeValue,
      calories: caloriesValue,
      question: updateQuestionValue,
      libraryItem: libraryItemValue,
    };

    getExerciseData(exercise);
    setExerciseIsSubmitted(true);
  };

  const {
    value: exerciseTitleValue,
    isValid: exerciseTitleIsValid,
    hasError: exerciseTitleHasError,
    valueChangeHandler: exerciseTitleChangeHandler,
    inputBlurHandler: exerciseTitleBlurHandler,
  } = useInput(textNotEmpty);

  const {
    value: workTimeValue,
    isValid: workTimeIsValid,
    valueChangeHandler: workTimeChangeHandler,
    inputBlurHandler: workTimeBlurHandler,
  } = useInput(selectIsValid);

  const {
    value: restTimeValue,
    isValid: restTimeIsValid,
    valueChangeHandler: restTimeChangeHandler,
    inputBlurHandler: restTimeBlurHandler,
  } = useInput(selectIsValid);

  const {
    value: libraryItemValue,
    isValid: libraryItemIsValid,
    valueChangeHandler: libraryItemChangeHandler,
    inputBlurHandler: libraryItemBlurHandler,
  } = useInput(selectIsValid);

  const {
    value: caloriesValue,
    hasError: caloriesHasError,
    valueChangeHandler: caloriesChangeHandler,
    inputBlurHandler: caloriesBlurHandler,
  } = useInput(isANumber);

  const {
    value: questioValue,
    valueChangeHandler: questionChangeHandler,
    inputBlurHandler: questionBlurHandler,
  } = useInput(selectIsValid);

  const formIsValid =
    exerciseTitleIsValid &&
    workTimeIsValid &&
    restTimeIsValid &&
    libraryItemIsValid;

  useEffect(() => {
    if (exerciseIsSubmitted) {
      setExerciseTitlePlaceholder(exerciseTitleValue);
      setCaloriesPlaceholder(caloriesValue);
    }
  }, [exerciseIsSubmitted, caloriesValue, exerciseTitleValue]);

  const exerciseTitleValueTernery = exerciseIsSubmitted
    ? ""
    : exerciseTitleValue;

  const workTimeValueTernery = exerciseIsSubmitted ? "" : workTimeValue;
  const restTimeValueTernery = exerciseIsSubmitted ? "" : restTimeValue;
  const libraryItemValueTernery = exerciseIsSubmitted ? "" : libraryItemValue;
  const caloriesValueTernery = exerciseIsSubmitted ? "" : caloriesValue;
  const questionValueTernery = exerciseIsSubmitted ? "" : questioValue;

  const restAndWorkOptions = Array.from({ length: 60 }, (_, i) => i + 1)
    .filter((num) => num % 5 === 0)
    .map((num) => {
      return (
        <option
          key={num}
          value={num}
          disabled={exerciseIsSubmitted}
          hidden={exerciseIsSubmitted}
        >
          {num} secs
        </option>
      );
    });

  const libraryItemOptions = libraryData?.map((libraryItem) => {
    return (
      <option
        key={libraryItem.id}
        value={libraryItem.id}
        disabled={exerciseIsSubmitted}
        hidden={exerciseIsSubmitted}
      >
        {libraryItem.title}
      </option>
    );
  });

  const submittedClasses = exerciseIsSubmitted
    ? `${classes.formGrid} ${classes.titlesGrey}`
    : classes.formGrid;

  return (
    <Fragment>
      <div className={submittedClasses}>
        <div className={classes.number}>{exerciseNumber}</div>
        <div className={classes.title}>
          <label htmlFor={`exercise_${exerciseNumber}`}>Title</label>
          <input
            type="text"
            id={`exercise_${exerciseNumber}`}
            value={exerciseTitleValueTernery}
            placeholder={exerciseTitlePlaceholder}
            onChange={exerciseTitleChangeHandler}
            onBlur={exerciseTitleBlurHandler}
          />
          {exerciseTitleHasError && (
            <p className={classes.errorText}>Enter a valid title</p>
          )}
        </div>
        <div className={classes.workTime}>
          <label htmlFor={`exercise_${exerciseNumber}_work_time`}>Work</label>
          <select
            name={`exercise_${exerciseNumber}_work_time`}
            id={`exercise_${exerciseNumber}_work_time`}
            value={workTimeValueTernery}
            onChange={workTimeChangeHandler}
            onBlur={workTimeBlurHandler}
            placeholder="test"
          >
            <option
              value="default"
              disabled={exerciseIsSubmitted}
              hidden={exerciseIsSubmitted}
            >
              select...
            </option>
            {restAndWorkOptions}
          </select>
        </div>
        <div className={classes.restTime}>
          <label htmlFor={`exercise_${exerciseNumber}_rest_time`}>Rest</label>
          <select
            name={`exercise_${exerciseNumber}_rest_time`}
            id={`exercise_${exerciseNumber}_rest_time`}
            value={restTimeValueTernery}
            onChange={restTimeChangeHandler}
            onBlur={restTimeBlurHandler}
          >
            <option
              value="default"
              disabled={exerciseIsSubmitted}
              hidden={exerciseIsSubmitted}
            >
              select...
            </option>
            {restAndWorkOptions}
          </select>
        </div>
        <div className={classes.title}>
          <label htmlFor={`exercise_${exerciseNumber}_calories`}>
            Calories
          </label>
          <input
            type="number"
            id={`exercise_${exerciseNumber}_calories`}
            value={caloriesValueTernery}
            placeholder={caloriesPlaceholder}
            onChange={caloriesChangeHandler}
            onBlur={caloriesBlurHandler}
          />
          {caloriesHasError && (
            <p className={classes.errorText}>Must be a number</p>
          )}
        </div>
        <div className={classes.restTime}>
          <label htmlFor={`exercise_${exerciseNumber}_rest_time`}>
            Question?
          </label>
          <select
            name={`exercise_${exerciseNumber}_rest_time`}
            id={`exercise_${exerciseNumber}_rest_time`}
            value={questionValueTernery}
            onChange={questionChangeHandler}
            onBlur={questionBlurHandler}
          >
            <option
              value="default"
              disabled={exerciseIsSubmitted}
              hidden={exerciseIsSubmitted}
            >
              select...
            </option>
            <option disabled={exerciseIsSubmitted} hidden={exerciseIsSubmitted}>
              yes
            </option>
            <option disabled={exerciseIsSubmitted} hidden={exerciseIsSubmitted}>
              no
            </option>
          </select>
        </div>
        <div className={classes.libraryItem}>
          <label htmlFor={`exercise_${exerciseNumber}_library_item`}>
            Video
          </label>
          <select
            name={`exercise_${exerciseNumber}_library_item`}
            id={`exercise_${exerciseNumber}_library_item`}
            value={libraryItemValueTernery}
            onChange={libraryItemChangeHandler}
            onBlur={libraryItemBlurHandler}
          >
            <option
              value="default"
              disabled={exerciseIsSubmitted}
              hidden={exerciseIsSubmitted}
            >
              select...
            </option>
            {libraryItemOptions}
          </select>
        </div>
        <div className={classes.addButton}>
          <button
            onClick={getExerciseDataHandler}
            disabled={!formIsValid || exerciseIsSubmitted}
          >
            {exerciseIsSubmitted ? "added" : "add"}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default AddExerciseForm;
