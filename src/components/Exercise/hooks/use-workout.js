import axios from "axios";
import { useQuery } from "react-query";
import { useContext } from "react";

import AuthContext from "../../../context/AuthContext";
import useAPIError from "../../../common/hooks/use-API-error";
import { queryKeys } from "../../../react-query/constants";
import { baseUrl } from "../../../axiosInstance/constants";

const getWorkout = async (prodramId, workoutId, bearerToken) => {
  const { data } = await axios(
    `${baseUrl}/programs/${prodramId}/daily_workouts/${workoutId}`, {
      headers: {
        Authorization: bearerToken
      }
    }
  );

  return data;
};

export const useWorkout = (programId, workoutId) => {
  const authCtx = useContext(AuthContext);
  const bearerToken = authCtx.token;

  const { addError } = useAPIError();
  const fallback = [];
  const { data = fallback, isError, error, isLoading } = useQuery([queryKeys.workout, workoutId], () => getWorkout(programId, workoutId, bearerToken), {
    onError: (error) => {
      const title = error instanceof Error ? error.message : "error connecting to server";
      addError(title, error.status);
    }
  });
  
  return { data, isError, error, isLoading };
};
