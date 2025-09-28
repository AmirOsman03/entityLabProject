import axiosInstance from "../axios/axios.js";

const entityRepository = {
    generateCode: async (classname, idName, idType, fields, relations) => {
        return await axiosInstance.post("/generator/generate-entity", {
            name: classname,
            idName: idName,
            idType: idType,
            fields: fields,
            relations: relations,
        });
    }
};

export default entityRepository;