import classes from "./ProgramPage.module.css";
import { RiAddCircleLine } from "react-icons/ri";
import { Fragment, useState } from "react";
import Banner from "../../components/Layout/Banner";
import Button from "../../components/UI/Button";
import { useCreateProgram } from "../../components/Program/hooks/use-create-program";
import { FaSpinner } from "react-icons/fa";
import { useLocation } from "react-router-dom";

// create a creation page with same layout as ProgramPage
const ProgramCreate = () => {
  const { mutate, isError, isLoading } = useCreateProgram();
  const { state } = useLocation();
  debugger;
  const [programObj, setProgramObj] = useState({
    program_title: "",
    number_of_days: 0,
    program_description: "",
    price: 0,
    photo_url: null,
    ...state,
  });
  const [imageLoaded, setImageLoaded] = useState(!!programObj.photo_url);
  if (isLoading) return <FaSpinner />;
  if (isError) return <div>Something went wrong</div>;
  return (
    <Fragment>
      <Banner title="Create a new program" />
      <div className={classes.container}>
        <div></div>
        <main className={classes.main_container}>
          <div className={classes.descriptionContainer}>
            <div className={classes.description}>
              <input
                id={classes.program_title}
                placeholder={"program title"}
                onInput={(e) => {
                  setProgramObj({
                    ...programObj,
                    program_title: e.target.value,
                  });
                }}
                value={programObj.program_title || ""}
              ></input>
              <br />
              <textarea
                id={classes.program_info}
                placeholder={"program description"}
                cols={30}
                rows={20}
                onInput={(e) => {
                  setProgramObj({
                    ...programObj,
                    program_description: e.target.value,
                  });
                }}
                value={programObj.program_description || ""}
              ></textarea>
            </div>
            <div className={classes.program_img}>
              <label htmlFor="upload_image">
                {!imageLoaded ? (
                  <RiAddCircleLine size="28rem" color="darkgreen" />
                ) : (
                  <img
                    src={URL.createObjectURL(programObj.photo_url)}
                    width={30}
                  />
                )}
              </label>
              <input
                id="upload_image"
                name="upload_image"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                  setProgramObj({
                    ...programObj,
                    photo_url: e.target.files[0],
                  });
                  setImageLoaded(true);
                }}
              />
            </div>
          </div>

          <div className={classes.purchaseContainer}>
            <input
              id={classes.number_input}
              type="number"
              placeholder="number of days"
              onInput={(e) => {
                setProgramObj({
                  ...programObj,
                  number_of_days: e.target.value,
                });
              }}
            />

            {`Price: RMB `}
            <input
              id={classes.number_input}
              placeholder="How much should it cost?"
              type="number"
              onInput={(e) => {
                setProgramObj({ ...programObj, price: e.target.value });
              }}
            ></input>
          </div>
          <Button
            className={classes.create_button}
            onClick={(e) => {
              e.preventDefault();
              const formData = new FormData();
              formData.append(
                "program[program_title]",
                programObj.program_title
              );
              formData.append(
                "program[program_description]",
                programObj.program_description
              );
              formData.append("program[price]", programObj.price);
              formData.append("program[photo]", programObj.photo_url);
              formData.append(
                "program[number_of_days]",
                programObj.number_of_days
              );
              mutate(formData);
            }}
          >
            CREATE
          </Button>
        </main>
        <div></div>
      </div>
    </Fragment>
  );
};

export default ProgramCreate;
