import React from "react";
import { motion } from "framer-motion";
import {useNavigate} from "react-router";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className={"bg-gradient-to-r from-slate-900 to-slate-700 h-screen"}>
            {/*Top section*/}
            <div className="flex justify-evenly items-center py-5 ">
                <div>
                    <h1 className={"text-8xl text-white w-lg font-bold"}>Entity Laboratory</h1>
                    <div className="flex items-center mt-5">
                        <div className="flex-1 border-t border-gray-400"></div>
                        <p className="text-white mx-4 text-lg">Designed for developers</p>
                    </div>
                </div>
                <div>
                    <p className={"text-white text-xl w-md"}>
                        A tool for quickly generating JPA entities with fields and
                        relations, saving time and reducing errors.
                    </p>
                    <div className={"flex justify-items-evenly gap-20 mt-5"}>
                        <div>
                            <h2 className={"text-white text-5xl font-light text-center"}>4.9 M</h2>
                            <p className={"text-gray-500 text-center"}>Active Users</p>
                        </div>
                        <div>
                            <h2 className={"text-white text-5xl font-light text-center"}>20K+</h2>
                            <p className={"text-gray-500 text-center"}>Entities made</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex justify-center my-5"}>
                <motion.button
                    className="bg-gradient-to-r from-emerald-500 to-emerald-900 text-white px-8 py-3 rounded-md cursor-pointer overflow-hidden"
                    whileHover={{
                        scale: 1.1,
                        duration: 0.2,
                        border: "1px solid white"
                    }}
                    transition={{
                        duration: 0.3
                    }}
                    onClick={() => navigate("/generate")}
                >
                    Try it out!
                </motion.button>
            </div>
        </div>
    );
};

export default HomePage;
