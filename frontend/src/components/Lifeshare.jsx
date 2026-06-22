import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ✅ IMAGES */
import img1 from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #E8302A;
    --red-light: #ff4f49;
    --text: #1a1a2e;
    --white: #ffffff;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--white);
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 64px;
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 100;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    font-size: 1.2rem;
  }

  .heart-icon {
    color: var(--red);
    font-size: 1.4rem;
  }

  .nav-links {
    display: flex;
    gap: 30px;
    align-items: center;
  }

  .nav-links span {
    cursor: pointer;
  }

  .nav-links span:hover {
    color: var(--red);
  }

  .btn-register {
    background: var(--red);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
  }

  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 80px 64px;
    gap: 40px;
    align-items: center;
  }

  .hero h1 {
    font-size: 2.8rem;
    margin-bottom: 20px;
  }

  .hero p {
    margin-bottom: 20px;
    color: #555;
  }

  .hero img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 12px;
  }

  .btn-primary {
    background: var(--red);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    margin-right: 10px;
    cursor: pointer;
  }

  .btn-secondary {
    border: 1px solid #ccc;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    background: transparent;
  }

  .cta-band {
    background: var(--red);
    padding: 50px 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cta-band h2 {
    color: white;
  }

  .btn-white {
    background: white;
    color: var(--red);
    padding: 12px 28px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
  }

  .stats {
    background: #f7f2f2;
    display: flex;
    justify-content: space-around;
    padding: 50px 20px;
    text-align: center;
  }

  .stats h2 {
    color: var(--red);
    font-size: 2rem;
  }

  .stats p {
    color: #555;
    margin-top: 5px;
  }

  .why {
    padding: 80px 64px;
    text-align: center;
  }

  .why h2 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .why p {
    color: #666;
    margin-bottom: 50px;
  }

  .why-cards {
    display: flex;
    justify-content: space-between;
    gap: 30px;
  }

  .why-card {
    flex: 1;
    padding: 20px;
  }

  .icon-circle {
    width: 60px;
    height: 60px;
    background: #fdeaea;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
    font-size: 24px;
    color: var(--red);
  }

  .how {
    background: #f7f2f2;
    padding: 80px 64px;
    text-align: center;
  }

  .how p {
    color: #666;
    margin-bottom: 50px;
  }

  .steps {
    display: flex;
    gap: 30px;
  }

  .step-card {
    background: #fff;
    padding: 25px;
    border-radius: 12px;
    flex: 1;
    text-align: left;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .step-number {
    width: 35px;
    height: 35px;
    background: var(--red);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  }

  .impact {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    padding: 80px 64px;
    align-items: center;
  }

  .impact img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 12px;
  }

  .impact p {
    color: #666;
    margin-bottom: 20px;
  }

  .impact-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .impact-item {
    display: flex;
    gap: 15px;
  }

  .impact-icon {
    width: 35px;
    height: 35px;
    background: #fdeaea;
    color: var(--red);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ✅ FOOTER */
  .footer {
    background: #0c1b2a;
    color: #ddd;
    padding: 60px 64px;
  }

  .footer-grid {
    display: flex;
    justify-content: space-between;
    gap: 40px;
  }

  .footer h3, .footer h4 {
    color: white;
    margin-bottom: 10px;
  }

  .footer p {
    margin-bottom: 8px;
    font-size: 14px;
  }
`;

export default function Lifeshare() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>

      <nav style={scrolled ? { boxShadow: "0 2px 10px rgba(0,0,0,0.1)" } : {}}>
        <div className="nav-logo">
          <span className="heart-icon">♡</span>
          LifeShare
        </div>

        <div className="nav-links">
          <span>About</span>
          <span>How It Works</span>
          <span>Impact</span>
          <span onClick={() => navigate("/login")}>Login</span>
          <button className="btn-register" onClick={() => navigate("/register")}>
            Register Now
          </button>
        </div>
      </nav>

      <section className="hero">
        <div>
          <h1>Give the Gift of Life</h1>
          <p>Join thousands of donors making a difference.</p>
          <button className="btn-primary" onClick={() => navigate("/register")}>
            Register as Donor →
          </button>
          <button className="btn-secondary">Learn More</button>
        </div>

        {/* ✅ TOP IMAGE */}
        <img src={img1} alt="Hero" />
      </section>

      <section className="cta-band">
        <h2>Ready to make a difference?</h2>
        <button className="btn-white" onClick={() => navigate("/register")}>
          Register →
        </button>
      </section>

      <section className="stats">
        <div><h2>100K+</h2><p>Registered Donors</p></div>
        <div><h2>50K+</h2><p>Lives Saved</p></div>
        <div><h2>500+</h2><p>Partner Hospitals</p></div>
      </section>

      <section className="why">
        <h2>Why Organ Donation Matters</h2>
        <p>Every 10 minutes someone joins the waiting list.</p>
        <div className="why-cards">
          <div className="why-card">
            <div className="icon-circle">❤</div>
            <h3>Save Lives</h3>
            <p>Up to 8 lives can be saved.</p>
          </div>
          <div className="why-card">
            <div className="icon-circle">👨‍👩‍👧</div>
            <h3>Help Families</h3>
            <p>Give hope to families.</p>
          </div>
          <div className="why-card">
            <div className="icon-circle">🛡</div>
            <h3>Secure Process</h3>
            <p>Safe and ethical donation process.</p>
          </div>
        </div>
      </section>

      <section className="how">
        <h2>How It Works</h2>
        <p>Simple steps to become a donor</p>
        <div className="steps">
          {[ "Sign Up", "Fill Info", "Verify", "Save Lives" ].map((step, i) => (
            <div key={i} className="step-card">
              <div className="step-number">{i+1}</div>
              <h3>{step}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="impact">
        {/* ✅ BOTTOM IMAGE */}
        <img src={img2} alt="Impact" />

        <div>
          <h2>Your Impact Matters</h2>
          <p>Help save lives and improve quality of life.</p>
          <div className="impact-list">
            <div className="impact-item"><div className="impact-icon">❤</div><p>Heart, Liver, Kidneys</p></div>
            <div className="impact-item"><div className="impact-icon">❤</div><p>Corneas, Skin, Bones</p></div>
            <div className="impact-item"><div className="impact-icon">❤</div><p>24/7 Support</p></div>
          </div>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h3>LifeShare</h3>
            <p>Saving lives through organ donation.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <p>About</p>
            <p>How It Works</p>
            <p>Impact</p>
          </div>

          <div>
            <h4>Contact</h4>
            <p>Email: support@lifeshare.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>

        <p style={{ marginTop: "30px", textAlign: "center", color: "#aaa" }}>
          © 2026 LifeShare. All rights reserved.
        </p>
      </footer>
    </>
  );
}