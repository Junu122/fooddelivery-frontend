
import React from 'react';
import './About.css';
import {Clock,MapPin,Phone} from 'lucide-react'
const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About <span className="tomato-text">Tomato</span></h1>
        <div className="tomato-divider"></div>
      </div>
      
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2024, Tomato began with a simple mission: to deliver the freshest, most
          delicious meals right to your doorstep. What started as a small family kitchen has 
          grown into one of the most beloved dining experiences in the area, now available 
          through our convenient delivery service.
        </p>
      </section>
      
      <section className="about-section">
        <h2>Our Philosophy</h2>
        <p>
          At Tomato, we believe that great food starts with great ingredients. We source all our 
          produce locally whenever possible, working directly with farmers to ensure the highest quality.
          Every dish is prepared fresh when you order, never frozen or pre-made. That's the Tomato difference.
        </p>
      </section>
      
      <div className="info-cards">
        <div className="info-card">
          <div className="icon-container">
          <Clock />
          </div>
          <h3>Hours</h3>
          <p>Monday - Friday: 11am - 10pm</p>
          <p>Saturday - Sunday: 10am - 11pm</p>
        </div>
        
        <div className="info-card">
          <div className="icon-container">
          <MapPin />
          </div>
          <h3>Location</h3>
          <p>2nd floor ,ionex tower,b block</p>
          <p>maliada IN 100100</p>
        </div>
        
        <div className="info-card">
          <div className="icon-container">
          <Phone />
          </div>
          <h3>Contact</h3>
          <p>Phone: (555) 123-4567</p>
          <p>Email: enquiry@tomatodelivery.com</p>
        </div>
      </div>
      
      <section className="about-section">
        <h2>Our Team</h2>
        <p>
          Led by Chef junaid shaikh our culinary team brings decades of experience from top
          restaurants around the world. Every member of our staff—from our chefs to our delivery
          drivers—is committed to making your Tomato experience exceptional.
        </p>
      </section>
      
      <section className="about-section delivery-info">
        <h2>Delivery Information</h2>
        <p>
          We deliver within a 5-mile radius of our location. Delivery is free on orders above 2000,
          and we guarantee delivery within 45 minutes or your next delivery is free!
        </p>
      </section>
    </div>
  );
};

export default About;