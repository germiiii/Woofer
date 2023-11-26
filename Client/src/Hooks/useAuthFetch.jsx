import { useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import NotificationContext from '../Context/NotificationContext';

export function useAuthFetch() {
  const { showNotification } = useContext(NotificationContext);
  const router = useRouter();

  const authRouter = async ({ endpoint, formData, redirectRoute, options }) => {
    try {
      const { data } = await axios.post(`/api/auth/${endpoint}`, formData, options);

      showNotification({
        msj: data.message,
        open: true,
        status: 'success',
      });

      if (redirectRoute) router.push(redirectRoute);
    } catch (error) {
      showNotification({
        msj: error.response.data.message || 'An error occurred',
        open: true,
        status: 'error',
      });
    }
  };

  return authRouter;
}
