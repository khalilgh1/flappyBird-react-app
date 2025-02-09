import React from 'react';
import { Settings, Volume2, Palette, TrendingUp, Trophy, Sparkles } from 'lucide-react';
import './FeatureCards.scss';
const FeatureCards = () => {
  const features = [
    {
      title: "Scalable Difficulty",
      description: "Challenge yourself with progressively harder levels. Perfect for both beginners and experts!",
      icon: <TrendingUp className="w-8 h-8" style={{ color: '#EAB308' }} />
    },
    {
      title: "Skin Customization",
      description: "Personalize your bird, pipe and background with a variety of unique skins and colors",
      icon: <Palette className="w-8 h-8" style={{ color: '#A855F7' }} />
    },
    {
      title: "Sound Controls",
      description: "Adjust game audio to create your perfect gaming atmosphere.",
      icon: <Volume2 className="w-8 h-8" style={{ color: '#3B82F6' }} />
    },
    {
      title: "Achievement System",
      description: "Try to beat your best record as you master the game and set new high scores.",
      icon: <Trophy className="w-8 h-8" style={{ color: '#22C55E' }} />
    },
    {
      title: "Smooth Experience",
      description: "Enjoy navigating the app with a clean, intuitive interface and responsive controls.",
      icon: <Sparkles className="w-8 h-8" style={{ color: '#EC4899' }} />
    },
    {
      title: "Game Settings",
      description: "Customize controls, display options, and gameplay preferences to suit your style.",
      icon: <Settings className="w-8 h-8" style={{ color: '#F97316' }} />
    }
  ];

  return (
    <div className="card w-full px-4 py-8">
      <div className="text-center mb-8" data-aos="fade-up">
        <h2 className="title text-5xl font-bold mb-2">Game Features</h2>
        <p className="subtitle text-gray-600">Discover what makes our Flappy Bird special</p>
      </div>
      
      <div className="feature-grid grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-transparent rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-black-500 hover:border-blue-500"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="flex items-center gap-4 mb-4">
              {feature.icon}
              <h3 className="feature-title text-xl font-semibold">{feature.title}</h3>
            </div>
            <p className="feature-description text-gray-600 text-base">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .grid {
          display: grid;
          gap: 1.5rem;
        }
        
        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default FeatureCards;