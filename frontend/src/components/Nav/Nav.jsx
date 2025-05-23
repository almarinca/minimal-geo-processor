"use client";
import styles from "./component.module.css";
import Link from "next/link";
import { Github } from "../Logos/Github";
// import pkg from '@/package.json';

export const Nav = () => {


  return (
    <div
      className={styles.navbar}
    >
      <div>
        🌎 Mini Geo processing App
      </div>
      <div className={styles.nav_container}>
        <Link
          className={styles.repo_link}
          href={"https://github.com/almarinca/minimal-geo-processor"}
        >
          <Github className={styles.logo} />
          <span>Source</span>
        </Link>
      </div>
    </div>
  );
};