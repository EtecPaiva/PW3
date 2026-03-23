import { routes } from "../config/routes.js";
import { GET, POST, DELETE, PUT, PATCH } from "./http.js";

const getSelecoes = async () => {
    return await GET(routes.selecoes);
};

const postSelecao = async (data) => {
    return await POST(routes.selecoes, data);
};

const putSelecao = async (id, data) => {
    return await PUT(`${routes.selecoes}/${id}`, data);
};

const patchSelecao = async (id, data) => {
    return await PATCH(`${routes.selecoes}/${id}`, data);
};

const deleteSelecao = async (id) => {
    return await DELETE(`${routes.selecoes}/${id}`);
};

export { getSelecoes, postSelecao, putSelecao, patchSelecao, deleteSelecao };
