import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useContext } from "react";

import AuthContext from "../../../context/AuthContext";
import useAPIError from "../../../common/hooks/use-API-error";
import { queryKeys } from "../../../react-query/constants";
import { baseUrl } from "../../../axiosInstance/constants";

const createProgram = async (program, bearerToken) => {
  await axios.post(`${baseUrl}/programs`, program, {
    headers: {
      Authorization: bearerToken,
    },
  });
};

export const useCreateProgram = () => {
  const authCtx = useContext(AuthContext);
  const bearerToken = authCtx.token;

  const { addError } = useAPIError();
  // const fallback = [];
  const queryClient = useQueryClient();
  const { mutate, isError, isLoading } = useMutation(
    (program) => createProgram(program, bearerToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.programs]);
      },
      onError: (error) => {
        const title =
          error instanceof Error ? error.message : "error connecting to server";
        addError(title, error.status);
      },
    }
  );

  return { mutate, isError, isLoading };
};
