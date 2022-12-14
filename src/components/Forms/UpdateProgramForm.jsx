import { useUpdateProgram } from "../Program/hooks/use-update-program";
import classes from "./Form.module.css";
import FormCard from "./AdminFormCard";
import Button from '../UI/Button';
import useInput from './Hooks/use-input';

const UpdateProgramForm = ({ programData, onClose }) => {
  // TODO: Create useUpdateProgram hook
  const updateProgram = useUpdateProgram();


  const formSubmitHandler = (event) => {
    event.preventDefault();

    const program = {
      id: programData.id,
      program_title: programNameValue,
      program_description: descriptionValue,
      price: priceValue
    }

    const formData = new FormData();

    formData.append("program[program_title]", programNameValue);
    formData.append("program[program_description]", descriptionValue);
    formData.append("program[price]", priceValue);

    // createProgram(formData);
    // programatic navigation to the add workout page.
    // need to pass the number of days here
    // CLOSE MODAL ON COMPLETION
    updateProgram(program);

    onClose();
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
  } = useInput(textNotEmpty, programData.program_title);

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput(textNotEmpty, programData.program_description);

  const {
    value: priceValue,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
  } = useInput(isNotANumber, programData.price);


  const programNameClasses = programNameHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const descriptionClasses = descriptionHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const priceClasses = priceHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const formIsValid =
    programNameIsValid && descriptionIsValid;

  return (
    <FormCard title="Update Program">
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
          <div className={classes.formActions}>
            <Button color="blue" size="small" onClick={onClose}>
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

export default UpdateProgramForm;
