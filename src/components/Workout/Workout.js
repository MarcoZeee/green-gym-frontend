import classes from "./Workout.module.css";
import { Fragment, useState } from "react";

import { useProgram } from "../Program/hooks/use-program";
import { useGetProgramTracker } from "../Trackers/hooks/use-program-tracker";
import DailyCheckInCard from "./DailyCheckInCard";
import DailyWorkoutCard from "./DailyWorkoutCard";
import DailyChallengeCard from "./DailyChallengeCard";
import WorkoutDayTracker from "./WorkoutDayTracker";

const Workout = ({ userData }) => {
  const programId = userData.programs[0].id;

  // TODO: Add use Program tracker to find the tracker for this program
  const { data: programTrackerData, isLoading: programTrackerIsLoading } =
    useGetProgramTracker(userData.program_trackers[0].id);

  // TODO: Get the Program
  const { data: programData, isLoading: programIsLoading } =
    useProgram(programId);

  let dailyWorkout;
  let dailyWorkoutId;
  let dailyWorkoutTracker;
  let dailyWorkoutTrackerId;

  if (!programIsLoading && !programTrackerIsLoading) {
    // dailyWorkout = programData.daily_workouts[0];
    // dailyWorkoutTracker = programTrackerData
    dailyWorkout = programData.daily_workouts[0];
    dailyWorkoutId = programData.daily_workouts[0].id;
    dailyWorkoutTracker = programTrackerData.daily_workout_trackers[0];
    dailyWorkoutTrackerId = programTrackerData.daily_workout_trackers[0].id;
    console.log(dailyWorkoutId, "PROGRAM DATA");
    console.log(dailyWorkoutTrackerId, "PROGRAM TRACKER");
  }

  const [checkInIsComplete, setCheckInIsComplete] = useState(false);
  const [challengeIsComplete, setChallengeIsComplete] = useState(false);

  const checkInCompleteHandler = () => {
    setCheckInIsComplete(true);
    // Query call to update the challenge
  };

  const challengeCompleteHandler = () => {
    setChallengeIsComplete(true);

    // Query call to update the challenge
  };

  if (programIsLoading && programTrackerIsLoading) return <p>Loading...</p>;

  return (
    <Fragment>
      <div className={classes.workoutDayTrackerContainer}>
        <WorkoutDayTracker programTitle={userData.programs[0].program_title} />
      </div>
      <div className={classes.cardsContainer}>
        <DailyCheckInCard
          dailyWorkoutTracker={dailyWorkoutTracker}
          getCompleted={checkInCompleteHandler}
        />
        <DailyWorkoutCard
          dailyWorkout={dailyWorkout}
          dailyWorkoutTracker={dailyWorkoutTracker}
        />
        <DailyChallengeCard
          dailyWorkout={dailyWorkout}
          dailyWorkoutTracker={dailyWorkoutTracker}
          getCompleted={challengeCompleteHandler}
        />
      </div>
    </Fragment>
  );
};

export default Workout;
