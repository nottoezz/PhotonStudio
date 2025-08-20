export default function About() {
  return (
    <main className="about glass">
      {/* HERO */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-inner glass">
            <span className="eyebrow">ABOUT</span>
            <h1 className="hero-title">
              Simple things, <span className="grad">done thoughtfully.</span>
            </h1>
            <p className="hero-sub">
              We design minimal, durable essentials that feel great to use and
              last longer than trends.
            </p>

            <div className="hero-cta">
              <a href="/products" className="btn btn--primary">
                Shop products
              </a>
              <a href="/contact" className="btn btn--ghost">
                Contact us
              </a>
            </div>

            <ul className="kpis" aria-label="Key product stats">
              <li>
                <strong>10k+</strong>
                <span>Orders shipped</span>
              </li>
              <li>
                <strong>4.9★</strong>
                <span>Average rating</span>
              </li>
              <li>
                <strong>48h</strong>
                <span>Avg. delivery</span>
              </li>
              <li>
                <strong>Neutral</strong>
                <span>Carbon offset</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="section about-story">
        <div className="container">
          <div className="story-grid">
            <figure className="story-media">
              <img
                src="https://images.unsplash.com/photo-1735529576077-d3792e43bab8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fHRlY2glMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Store Interior"
                loading="lazy"
              />
            </figure>

            <article className="story-card glass">
              <h2 className="section-title">
                A small studio, With big ideas
              </h2>
              <p className="prose">
                We started with a simple idea: fewer, better things. That means
                sweat-the-details design, responsible materials, and pricing
                that respects you.
              </p>
              <p className="prose">
                Our products are built for everyday use—no flashy gimmicks, no
                excess. Just good tools. Just good products. Just good people.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section about-values">
        <div className="container">
          <h2 className="section-title">What we care about</h2>
          <div className="values-grid">
            <article className="feature-card">
              <div className="feature-icon" aria-hidden>
                🧩
              </div>
              <h3>Purposeful design</h3>
              <p className="prose">
                Everything has a job—if it doesn’t help, it’s not there.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon" aria-hidden>
                🌱
              </div>
              <h3>Better materials</h3>
              <p className="prose">
                Durable, repairable, and responsibly sourced where possible.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon" aria-hidden>
                🔒
              </div>
              <h3>No dark patterns</h3>
              <p className="prose">
                Clear pricing, clear returns, no pressure tactics.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon" aria-hidden>
                🤝
              </div>
              <h3>Customer-first</h3>
              <p className="prose">
                We’d rather lose a sale than your trust. Simple as that.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section about-timeline">
        <div className="container">
          <div className="glass">
            <h2 className="section-title">Milestones</h2>
            <ol className="tl" aria-label="Company timeline">
              <li className="tl-item">
                <time className="tl-date">2022</time>
                <div className="tl-card glass">
                  <h3>First drop sells out</h3>
                  <p className="prose">
                    Launched our starter set—kept it small, learned fast.
                  </p>
                </div>
              </li>
              <li className="tl-item">
                <time className="tl-date">2023</time>
                <div className="tl-card glass">
                  <h3>Repair program</h3>
                  <p className="prose">
                    We’d rather fix than replace. Good for you, better for the
                    planet.
                  </p>
                </div>
              </li>
              <li className="tl-item">
                <time className="tl-date">2024</time>
                <div className="tl-card glass">
                  <h3>Carbon neutral shipping</h3>
                  <p className="prose">
                    Offsetting logistics while improving packaging efficiency.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section about-cta">
        <div className="container">
          <div className="cta-banner glass">
            <div>
              <h2 className="cta-title">Ready when you are.</h2>
              <p className="prose">
                Browse our essentials—delivered fast, built to last.
              </p>
            </div>
            <a href="/products" className="btn btn--primary">
              Shop the collection
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
