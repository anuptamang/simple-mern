import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type stylesProps = {
  position: string | number | undefined | any;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  draggable: boolean;
  progress: undefined | any;
  theme: any;
};

const styles: stylesProps = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const notify = (title: string, id: string | number, type: string) => {
  if (type === 'success') {
    return toast.success(title, { ...styles, toastId: id });
  } else if (type === 'error') {
    return toast.error(title, { ...styles, toastId: id });
  } else if (type === 'warning') {
    return toast.warn(title, { ...styles, toastId: id });
  } else if (type === 'info') {
    return toast.info(title, { ...styles, toastId: id });
  } else {
    return toast(title, { ...styles, toastId: id });
  }
};
