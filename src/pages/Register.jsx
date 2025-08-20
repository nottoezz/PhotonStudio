import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import { createUser } from "../services/userStore.js";
import { useState, useMemo } from "react";

// Regex to check if email is valid
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Regex to check if password is strong (upper, lower, number, special, 8+ chars)
const strongPwRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// Lightweight password score for UX (0..5)
function scorePassword(pw) {
  if (!pw) return { score: 0, percent: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[\W_]/.test(pw)) score++;

  const clamped = Math.min(score, 5);
  const percent = (clamped / 5) * 100;
  const palette = [
    { label: "Very weak", color: "#ef4444" },
    { label: "Weak",      color: "#f59e0b" },
    { label: "Okay",      color: "#eab308" },
    { label: "Strong",    color: "#22c55e" },
    { label: "Very strong", color: "#10b981" },
  ];
  const { label, color } = palette[Math.max(0, clamped - 1)] || palette[0];
  return { score: clamped, percent, label, color };
}

export default function Register() {
  const { login } = useAuth();     // used to log the user in after registration
  const navigate = useNavigate();  // to redirect after registration

  // UI: show/hide password fields
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Formik handles form state, validation, and submission
  const formik = useFormik({
    // starting values for the form fields
    initialValues: {
      firstName: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    // validate user input
    validate: (v) => {
      const e = {};
      if (!v.firstName) e.firstName = "First name is required";
      else if (v.firstName.length > 15) e.firstName = "Max 15 characters";

      if (!v.surname) e.surname = "Surname is required";
      else if (v.surname.length > 20) e.surname = "Max 20 characters";

      if (!v.email) e.email = "Email is required";
      else if (!emailRe.test(v.email)) e.email = "Enter a valid email";

      if (!v.password) e.password = "Password is required";
      else if (!strongPwRe.test(v.password))
        e.password = "8+ chars, upper, lower, number, special";

      if (!v.confirmPassword) e.confirmPassword = "Please confirm your password";
      else if (v.confirmPassword !== v.password)
        e.confirmPassword = "Passwords must match";

      return e;
    },

    // what happens when form is submitted
    onSubmit: async (values, helpers) => {
      helpers.setStatus(null);
      try {
        // save the new user
        const user = await createUser(values);

        // log them in immediately (using first name or email before @)
        const display = user.firstName || user.email.split("@")[0];
        login(display);

        // redirect to home page
        navigate("/");
      } catch (err) {
        if (String(err.message).includes("Email already registered")) {
          helpers.setFieldError("email", "Email already registered");
        } else {
          helpers.setStatus("Could not create account. Please try again.");
        }
      } finally {
        helpers.setSubmitting(false); // ensure button re-enables
      }
    },
  });

  const emailError =
    formik.touched.email && formik.errors.email ? formik.errors.email : "";
  const pwError =
    formik.touched.password && formik.errors.password
      ? formik.errors.password
      : "";
  const confirmError =
    formik.touched.confirmPassword && formik.errors.confirmPassword
      ? formik.errors.confirmPassword
      : "";

  const pwStrength = useMemo(
    () => scorePassword(formik.values.password),
    [formik.values.password]
  );

  const passwordsMatch =
    formik.values.password &&
    formik.values.confirmPassword &&
    !confirmError &&
    formik.values.password === formik.values.confirmPassword;

  return (
    <section className="page form-page glass " aria-labelledby="register-title">
      <header className="mb-3" style={{ textAlign: "center" }}>
        <h1 id="register-title">Create Account</h1>
        <p className="muted" style={{ margin: 0 }}>
          Join Photon Studio — it takes a minute.
        </p>
      </header>

      {/* registration form */}
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className="form card-like"
        aria-describedby={formik.status ? "form-status" : undefined}
      >
        {/* First Name */}
        <div className="form-row">
          <label htmlFor="firstName" className="label">First Name</label>
          <input
            id="firstName"
            name="firstName"
            className={`input ${formik.touched.firstName && formik.errors.firstName ? "input--error" : ""}`}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Max 15 characters"
            autoComplete="given-name"
            aria-invalid={!!(formik.touched.firstName && formik.errors.firstName)}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="error-text">{formik.errors.firstName}</div>
          )}
        </div>

        {/* Surname */}
        <div className="form-row">
          <label htmlFor="surname" className="label">Surname</label>
          <input
            id="surname"
            name="surname"
            className={`input ${formik.touched.surname && formik.errors.surname ? "input--error" : ""}`}
            value={formik.values.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Max 20 characters"
            autoComplete="family-name"
            aria-invalid={!!(formik.touched.surname && formik.errors.surname)}
          />
          {formik.touched.surname && formik.errors.surname && (
            <div className="error-text">{formik.errors.surname}</div>
          )}
        </div>

        {/* Email */}
        <div className="form-row">
          <label htmlFor="email" className="label">Email</label>
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
          {emailError && <div id="email-error" className="error-text">{emailError}</div>}
        </div>

        {/* Password */}
        <div className="form-row">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <label htmlFor="password" className="label" style={{ margin: 0 }}>Password</label>
            <button
              type="button"
              className="btn btn--ghost btn--small"
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
            placeholder="Strong password"
            autoComplete="new-password"
            aria-invalid={!!pwError}
            aria-describedby={pwError ? "password-error pw-meter" : "pw-meter"}
            required
          />
          {pwError && <div id="password-error" className="error-text">{pwError}</div>}

          {/* strength meter */}
          <div id="pw-meter" className="muted" style={{ marginTop: 8 }}>
            <div
              aria-hidden
              style={{
                height: 6,
                borderRadius: 6,
                background: "rgba(255,255,255,0.12)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${pwStrength.percent}%`,
                  height: "100%",
                  background: pwStrength.color,
                  transition: "width .2s ease",
                }}
              />
            </div>
            {pwStrength.label && (
              <div style={{ marginTop: 6, fontSize: ".9rem" }}>
                Strength: {pwStrength.label}
              </div>
            )}
            <div className="muted small" style={{ marginTop: 6 }}>
              Must be 8+ chars and include upper &amp; lower case, a number, and a special character.
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="form-row">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <label htmlFor="confirmPassword" className="label" style={{ margin: 0 }}>
              Confirm Password
            </label>
            <button
              type="button"
              className="btn btn--ghost btn--small"
              onClick={() => setShowConfirm((s) => !s)}
              aria-pressed={showConfirm}
              style={{ padding: "0.35rem 0.6rem" }}
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            className={`input ${confirmError ? "input--error" : ""}`}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Re-type your password"
            autoComplete="new-password"
            aria-invalid={!!confirmError}
            aria-describedby={confirmError ? "confirm-error" : undefined}
            required
          />
          {confirmError && <div id="confirm-error" className="error-text">{confirmError}</div>}
          {!confirmError && passwordsMatch && (
            <div className="muted" style={{ marginTop: 6, color: "#22c55e" }}>
              ✓ Passwords match
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn--primary"
          disabled={formik.isSubmitting}
          aria-busy={formik.isSubmitting}
          style={{ width: "100%", marginTop: 12 }}
        >
          {formik.isSubmitting ? "Creating…" : "Register"}
        </button>

        {/* Any general error message */}
        {formik.status && (
          <div id="form-status" className="error-text" style={{ marginTop: 10 }} role="alert" aria-live="polite">
            {formik.status}
          </div>
        )}

        {/* Sign-in hint */}
        <p className="muted" style={{ textAlign: "center", marginTop: 12 }}>
          Already have an account?{" "}
          <a href="/login" style={{ textDecoration: "none", color: "var(--accent)" }}>
            Log in
          </a>
        </p>
      </form>
    </section>
  );
}
