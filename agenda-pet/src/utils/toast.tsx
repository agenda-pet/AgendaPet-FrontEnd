import { Slide, toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  closeOnClick: true,
  draggable: true,
  transition: Slide,
};

export const sucesso = (msg: string) => toast.success(msg, defaultOptions);
export const erro = (msg: string) => toast.error(msg, defaultOptions);
