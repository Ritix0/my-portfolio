// src/components/ProjectCard/ProjectCard.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import BeforeAfterSlider from '../BeforeAfterSlider/BeforeAfterSlider';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project, onZoom }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.card} onClick={onZoom}>
      <BeforeAfterSlider 
        beforeImage={project.before} 
        afterImage={project.after} 
        onZoom={onZoom}
      />
      <div className={styles.info}>
        <div className={styles.tags}>
          {project.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {t(`details.${tag}`)}
            </span>
          ))}
        </div>
        <h3 className={styles.category}>{t(`categories.${project.category}`)}</h3>
      </div>
    </div>
  );
};

export default ProjectCard;