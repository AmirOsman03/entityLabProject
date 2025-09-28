import React from "react";
import {motion} from "framer-motion";
import {
    SiSpringboot,
    SiReact,
    SiTailwindcss,
    SiPostgresql,
    SiJavascript,
    SiHibernate,
    SiFramer
} from "react-icons/si";
import {FaJava} from "react-icons/fa";

const technologies = [
    {
        icon: <SiSpringboot size={50}/>,
        name: "Spring Boot",
        color: "#6DB33F",
        link: "https://docs.spring.io/spring-boot/documentation.html"
    },
    {icon: <SiReact size={50}/>, name: "React", color: "#61DBFB", link: "https://react.dev/learn"},
    {
        icon: <SiTailwindcss size={50}/>,
        name: "Tailwind CSS",
        color: "#38B2AC",
        link: "https://tailwindcss.com/docs/installation/using-vite"
    },
    {icon: <SiPostgresql size={50}/>, name: "PostgreSQL", color: "#336791", link: "https://www.postgresql.org/docs/"},
    {icon: <FaJava size={50}/>, name: "Java", color: "#ED8B00", link: "https://docs.oracle.com/en/java/"},
    {
        icon: <SiJavascript size={50}/>,
        name: "JavaScript",
        color: "#F7DF1E",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
    },
    {icon: <SiFramer size={50}/>, name: "Framer Motion", color: "#0055FF", link: "https://motion.dev/docs"}
];

const MinimalTechCarousel = () => {
    return (
        <div className="py-12 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="relative">
                    <motion.div
                        className="flex gap-12 items-center"
                        animate={{x: ["0%", "-100%"]}}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear",
                        }}
                    >
                        {[...technologies, ...technologies].map((tech, index) => (
                            <motion.div
                                href={tech.link}
                                key={index}
                                className="flex-shrink-0 flex items-center gap-3 group cursor-pointer"
                                whileHover={{scale: 1.1}}
                                onClick={() => window.open(tech.link, "_blank")}
                            >
                                <div
                                    className="p-3 rounded-xl  shadow-sm border border-slate-200 group-hover:shadow-md transition-all"
                                    style={{color: tech.color}}
                                >
                                    {tech.icon}
                                </div>
                                <span
                                    className="text-slate-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {tech.name}
                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default MinimalTechCarousel;