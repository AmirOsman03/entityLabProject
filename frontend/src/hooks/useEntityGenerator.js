import { useState } from "react";
import entityRepository from "../repository/entityRepository.js";

const useEntityGenerator = () => {
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateCode = async (classname, idName, idType,  fields, relations) => {
        setLoading(true);
        setError(null);

        try {
            const response = await entityRepository.generateCode(classname, idName, idType, fields, relations);
            setPreview(response.data.code);
        } catch (err) {
            setError(err);
            console.error("Error generating entity:", err);
        } finally {
            setLoading(false);
        }
    };

    return { preview, loading, error, generateCode };
};

export default useEntityGenerator;
