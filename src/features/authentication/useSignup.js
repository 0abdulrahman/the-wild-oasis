import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: ({ fullName, email, password }) => signUp({ fullName, email, password }),
    onSuccess: () =>
      toast.success("Account successfully created! Please verify the new account from the user's email address."),
    onError: (err) => toast.error(err.message),
  });

  return { signup, isSigningUp };
}

export default useSignup;
