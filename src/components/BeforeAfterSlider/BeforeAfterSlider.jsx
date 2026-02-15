// src/components/BeforeAfterSlider/BeforeAfterSlider.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Maximize2 } from 'lucide-react';
import styles from './BeforeAfterSlider.module.css';

const BeforeAfterSlider = ({ beforeImage, afterImage, onZoom, isModal = false }) => {
  const { t } = useTranslation();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);
  
  // Рефы для отслеживания перемещения
  const startPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const handleMove = (event) => {
    if (!isResizing && event.type !== 'touchmove') return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = event.type === 'touchmove' ? event.touches[0].pageX : event.pageX;
    const y = event.type === 'touchmove' ? event.touches[0].pageY : event.pageY;

    // Проверяем, было ли значительное смещение (более 5 пикселей)
    if (
      Math.abs(x - startPos.current.x) > 5 || 
      Math.abs(y - startPos.current.y) > 5
    ) {
      hasMoved.current = true;
    }

    const relativeX = x - containerRect.left;
    const position = Math.max(0, Math.min((relativeX / containerRect.width) * 100, 100));
    
    setSliderPosition(position);
  };

  const handleMouseDown = (e) => {
    // Сохраняем начальную позицию
    const x = e.pageX || (e.touches && e.touches[0].pageX);
    const y = e.pageY || (e.touches && e.touches[0].pageY);
    startPos.current = { x, y };
    hasMoved.current = false;
    
    setIsResizing(true);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Обработчик клика на контейнер
  const handleContainerClick = (e) => {
    // Если слайдер двигали — отменяем всплытие клика к родителю (ProjectCard)
    if (hasMoved.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`${styles.container} ${isModal ? styles.modalContainer : styles.gridContainer}`} 
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onClickCapture={handleContainerClick}
    >
      <div className={styles.imageWrapper}>
        <img 
          src={afterImage} 
          alt="After" 
          className={isModal ? styles.imageModal : styles.imageGrid} 
        />
      </div>
      
      <div 
        className={styles.beforeOverlay} 
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className={isModal ? styles.imageModal : styles.imageGrid} 
        />
      </div>

      <div className={styles.labelsContainer}>
        <span className={`${styles.label} ${styles.labelBefore}`}>
          {t('slider.before')}
        </span>
        <span className={`${styles.label} ${styles.labelAfter}`}>
          {t('slider.after')}
        </span>
      </div>

      {!isModal && onZoom && (
        <button 
          className={styles.zoomBtn} 
          onClick={(e) => {
            e.stopPropagation();
            onZoom();
          }}
          type="button"
        >
          <Maximize2 size={20} />
        </button>
      )}

      <div className={styles.handle} style={{ left: `${sliderPosition}%` }}>
        <div className={styles.handleLine} />
        <div className={styles.handleCircle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;