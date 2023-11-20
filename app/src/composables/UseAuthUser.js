import { ref } from 'vue'
import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'
import { useRouter } from 'vue-router'

const user = ref(null)

export default function useAuthUser () {

  const router = useRouter()

  const login = async ({ email, password }) => {
    LocalStorage.set('userData', null);

    try {
        const response = await api.post('http://localhost/api/login', { email, password });
        const token = response.data.token;
        const userData = await getUser(token);

        LocalStorage.set('userData', userData);

    } catch (error) {
      if (typeof error.response !== 'undefined') {
          if (error.response.statusText == 'Unauthorized') {
            throw new Error("Usuario e senha inválidos!");
          }
      }

      throw new Error(error.message);
    }
  }

  const getUser = async (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await api.get('http://localhost/api/user', config);
      const userData = {
        name: response.data.user.name,
        email: response.data.user.email,
        token: token
      };
      return userData;
    } catch (error) {
      throw error;
    }
  }

  const logout = () => {
    LocalStorage.set('userData', null)
  }

  const isLoggedIn = async () => {
    const userData = LocalStorage.getItem('userData');

    if (!userData || userData.name === undefined) {
      return false;
    }

    try {
      const response = await getUser(userData.token);
    } catch (error) {
      if (typeof error.response !== 'undefined') {

          if (error.response.statusText == 'Unauthorized') {
            console.log(error.response.statusText);
            router.push({ name: 'login' });
          }
      }
    }

    return true;
  }

  const register = async ({ email, password, ...meta }) => {}

  return {
    user,
    login,
    logout,
    isLoggedIn,
    register,
  }
}
