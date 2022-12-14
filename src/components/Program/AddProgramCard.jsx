import classes from "./ProgramCard.module.css";
import Card from "../UI/Card";
import { Link } from "react-router-dom";
import { RiAddCircleLine } from "react-icons/ri";
import { FiArrowRightCircle } from "react-icons/fi";
import { useState } from "react";

export const AddProgramCard = () => {
  const [state, setState] = useState({
    program_title: "",
    program_description: "",
    photo_url: "",
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Card className={classes.card}>
      <div className={classes.icons}>
        <Link to="add-program" state={state}>
          <div className={classes.iconBin}>
            <span fontSize="0.2rem">NEXT</span>
            <FiArrowRightCircle color="darkgreen"/>
          </div>
        </Link>
      </div>
      <div className={classes.title}>
        <input
          style={{
            fontSize: "1.4rem",
          }}
          placeholder="PROGRAM TITLE"
          maxLength="18"
          onChange={(e) => {
            e.preventDefault();
            setState({ ...state, program_title: e.target.value });
          }}
        ></input>
      </div>

      <div className={classes.image}>
        <label htmlFor="upload_image">
          {!imageLoaded ? (
            <RiAddCircleLine size="6rem" color="darkgreen" />
          ) : (
            <img src={URL.createObjectURL(state.photo_url)} />
          )}
        </label>
        <input
          id="upload_image"
          name="upload_image"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => {
            e.preventDefault();
            setState({ ...state, photo_url: e.target.files[0] });
            setImageLoaded(true);
          }}
        />
      </div>
      <div className={classes.description}>
        <textarea
          placeholder="use one sentence to describe your program"
          cols={30}
          onChange={(e) => {
            e.preventDefault();
            setState({ ...state, program_description: e.target.value });
          }}
        ></textarea>
      </div>
    </Card>
  );
};
