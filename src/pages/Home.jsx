// src/pages/Home.jsx
import { useEffect, useRef } from "react";
import { useAuth } from "../context/useAuth.js";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const { isLoggedIn, name, logout } = useAuth();
  const navigate = useNavigate();
  const actionsRef = useRef(null);

  useEffect(() => {
    const target = actionsRef.current;
    if (!target) return;

    const html = document.documentElement;
    const body = document.body;

    // remember prior inline styles so we can restore exactly
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
    };

    const lock = () => {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";           // helps iOS Safari
      html.style.overscrollBehavior = "contain"; // prevent bounce
    };

    const unlock = () => {
      html.style.overflow = prev.htmlOverflow || "";
      body.style.overflow = prev.bodyOverflow || "";
      html.style.overscrollBehavior = prev.htmlOverscroll || "";
    };

    const applyNow = () => {
      const r = target.getBoundingClientRect();
      const fullyVisible = r.top >= 0 && r.bottom <= window.innerHeight;
      fullyVisible ? lock() : unlock();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        // fully visible -> lock; otherwise -> unlock
        entry.intersectionRatio >= 1 ? lock() : unlock();
      },
      { threshold: [1] }
    );

    io.observe(target);
    applyNow();

    const onResize = () => applyNow();
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      unlock();
    };
  }, [isLoggedIn]); // ref target changes with the conditional markup

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <main className="home" role="main" aria-labelledby="home-title">
      <section className="home__center glass">
        <header className="home__brand">
          <h1 id="home-title" className="home__title">
            Photon Studio<span className="home__tm">™</span>
          </h1>
          <p className="home__subtitle">Create. Iterate. Ship.</p>
        </header>

        <div className="card card--glass">
          {!isLoggedIn ? (
            <>
              <h2 className="card__title">Welcome</h2>
              <p className="card__text">
                Please log in or create an account to start shopping.
              </p>
              <div className="card__actions" ref={actionsRef}>
                <Link to="/login" className="btn btn--primary" aria-label="Login">
                  Login
                </Link>
                <Link to="/register" className="btn" aria-label="Register">
                  Register
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="card__title">Welcome back, {name}</h2>
              <div className="card__actions" ref={actionsRef}>
                <Link to="/products" className="btn btn--primary">
                  Browse Products
                </Link>
                <button className="btn btn--ghost" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
