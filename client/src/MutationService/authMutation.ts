import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../API_Service/axiosInstance";
import type { ILoginProps } from "../pages/Login";
import { loginUser } from "../API_Service/authAPI";

type IAxiosMethod = 'post' | 'delete' | 'put' | 'patch' | 'get';

const axiosMutationClient = <T>({
  url,
  payload,
  method = 'post'
}: {
  url: string;
  payload?: unknown;
  method?: IAxiosMethod;
}) => {
  return axiosInstance[method]<T>(url, payload)
    .then(r => {

      return {
        ...(r.data as any),
        isSuccess: true as const,
        message: (r.data as any).message as string
      };
    })
    .catch(e => ({
      message: e.response.data,
      isSuccess: false as const
    }));
};

export const useLoginUserMutation = () => {
  const queryClient = useQueryClient();
  const queryKey = ['user-login'];

  const loginUserMutation = useMutation({
    mutationFn: async ({ payload }: { payload: ILoginProps }) => {
      console.log(payload)
      return axiosMutationClient({
        url: `/auth/login`,
        payload: { ...payload },
        method: 'post'
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });

  return loginUserMutation;
};