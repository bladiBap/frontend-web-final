import { toast } from 'react-toastify';

export default function showToast (message: string, type: string) {
    return toast(message, {
        type: type,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};