import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import { verifyLogin } from "../services/userStore.js";
import { useState } from "react";

// Regex to check if email format is valid
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // UI: toggle password visibility
  const [showPw, setShowPw] = useState(false);

  // Formik manages the form
  const formik = useFormik({
    // starting values for fields
    initialValues: { email: "", password: "", remember: false },

    // validation rules
    validate: (v) => {
      const e = {};
      if (!v.email) e.email = "Email is required";
      else if (!emailRe.test(v.email)) e.email = "Enter a valid email address";

      if (!v.password) e.password = "Password is required";
      else if (v.password.length < 8)
        e.password = "Password must be at least 8 characters";

      return e;
    },

    // what happens on submit
    onSubmit: async (values, helpers) => {
      helpers.setStatus(null);
      const { ok, user } = await verifyLogin(values.email, values.password);

      if (!ok) {
        helpers.setStatus("Invalid email or password"); // show error
        return;
      }

      // choose name to display (firstName or email before @)
      const display = user.firstName || user.email.split("@")[0];
      login(display);

      // send user to the page they came from, or home
      navigate(from, { replace: true });
    },
  });

  const emailError = formik.touched.email && formik.errors.email ? formik.errors.email : "";
  const pwError = formik.touched.password && formik.errors.password ? formik.errors.password : "";

  return (
    <section className="page form-page glass" aria-labelledby="login-title">
      <header className="mb-3" style={{ textAlign: "center" }}>
        <h1 id="login-title">Login</h1>
        <p className="muted" style={{ margin: 0 }}>
          Welcome back — sign in to continue.
        </p>
      </header>

      {/* login form */}
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className="form card-like"
        aria-describedby={formik.status ? "form-status" : undefined}
      >
        {/* Email input */}
        <div className="form-row">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`input ${emailError ? "input--error" : ""}`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "email-error" : undefined}
            required
          />
          {emailError && (
            <div id="email-error" className="error-text">
              {emailError}
            </div>
          )}
        </div>

        {/* Password input */}
        <div className="form-row">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <label htmlFor="password" className="label" style={{ margin: 0 }}>
              Password
            </label>
            {/* show/hide toggle */}
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setShowPw((s) => !s)}
              aria-pressed={showPw}
              style={{ padding: "0.35rem 0.6rem" }}
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>

          <input
            id="password"
            name="password"
            type={showPw ? "text" : "password"}
            className={`input ${pwError ? "input--error" : ""}`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Minimum 8 characters"
            autoComplete="current-password"
            aria-invalid={!!pwError}
            aria-describedby={pwError ? "password-error" : undefined}
            required
          />
          {pwError && (
            <div id="password-error" className="error-text">
              {pwError}
            </div>
          )}
        </div>

        {/* Remember + secondary actions */}
        <div className="row" style={{ justifyContent: "space-between", marginTop: 8 }}>
          <label htmlFor="remember" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--muted)" }}>
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={formik.values.remember}
              onChange={formik.handleChange}
              style={{ margin: 0 }}
            />
            Remember me
          </label>

          {/* Optional: swap href to your real reset route */}
          <a href="/reset" className="muted" style={{ textDecoration: "none" }}>
            Forgot password?
          </a>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn--primary"
          disabled={formik.isSubmitting}
          aria-busy={formik.isSubmitting}
          style={{ width: "100%", marginTop: 12 }}
        >
          {formik.isSubmitting ? "Signing in…" : "Login"}
        </button>

        {/* general status message */}
        {formik.status && (
          <div id="form-status" className="error-text" style={{ marginTop: 10 }} role="alert" aria-live="polite">
            {formik.status}
          </div>
        )}
      </form>
    </section>
  );
}
