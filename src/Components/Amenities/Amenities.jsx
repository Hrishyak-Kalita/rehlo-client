import React from 'react'
import styles from './Amenities.module.scss'
import { FaTv, FaWifi, FaGitAlt, FaPython } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { RiNextjsLine } from "react-icons/ri";
import { SiMysql, SiJavascript, SiFirebase, SiVite,SiGooglecloud  } from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";

const List = [
  { icon: <FaTv size={30} />, name: "Tv" },
  { icon: <RiNextjsLine size={30} />, name: "Next.js" },
  { icon: <FaWifi size={30} />, name: "Wifi" },
  { icon: <SiJavascript size={30} />, name: "JavaScript" },
  { icon: <DiMongodb size={30} />, name: "MongoDB" },
  { icon: <SiMysql size={30} />, name: "MySQL" },
  { icon: <SiFirebase size={30} />, name: "Firebase" },
  { icon: <SiGooglecloud size={30} />, name: "Google Cloud" },
  { icon: <FaGitAlt size={30} />, name: "Git" },
  { icon: <SiVite size={30} />, name: "Vite" },
  { icon: <TbBrandCpp size={30} />, name: "C++" },
  { icon: <FaPython size={30} />, name: "Python" }
];

const Amenities = () => {
  return (
    <div className={styles.container}>
      <div className={styles.skills}>
        {List.map((skill, index) => (
          <div key={index} className={styles.iconBox}>
            {skill.icon}
            {/* <p>{skill.name}</p> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Amenities;