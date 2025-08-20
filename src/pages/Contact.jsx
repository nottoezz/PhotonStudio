import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "General",
    order: "",
    message: "",
    company: "", // honeypot
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Please add a short message";
    if (form.company) e.company = "Spam detected"; // honeypot
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    try {
      setStatus({ state: "submitting", msg: "" });
      // Hook up your real endpoint here
      await new Promise((r) => setTimeout(r, 600));
      setStatus({
        state: "success",
        msg: "Thanks! We’ve received your message and will reply within 1 business day.",
      });
      setForm({
        name: "",
        email: "",
        topic: "General",
        order: "",
        message: "",
        company: "",
      });
      setErrors({});
    } catch {
      setStatus({
        state: "error",
        msg: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <main className="contact glass">
      {/* HERO */}
      <section className="py-5 py-md-6">
        <div className="container">
          <div className="glass rounded-4 p-4 p-md-5 shadow-sm">
            <span className="eyebrow d-block text-uppercase fw-semibold mb-2">
              Contact
            </span>
            <h1 className="hero-title display-5 fw-bold mb-2">
              We’re here to <span className="grad">help.</span>
            </h1>
            <p className="hero-sub lead text-secondary mb-3">
              Questions about products, orders, or repairs? Reach out—real
              humans, quick replies.
            </p>

            {/* The only link on the page as requested */}
            <div className="mb-4">
              <Link to="/" className="btn btn-outline-primary btn-sm">
                ← Back home
              </Link>
            </div>

            <ul className="list-unstyled d-flex flex-wrap gap-4 kpis mb-0">
              <li className="d-flex flex-column">
                <strong className="fs-4">&lt;2h</strong>
                <span className="text-secondary">Avg. first reply</span>
              </li>
              <li className="d-flex flex-column">
                <strong className="fs-4">7d</strong>
                <span className="text-secondary">Support weekly</span>
              </li>
              <li className="d-flex flex-column">
                <strong className="fs-4">4.9★</strong>
                <span className="text-secondary">Care satisfaction</span>
              </li>
              <li className="d-flex flex-column">
                <strong className="fs-4">Human</strong>
                <span className="text-secondary">No bots, ever</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* QUICK CONTACT OPTIONS */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title h3 fw-bold mb-4">Talk to us</h2>

          {/* Always 2 columns */}
          <div className="row row-cols-1 g-3 g-md-4">
            <div className="col d-flex">
              <article className="feature-card glass rounded-4 p-3 p-md-4 h-100 w-100 shadow-sm">
                <div
                  className="feature-icon rounded-3 d-inline-flex align-items-center justify-content-center mb-2 bg-body-tertiary"
                  aria-hidden
                  style={{ width: 44, height: 44, fontSize: 22 }}
                >
                  ✉️
                </div>
                <h3 className="h5 mb-2">Email</h3>
                <p className="mb-0 text-secondary">support@example.com</p>
              </article>
            </div>

            <div className="col d-flex">
              <article className="feature-card glass rounded-4 p-3 p-md-4 h-100 w-100 shadow-sm">
                <div
                  className="feature-icon rounded-3 d-inline-flex align-items-center justify-content-center mb-2 bg-body-tertiary"
                  aria-hidden
                  style={{ width: 44, height: 44, fontSize: 22 }}
                >
                  💬
                </div>
                <h3 className="h5 mb-2">Chat</h3>
                <p className="mb-0 text-secondary">
                  Weekdays 09:00–17:00 (look for the chat bubble).
                </p>
              </article>
            </div>

            <div className="col d-flex">
              <article className="feature-card glass rounded-4 p-3 p-md-4 h-100 w-100 shadow-sm">
                <div
                  className="feature-icon rounded-3 d-inline-flex align-items-center justify-content-center mb-2 bg-body-tertiary"
                  aria-hidden
                  style={{ width: 44, height: 44, fontSize: 22 }}
                >
                  📞
                </div>
                <h3 className="h5 mb-2">Phone</h3>
                <p className="mb-0 text-secondary">
                  +27 (0)10 123 4567 — Mon–Fri, 09:00–17:00
                </p>
              </article>
            </div>

            <div className="col d-flex">
              <article className="feature-card glass rounded-4 p-3 p-md-4 h-100 w-100 shadow-sm">
                <div
                  className="feature-icon rounded-3 d-inline-flex align-items-center justify-content-center mb-2 bg-body-tertiary"
                  aria-hidden
                  style={{ width: 44, height: 44, fontSize: 22 }}
                >
                  🧾
                </div>
                <h3 className="h5 mb-2">Orders & returns</h3>
                <p className="mb-0 text-secondary">
                  Include your order number for faster help.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* FORM + DETAILS */}
      <section className="w-auto py-5">
        <div className="container">
          <div className="row row-cols-1 g-3 g-md-4">
            {/* FORM */}
            <div className="col-12 col-lg-7">
              <article className="glass rounded-4 p-4 p-md-5 shadow-sm h-100">
                <h2 className="h3 fw-bold mb-4">Send a message</h2>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot */}
                  <div
                    style={{ position: "absolute", left: "-10000px" }}
                    aria-hidden="true"
                  >
                    <label>
                      Company
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.company}
                        onChange={(e) =>
                          setForm({ ...form, company: e.target.value })
                        }
                      />
                    </label>
                  </div>

                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="topic" className="form-label">
                        Topic
                      </label>
                      <select
                        id="topic"
                        name="topic"
                        className="form-select"
                        value={form.topic}
                        onChange={(e) =>
                          setForm({ ...form, topic: e.target.value })
                        }
                      >
                        <option>General</option>
                        <option>Order help</option>
                        <option>Returns &amp; exchanges</option>
                        <option>Repairs</option>
                        <option>Wholesale</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="order" className="form-label">
                        Order # (optional)
                      </label>
                      <input
                        id="order"
                        name="order"
                        type="text"
                        className="form-control"
                        placeholder="e.g. #12345"
                        value={form.order}
                        onChange={(e) =>
                          setForm({ ...form, order: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        className={`form-control ${
                          errors.message ? "is-invalid" : ""
                        }`}
                        placeholder="How can we help?"
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        required
                      />
                      {errors.message && (
                        <div className="invalid-feedback">{errors.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary px-4"
                      disabled={status.state === "submitting"}
                    >
                      {status.state === "submitting"
                        ? "Sending…"
                        : "Send message"}
                    </button>
                    <div
                      className={`small ${
                        status.state === "success"
                          ? "text-success"
                          : status.state === "error"
                          ? "text-danger"
                          : "text-muted"
                      }`}
                      role="status"
                      aria-live="polite"
                    >
                      {status.msg}
                    </div>
                  </div>
                </form>
              </article>
            </div>

            {/* DETAILS */}
            <div className="col-12 col-lg-11">
              <aside className="h-100">
                <div className="glass rounded-4 p-4 p-md-5 shadow-sm h-100">
                  <h3 className="h5 fw-semibold mb-3">
                    Studio &amp; returns address
                  </h3>
                  <address
                    className="mb-3 text-secondary"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    123 Makers Lane
                    {"\n"}Cape Town, 8001
                    {"\n"}South Africa
                  </address>
                  <div className="mb-3 text-secondary">
                    <div>
                      <span className="fw-semibold">Hours:</span> Mon–Fri,
                      09:00–17:00 SAST
                    </div>
                    <div>
                      <span className="fw-semibold">Email:</span>{" "}
                      support@example.com
                    </div>
                    <div>
                      <span className="fw-semibold">Phone:</span> +27 (0)10 123
                      4567
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
