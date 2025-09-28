import React, {useState} from "react";
import useEntityGenerator from "../../../hooks/useEntityGenerator.js";
import {TiDeleteOutline} from "react-icons/ti";
import {IoIosAddCircleOutline} from "react-icons/io";
import {motion, AnimatePresence} from "framer-motion";

const EntityForm = () => {
    const [className, setClassName] = useState("");
    const [idName, setIdName] = useState("id");
    const [idType, setIdType] = useState("Long");
    const [fields, setFields] = useState([]);
    const [relations, setRelations] = useState([]);

    const {preview, loading, error, generateCode} = useEntityGenerator();

    const addField = () => setFields([...fields, {name: "", type: "String"}]);

    const updateField = (index, key, value) => {
        const newFields = [...fields];
        newFields[index][key] = value;
        setFields(newFields);
    };

    const removeField = (index) => setFields(fields.filter((_, i) => i !== index));

    const addRelation = () => setRelations([...relations, {
        type: "ManyToOne", targetEntity: "", fieldName: "", mappedBy: ""
    }]);

    const updateRelation = (index, key, value) => {
        const newRelations = [...relations];
        newRelations[index][key] = value;
        setRelations(newRelations);
    };

    const removeRelation = (index) => setRelations(relations.filter((_, i) => i !== index));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!className || !idName || !idType) return;
        generateCode(className, idName, idType, fields, relations);
    };

    const containerVariants = {
        hidden: {opacity: 0}, visible: {
            opacity: 1, transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20}, visible: {
            opacity: 1, y: 0, transition: {
                duration: 0.5, ease: "easeOut"
            }
        }
    };

    const cardVariants = {
        hidden: {opacity: 0, scale: 0.9}, visible: {
            opacity: 1, scale: 1, transition: {
                duration: 0.4, ease: "easeOut"
            }
        }, hover: {
            scale: 1.02, boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)", transition: {
                duration: 0.2
            }
        }
    };

    return (<motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 py-8 px-4"
    >
        <div className="max-w-7xl mx-auto">
            <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold text-center text-white mb-2"
            >
                Welcome chef!
            </motion.h1>
            <motion.p
                variants={itemVariants}
                className="text-center text-blue-200 mb-8"
            >
                Let's cook something awesome!
            </motion.p>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Form Section */}
                <motion.div
                    variants={itemVariants}
                    className="lg:w-1/2"
                >
                    <motion.form
                        onSubmit={handleSubmit}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/10"
                    >
                        {/* Class Name */}
                        <motion.div variants={itemVariants} className="mb-6">
                            <label className="block text-blue-300 font-semibold mb-3 text-lg">
                                Class Name
                            </label>
                            <motion.input
                                type="text"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Enter your class name"
                                required
                                whileFocus={{scale: 1.02}}
                            />
                        </motion.div>

                        {/* ID Configuration */}
                        <motion.div variants={itemVariants} className="mb-6">
                            <label className="block text-blue-300 font-semibold mb-3 text-lg">
                                Primary Key
                            </label>
                            <div className="flex gap-3">
                                <motion.input
                                    type="text"
                                    value={idName}
                                    onChange={(e) => setIdName(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-xl bg-gray-700/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Primary key name"
                                    required
                                    whileFocus={{scale: 1.02}}
                                />
                                <motion.select
                                    value={idType}
                                    onChange={(e) => setIdType(e.target.value)}
                                    className="px-4 py-3 rounded-xl bg-gray-700/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    whileFocus={{scale: 1.02}}
                                >
                                    <option value="Long">Long</option>
                                    <option value="String">String</option>
                                    <option value="Integer">Integer</option>
                                </motion.select>
                            </div>
                        </motion.div>

                        {/* Fields Section */}
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-blue-300 font-semibold text-lg">Fields</label>
                                <span className="text-sm text-gray-400">{fields.length} field(s)</span>
                            </div>

                            <AnimatePresence>
                                {fields.map((field, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="grid grid-cols-2 gap-3 mb-3"
                                    >
                                        <motion.input
                                            type="text"
                                            placeholder="Field Name"
                                            value={field.name}
                                            onChange={(e) => updateField(i, "name", e.target.value)}
                                            className="px-4 py-3 rounded-xl bg-gray-700/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            required
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                        <motion.select
                                            value={field.type}
                                            onChange={(e) => updateField(i, "type", e.target.value)}
                                            className="px-4 py-3 rounded-xl bg-gray-700/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            whileFocus={{ scale: 1.02 }}
                                        >
                                            <option value="String">String</option>
                                            <option value="Integer">Integer</option>
                                            <option value="Long">Long</option>
                                            <option value="Double">Double</option>
                                            <option value="Boolean">Boolean</option>
                                            <option value="LocalDate">LocalDate</option>
                                            <option value="LocalDateTime">LocalDateTime</option>
                                        </motion.select>
                                        <motion.button
                                            type="button"
                                            onClick={() => removeField(i)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="col-span-2 px-3 text-red-400 hover:text-red-300 transition-colors duration-200 flex justify-center"
                                        >
                                            <TiDeleteOutline className="text-2xl" />
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <motion.button
                                type="button"
                                onClick={addField}
                                className="relative w-full py-4 rounded-xl bg-slate-800/50 border border-slate-600/50 text-white flex items-center justify-center gap-3 group hover:bg-slate-700/50 hover:border-blue-400/30 transition-all duration-300 backdrop-blur-sm overflow-hidden"
                                whileHover={{
                                    scale: 1.02,
                                    y: -2
                                }}
                                whileTap={{
                                    scale: 0.98,
                                    y: 0
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <motion.div
                                    className="flex items-center justify-center gap-3"
                                    whileHover={{ gap: 4 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <motion.div
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 180
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200
                                        }}
                                    >
                                        <IoIosAddCircleOutline className="text-3xl text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
                                    </motion.div>
                                    <span className="font-medium text-white group-hover:text-blue-100 transition-colors duration-300">
                Add Field
            </span>
                                </motion.div>
                            </motion.button>
                        </motion.div>

                        {/* Relations Section */}
                        <motion.div variants={itemVariants} className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-blue-300 font-semibold text-lg">Relations</label>
                                <span className="text-sm text-gray-400">{relations.length} relation(s)</span>
                            </div>

                            <AnimatePresence>
                                {relations.map((rel, i) => (<motion.div
                                    key={i}
                                    initial={{opacity: 0, height: 0}}
                                    animate={{opacity: 1, height: "auto"}}
                                    exit={{opacity: 0, height: 0}}
                                    transition={{duration: 0.3}}
                                    className="grid grid-cols-2 gap-3 mb-3"
                                >
                                    <motion.select
                                        value={rel.type}
                                        onChange={(e) => updateRelation(i, "type", e.target.value)}
                                        className="px-4 py-3 rounded-xl bg-gray-700/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        whileFocus={{scale: 1.02}}
                                    >
                                        <option value="OneToOne">OneToOne</option>
                                        <option value="OneToMany">OneToMany</option>
                                        <option value="ManyToOne">ManyToOne</option>
                                        <option value="ManyToMany">ManyToMany</option>
                                    </motion.select>
                                    <motion.input
                                        type="text"
                                        placeholder="Target Entity"
                                        value={rel.targetEntity}
                                        onChange={(e) => updateRelation(i, "targetEntity", e.target.value)}
                                        className="px-4 py-3 rounded-xl bg-gray-700/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        required
                                        whileFocus={{scale: 1.02}}
                                    />
                                    <motion.input
                                        type="text"
                                        placeholder="Field Name"
                                        value={rel.fieldName}
                                        onChange={(e) => updateRelation(i, "fieldName", e.target.value)}
                                        className="px-4 py-3 rounded-xl bg-gray-700/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        required
                                        whileFocus={{scale: 1.02}}
                                    />
                                    <motion.input
                                        type="text"
                                        placeholder="Mapped by"
                                        value={rel.mappedBy}
                                        onChange={(e) => updateRelation(i, "mappedBy", e.target.value)}
                                        className="px-4 py-3 rounded-xl bg-gray-700/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        whileFocus={{scale: 1.02}}
                                    />
                                    <motion.button
                                        type="button"
                                        onClick={() => removeRelation(i)}
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.9}}
                                        className="col-span-2 px-3 text-red-400 hover:text-red-300 transition-colors duration-200 flex justify-center"
                                    >
                                        <TiDeleteOutline className="text-2xl"/>
                                    </motion.button>
                                </motion.div>))}
                            </AnimatePresence>

                            <motion.button
                                type="button"
                                onClick={addRelation}
                                className="relative w-full py-4 rounded-xl bg-slate-800/50 border border-slate-600/50 text-white flex items-center justify-center gap-3 group hover:bg-slate-700/50 hover:border-green-400/30 transition-all duration-300 backdrop-blur-sm overflow-hidden"
                                whileHover={{
                                    scale: 1.02, y: -2
                                }}
                                whileTap={{
                                    scale: 0.98, y: 0
                                }}
                            >
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>
                                <motion.div
                                    className="flex items-center justify-center gap-3"
                                    whileHover={{gap: 4}}
                                    transition={{type: "spring", stiffness: 400}}
                                >
                                    <motion.div
                                        whileHover={{
                                            scale: 1.1, rotate: 180
                                        }}
                                        transition={{
                                            type: "spring", stiffness: 200
                                        }}
                                    >
                                        <IoIosAddCircleOutline
                                            className="text-3xl text-green-400 group-hover:text-cyan-400 transition-colors duration-300"/>
                                    </motion.div>
                                    <span
                                        className="font-medium text-white group-hover:text-green-100 transition-colors duration-300">
                                            Add Relation
                                        </span>
                                </motion.div>
                            </motion.button>
                        </motion.div>

                        {/* Minimalist Modern Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="relative w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold text-lg shadow-lg disabled:opacity-60 disabled:cursor-not-allowed group overflow-hidden border border-cyan-400/20"
                            whileHover={!loading ? {
                                scale: 1.02, boxShadow: "0 15px 30px -10px rgba(6, 182, 212, 0.3)"
                            } : {}}
                            whileTap={!loading ? {scale: 0.98} : {}}
                            transition={{duration: 0.2}}
                        >
                            {/* Subtle shine effect */}
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"/>

                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (<>
                                    <motion.div
                                        animate={{rotate: 360}}
                                        transition={{duration: 1, repeat: Infinity, ease: "linear"}}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                    <motion.span
                                        animate={{opacity: [0.6, 1, 0.6]}}
                                        transition={{duration: 1.5, repeat: Infinity}}
                                    >
                                        Generating...
                                    </motion.span>
                                </>) : (<>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                    Generate Code
                                </>)}
                            </span>
                        </motion.button>

                        {error && (<motion.p
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            className="text-red-400 mt-4 p-3 bg-red-900/20 rounded-xl border border-red-400/20"
                        >
                            {error.message}
                        </motion.p>)}
                    </motion.form>
                </motion.div>

                {/* Preview Section */}
                <motion.div
                    variants={itemVariants}
                    className="lg:w-1/2"
                >
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/10 h-full flex flex-col"
                    >
                        <h3 className="text-blue-300 font-semibold text-lg mb-4">Code Preview</h3>

                        {preview ? (<motion.pre
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            className="bg-gray-900/50 rounded-xl p-6 text-green-300 font-mono text-sm overflow-auto max-h-[600px] border border-white/10 flex-1"
                        >
                            {preview}
                        </motion.pre>) : (<motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            className="bg-gray-900/50 rounded-xl p-8 text-gray-400 flex flex-col items-center justify-center h-64 border border-white/10 border-dashed flex-1"
                        >
                            <div className="text-4xl mb-4">👨‍💻</div>
                            <p className="text-center">Your generated code will appear here</p>
                            <p className="text-sm text-gray-500 mt-2 text-center">
                                Fill out the form and click "Generate Code"
                            </p>
                        </motion.div>)}
                        {/* Modern Copy Button */}
                        {preview && (<motion.div
                            className="flex justify-end mt-5"
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.3}}
                        >
                            <motion.button
                                onClick={async () => {
                                    await navigator.clipboard.writeText(preview);
                                    // You can add toast notification here
                                }}
                                className="relative px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 group overflow-hidden"
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                            >
                                {/* Background shine effect */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"/>

                                {/* Button content */}
                                <div className="flex items-center gap-2 relative z-10">
                                    <motion.svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        initial={{scale: 1}}
                                        whileTap={{scale: 0.8}}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                    </motion.svg>
                                    <span>Copy Code</span>
                                </div>
                            </motion.button>
                        </motion.div>)}
                    </motion.div>
                </motion.div>

            </div>
        </div>
    </motion.div>);
};

export default EntityForm;