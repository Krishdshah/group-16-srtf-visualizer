import React from 'react';
import { motion } from 'framer-motion';

// Import the images from the assets folder
import krishImage from '../assets/krish.jpg';
import namanImage from '../assets/naman.jpg';

// Developer data array now uses the imported images
const developers = [
  {
    name: 'Krish D Shah',
    role: 'Lead Developer & Algorithm Specialist',
    imageUrl: krishImage, // Use the imported image variable
    socials: {
      github: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Naman Duhan',
    role: 'UI/UX Designer & Frontend Developer',
    imageUrl: namanImage, // Use the imported image variable
    socials: {
      github: '#',
      linkedin: '#',
    },
  },
];

// Animation variants for Framer Motion
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const DeveloperPage = () => {
  return (
    <div className="developer-page-container">
      <h2 className="developer-page-title">Meet the Developers</h2>
      <div className="developers-grid">
        {developers.map((dev, index) => (
          <motion.div
            key={dev.name}
            className="developer-card"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.05, boxShadow: "0px 20px 30px rgba(0,0,0,0.4)" }}
          >
            <img src={dev.imageUrl} alt={dev.name} className="developer-avatar" />
            <div className="developer-info">
              <h3>{dev.name}</h3>
              <p>{dev.role}</p>
            </div>
            <div className="developer-socials">
              <a href={dev.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={dev.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperPage;