import React from "react";
import {motion} from "framer-motion";

const FrontendArchitecture = () => {
    const structure = [
        {
            level: 1, name: "axios", type: "dir", description: "Axios instance"},
        {
            level: 1, name: "repository", type: "dir", description: "Domain repositories for data access"
        },
        {
            level: 1, name: "hooks", type: "dir", description: "Custom hooks for common tasks"
        },
        {
            level: 1, name: "ui", type: "dir", children: [
                {level: 2, name: "components", type: "dir", description: "Reusable UI components"},
                {level: 2, name: "pages", type: "dir", description: "Pages (Home, Login, etc.)"},
            ]
        },
    ];

    return (
        <div className="min-h-screen p-5  ">
            <motion.div
                whileHover={{scale: 1.03, transition: {duration: 0.2}}}
                transition={{
                    duration: 0.3
                }}
                className="max-w-2xl mx-auto shadow-sm border border-slate-200 p-5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="text-center mb-5"
                >
                    <h1 className="text-3xl font-light text-white mb-2">Frontend Architecture</h1>
                    <p className="text-slate-500 text-sm font-mono">frontend/</p>
                </motion.div>

                <div className="px-5">
                    {structure.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: index * 0.1}}
                        >
                            {/* Main directory */}
                            <div className="flex items-center py-2">
                                <div className="w-6 text-slate-400">
                                    <div className="w-4 border-t border-slate-300"/>
                                </div>
                                <div className="text-white font-mono text-sm">📁 {item.name}</div>
                            </div>

                            {/* Children */}
                            {item.children && item.children.map((child, childIndex) => (
                                <motion.div
                                    key={child.name}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: index * 0.1 + (childIndex + 1) * 0.05}}
                                    className="flex items-center py-1 ml-6"
                                >
                                    <div className="w-6">
                                        <div className="w-4 border-t border-slate-300"/>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-slate-400 font-mono text-sm">📁 {child.name}</div>
                                        <div className="text-slate-400 text-xs">— {child.description}</div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Single item without children */}
                            {!item.children && (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: index * 0.1 + 0.1}}
                                    className="flex items-center py-1 ml-6"
                                >

                                    <div className="text-slate-400 text-xs">— {item.description}</div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default FrontendArchitecture;