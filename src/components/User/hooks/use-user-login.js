import axios from "axios";
import { useContext } from "react";

import AuthContext from "../../../context/AuthContext";
import useAPIError from "../../../common/hooks/use-API-error";
import { useMutation } from "react-query";
import { userBaseUrl } from "../../../axiosInstance/user-constants";
import { queryKeys } from "../../../react-query/constants";

const createUserLogin = async (user) => {
  const { data: response , headers } = await axios.post(`${userBaseUrl}/login`, { user: user });

  return { response, headers };
};

export const useUserLogin = () => {
  const authCtx = useContext(AuthContext);

  const { addError } = useAPIError();
  const { mutate } = useMutation(
    queryKeys.user,
    (user) => createUserLogin(user),
    {
      onSuccess: (data) => {
        const userData = {
          token: data.headers.authorization,
          userId: data.response.data.id,
          admin: data.response.data.admin
        }

        authCtx.login(userData);
      },
      onError: (error) => {
        console.log(error);
        console.log(error.response.data);
        const title =
          error instanceof Error
            ? error.response.data
            : "error connecting to server";
        addError(title, error);
      },
    }
  );

  return mutate;
};
