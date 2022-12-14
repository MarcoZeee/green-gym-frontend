import axios from "axios";
import { useQuery } from "react-query";
// import { useContext } from "react";

// import AuthContext from "../../../context/AuthContext";
// import { axiosInstance } from "../../../axiosInstance";
import useAPIError from "../../../common/hooks/use-API-error";
import { queryKeys } from "../../../react-query/constants";
import { baseUrl } from "../../../axiosInstance/constants";

// for when we need a query function for useQuery
const getPrograms = async () => {
  const { data } = await axios(`${baseUrl}/programs`);
  return data;
};

export const usePrograms = () => {
  // const authCtx = useContext(AuthContext);
  // const bearerToken = authCtx.token;

  const { addError } = useAPIError();
  const fallback = [];
  const {
    data = fallback,
    isError,
    error,
    isLoading,
    isSuccess
  } = useQuery(queryKeys.programs, getPrograms, {
    onError: (error) => {
      const title =
        error instanceof Error ? error.message : "error connecting to server";
      addError(title, error.status);
    },
  });
  return { data, isError, error, isLoading, isSuccess };
};
