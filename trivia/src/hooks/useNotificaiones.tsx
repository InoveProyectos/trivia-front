import { toast } from "react-toastify";

const useNotificaiones = () => {
  const errorToast = (message: string) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return { errorToast };
};

export default useNotificaiones;
