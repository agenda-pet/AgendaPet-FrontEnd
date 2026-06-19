<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import secureLocalStorage from "react-secure-storage";
import axios from "axios";

const apiLocal = "https://localhost:7057/api/";

const apiRemota = "";

export const api = axios.create({
  baseURL: apiLocal,
});

api.interceptors.request.use((config) => {
  const token = secureLocalStorage.getItem("Token");

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});
=======
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

=======
import axios from "axios";

>>>>>>> feature/listaPets
=======
import axios from "axios";

>>>>>>> feature/listaAgendamentos
const apiLocal = " https://localhost:7057/api/";

const apiRemota = "";

// criar um endereco da API dentro do axios
export const api = axios.create({
    baseURL: apiLocal
<<<<<<< HEAD
})

// api.interceptors.request.use((config) => {
//     const token = secureLocalStorage.getItem("Token");

//     if(token){
//         config.headers.Authorization = "Bearer " + token;
//     }

//     return config;
<<<<<<< HEAD
// });
>>>>>>> feature/listaUsuarios
=======
// });
>>>>>>> feature/listaPets
=======
})
>>>>>>> feature/listaAgendamentos
