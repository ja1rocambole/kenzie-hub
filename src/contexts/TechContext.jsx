import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { UserContext } from "./UserContext";

export const TechContext = createContext();

export const TechProvider = ({ children }) => {
  const { setUser } = useContext(UserContext);

  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);

  const postCreateTech = async (data) => {
    const token = localStorage.getItem("@TOKEN");

    try {
      const response = await api.post("/users/techs", data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const userResponse = await api.get(`/profile`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setUser(userResponse.data);
    } catch (error) {
      console.log(error);
      toast.error("Ops! Algo deu errado");
    } finally {
      setModalRegisterVisible(false);
    }
  };

  const putEditTech = async (data, idTech, setModalEditRemoveVisible) => {
    const token = localStorage.getItem("@TOKEN");

    try {
      const response = await api.put(`/users/techs/${idTech}`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const userResponse = await api.get(`/profile`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setUser(userResponse.data);
    } catch (error) {
      console.log(error);
      toast.error("Ops! Algo deu errado");
    } finally {
      setModalEditRemoveVisible(false);
    }
  };

  const deleteTech = async (idTech, setModalEditRemoveVisible) => {
    const token = localStorage.getItem("@TOKEN");

    try {
      const response = await api.delete(`/users/techs/${idTech}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const userResponse = await api.get(`/profile`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setUser(userResponse.data);
    } catch (error) {
      console.log(error);
      toast.error("Ops! Algo deu errado");
    } finally {
      setModalEditRemoveVisible(false);
    }
  };

  return (
    <TechContext.Provider
      value={{
        postCreateTech,
        modalRegisterVisible,
        setModalRegisterVisible,
        putEditTech,
        deleteTech,
      }}
    >
      {children}
    </TechContext.Provider>
  );
};
