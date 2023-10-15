import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (data) => {
      navigate("/", {
        replace: true,
      });
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { login, isLoggingIn };
}

export default useLogin;
