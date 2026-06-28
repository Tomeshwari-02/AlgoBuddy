"use client";
import Head from "next/head";
import AuthForm from "@/app/components/ui/AuthForm";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("theme") || 
                  (document.documentElement.classList.contains("dark") ? "dark" : "light");
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles/dark-mode.css" />
      </Head>
      <AuthForm isLogin={false} />
      
      {mounted ? (
        <button className="toggle" id="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}
        </button>
      ) : (
        <button className="toggle" id="theme-toggle" style={{ visibility: "hidden" }}>
          🌙 Dark mode
        </button>
      )}
    </>
  );
}
