import React from "react";
import { motion } from "framer-motion";
import {useNavigate} from "react-router";
import BackendArchitecture from "../components/visualArchitecture/BackendArchitecture.jsx";
import FrontendArchitecture from "../components/visualArchitecture/FrontendArchitecture.jsx";
import TechCarousel from "../components/carousel/TechCarousel.jsx";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className={"min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800"}>
            {/*Top section*/}
            <div className="flex justify-evenly items-center py-5 ">
                <div>
                    <h1 className={"text-8xl text-white w-lg font-bold"}>Entity Laboratory</h1>
                    <div className="flex items-center mt-5">
                        <div className="flex-1 border-t border-gray-400"/>
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
                            <p className={"text-gray-300 text-center"}>Active Users</p>
                        </div>
                        <div>
                            <h2 className={"text-white text-5xl font-light text-center"}>20K+</h2>
                            <p className={"text-gray-300 text-center"}>Entities made</p>
                        </div>
                    </div>
                    <div className={"flex my-5"}>
                        <motion.button
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-medium cursor-pointer overflow-hidden relative"
                            whileHover={{
                                scale: 1.05,
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => navigate("/generate-entity")}
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                            <span className="relative">Try it out!</span>
                        </motion.button>
                    </div>
                </div>
            </div>
            <div className={"grid grid-cols-2 gap-10 py-5"}>
                <BackendArchitecture/>
                <FrontendArchitecture/>
            </div>
            <TechCarousel/>
        </div>
    );
};

export default HomePage;
