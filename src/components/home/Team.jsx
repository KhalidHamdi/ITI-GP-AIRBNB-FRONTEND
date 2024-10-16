import React from 'react';
import './Team.css'; 

const Team = () => {
  const teamMembers = [
    {
      name: 'Khaled Hamdy',
      linkedin: 'https://www.linkedin.com/in/khalidhamdii/',
      image: 'https://i.imgur.com/q0NbswO.jpeg',
    },
    {
      name: 'Basmala Salem',
      linkedin: 'https://www.linkedin.com/in/basmala-salem/',
      image: 'https://i.imgur.com/uvsNjeo.jpeg',
    },
    {
      name: 'David Emad',
      linkedin: 'https://www.linkedin.com/in/davidemad10/',
      image: 'https://i.imgur.com/6OkQLjo.jpeg',
    },
    {
        name: 'Ibrahim Saber',
        linkedin: 'https://www.linkedin.com/in/ibrahim1saber/',
        image: 'https://i.imgur.com/Di8K2nB.jpeg', 
      },
    {
      name: 'Michael Emad',
      linkedin: 'https://www.linkedin.com/in/michael-emad-7a9a25277/',
      image: 'https://i.imgur.com/A4Ncz5Z.jpeg',
    },
  ];

  return (
    <div className="team-container">
      <h2 className="team-title">Meet Our Team</h2>
      <div className="team-member-list">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member-card">
            <img src={member.image} alt={`${member.name}`} className="member-image" />
            <h4 className="member-name">{member.name}</h4>
            <a 
              href={member.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="linkedin-button"
            >
              LinkedIn
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
