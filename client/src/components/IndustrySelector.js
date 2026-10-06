import React from 'react';
import '../styles/components/IndustrySelector.css';

const INDUSTRIES = [
  'Software Engineering',
  'Data Science',
  'Product Management',
  'Design',
  'Marketing',
  'Sales',
  'Finance',
  'Operations',
  'HR',
  'Legal',
  'DevOps',
  'Cloud Architecture',
  'Mobile Development',
  'Machine Learning',
  'Cybersecurity',
];

const IndustrySelector = ({ selected = [], onChange, maxSelections = null }) => {
  const toggleIndustry = (industry) => {
    if (selected.includes(industry)) {
      onChange(selected.filter((i) => i !== industry));
    } else if (!maxSelections || selected.length < maxSelections) {
      onChange([...selected, industry]);
    }
  };

  return (
    <div className="industry-selector">
      <div className="industries-grid">
        {INDUSTRIES.map((industry) => (
          <button
            key={industry}
            className={`industry-pill ${
              selected.includes(industry) ? 'selected' : ''
            }`}
            onClick={() => toggleIndustry(industry)}
            type="button"
          >
            {industry}
          </button>
        ))}
      </div>
      {maxSelections && (
        <p className="industry-count">
          {selected.length}/{maxSelections} selected
        </p>
      )}
    </div>
  );
};

export default IndustrySelector;

