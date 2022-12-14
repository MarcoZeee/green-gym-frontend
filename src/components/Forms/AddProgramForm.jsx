import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import { useCreateProgram } from "../Program/hooks/use-create-program";
import FormCard from "./FormCard";
import classes from "./AddProgramForm.module.css";
import Button from "../UI/Button";
import useInput from "./Hooks/use-input";

const AddProgramForm = () => {
  const {mutate: createProgram} = useCreateProgram();

  // Set up a navigate to change routes on form submittion
  const navigate = useNavigate();

  // Image ref for adding an image to the program and a useState for the file
  const imageRef = useRef();
  const [selectedImageFile, setSelecetedImageFile] = useState(null);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("program[program_title]", programNameValue);
    formData.append("program[number_of_days]", numberOfDaysValue);
    formData.append("program[program_description]", descriptionValue);
    formData.append("program[price]", priceValue);
    formData.append("program[photo]", selectedImageFile);

    createProgram(formData);
    // programatic navigation to the add workout page.
    // need to pass the number of days here
    navigate("/programs/add-program/add-workout", {
      state: { pageNumber: numberOfDaysValue },
    });
  };


  const textNotEmpty = (value) => value !== "";

  const isNotANumber = (value) => {
    const number = parseInt(value);
    return !isNaN(number);
  };

  const {
    value: programNameValue,
    isValid: programNameIsValid,
    hasError: programNameHasError,
    valueChangeHandler: programNameChangeHandler,
    inputBlurHandler: programNameBlurHandler,
  } = useInput(textNotEmpty);

  const {
    value: numberOfDaysValue,
    isValid: numberOfDaysIsValid,
    hasError: numberOfDaysHasError,
    valueChangeHandler: numberOfDaysChangeHandler,
    inputBlurHandler: numberOfDaysBlurHandler,
  } = useInput(isNotANumber);

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput(textNotEmpty);

  const {
    value: priceValue,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
  } = useInput(isNotANumber);

  const {
    value: coverImageValue,
    hasError: coverImageHasError,
    inputBlurHandler: coverImageBlurHandler,
  } = useInput(textNotEmpty);

  const fileSelectHandler = (event) => {
    setSelecetedImageFile(event.target.files[0]);
  };

  const closeFormHandler = () => {
    navigate("/programs")
  };

  const programNameClasses = programNameHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const numberOfDaysClasses = numberOfDaysHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const descriptionClasses = descriptionHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const priceClasses = priceHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const coverImageClasses = coverImageHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const formIsValid =
    programNameIsValid && numberOfDaysIsValid && descriptionIsValid;

  return (
    <FormCard title="Add Program">
      <form onSubmit={formSubmitHandler}>
        <div className={classes.controlGroup}>
          <div className={programNameClasses}>
            <label htmlFor="program_name">Program Name</label>
            <input
              type="text"
              id="program_name"
              value={programNameValue}
              onChange={programNameChangeHandler}
              onBlur={programNameBlurHandler}
            />
            {programNameHasError && (
              <p className={classes.errorText}>Program must have a name</p>
            )}
          </div>
          <div className={numberOfDaysClasses}>
            <label htmlFor="number_of_days">Number Of Days</label>
            <input
              type="number"
              id="number_of_days"
              min={0}
              value={numberOfDaysValue}
              onChange={numberOfDaysChangeHandler}
              onBlur={numberOfDaysBlurHandler}
            />
            {numberOfDaysHasError && (
              <p className={classes.errorText}>must be a valid number</p>
            )}
          </div>
          <div className={descriptionClasses}>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={descriptionValue}
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
            />
            {descriptionHasError && (
              <p className={classes.errorText}>description cannot be blank</p>
            )}
          </div>
          <div className={priceClasses}>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={priceValue}
              onChange={priceChangeHandler}
              onBlur={priceBlurHandler}
            />
            {priceHasError && (
              <p className={classes.errorText}>price cannot be blank</p>
            )}
          </div>
          <div className={coverImageClasses}>
            <label htmlFor="cover_image">Cover Image</label>
            <input
              type="file"
              id="cover_image"
              accept="image/jpeg, image/png"
              value={coverImageValue}
              onChange={fileSelectHandler}
              onBlur={coverImageBlurHandler}
              style={{ display: "none" }}
              ref={imageRef}
            />
            <Button size="small" onClick={() => imageRef.current.click()}>
              Add Image
            </Button>
            {coverImageHasError && (
              <p className={classes.errorText}>cover image cannot be blank</p>
            )}
          </div>
          <div className={classes.formActions}>
            <Button color="blue" size="small" onClick={closeFormHandler}>
              Cancel
            </Button>
            <Button size="small" type="submit" disabled={!formIsValid}>
              Add
            </Button>
          </div>
        </div>
      </form>
    </FormCard>
  );
};

export default AddProgramForm;
