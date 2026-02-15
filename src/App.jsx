// src/App.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './components/ProjectCard/ProjectCard';
import Modal from './components/Modal/Modal';
import BeforeAfterSlider from './components/BeforeAfterSlider/BeforeAfterSlider';
import styles from './App.module.css';

const USER_NAME = "AI VISUAL ARTIST"; 

import personBase from './assets/portfolio/Человек.png';
import personAtmosphere from './assets/portfolio/Атмосферные эффекты.png';
import personBusiness from './assets/portfolio/Бизнес-портрет.png';
import personMaterial from './assets/portfolio/Замена материала и цвета.png';
import personLight from './assets/portfolio/Изолированная работа со светом.png';
import personStyleRef from './assets/portfolio/Стиль по референсу.png';
import personStyleResult from './assets/portfolio/Смена стиля.png';
import personAccsRef from './assets/portfolio/Точечное добавление аксессуаров по референсу.png';
import personAccsResult from './assets/portfolio/Точечное добавление аксессуаров.png';

import roomBase1 from './assets/portfolio/Комната.png';
import roomBase2 from './assets/portfolio/Комната2.png';
import roomFinish from './assets/portfolio/Замена отделки.png';
import roomFurnishing from './assets/portfolio/Меблировка.png';
import roomView from './assets/portfolio/Замена вида из окна.png';
import roomTime from './assets/portfolio/Смена времени суток.png';
import roomStyle from './assets/portfolio/Смена стиля2.png';

import shoeBase from './assets/portfolio/Кросовок.png';
import shoeSplash from './assets/portfolio/Всплеск и рябь.png';
import shoeSuede from './assets/portfolio/Грубая замша.png';
import shoeIce from './assets/portfolio/Ледяной плен.png';
import shoeLevitation1 from './assets/portfolio/Рекламный «Левитирующий» постер.png';
import shoeLevitation2 from './assets/portfolio/Рекламный «Левитирующий» постер 2.png';
import shoeRecolor from './assets/portfolio/Сложная перекраска.png';
import shoeLight from './assets/portfolio/Смена освещения.png';
import shoePlastic from './assets/portfolio/Футуристичный полупрозрачный пластик.png';
import shoeMacro from './assets/portfolio/Макро-детализация.png';
import modelLogo from './assets/portfolio/Наложение логотипа.png';
import modelBase from './assets/portfolio/Модель.png';

import girlBase from './assets/portfolio/Девушка.png';
import girlNight from './assets/portfolio/Ночной мегаполис.png';
import girlTravel from './assets/portfolio/Путешествие.png';
import girlStyle from './assets/portfolio/Стильная.png';
import trashBase from './assets/portfolio/Девушка и мусор.png';
import trashClear from './assets/portfolio/Очистка.png';
import selfieBase from './assets/portfolio/Селфи для стилизации.png';
import selfieStyle from './assets/portfolio/Любой стиль.png';
import bizBase from './assets/portfolio/Бизнес-апгрейд.png';
import bizUpgrade from './assets/portfolio/Бизнес.png';

const projects = [
  { id: 1, category: 'brands', before: personBase, after: personAtmosphere, tags: ['atmospheric', 'lighting'] },
  { id: 2, category: 'brands', before: personBase, after: personBusiness, tags: ['business', 'lighting'] },
  { id: 3, category: 'brands', before: personBase, after: personMaterial, tags: ['material_color'] },
  { id: 4, category: 'brands', before: personBase, after: personLight, tags: ['light_isolated'] },
  { id: 5, category: 'brands', before: personStyleRef, after: personStyleResult, tags: ['style_ref', 'style_transfer'] },
  { id: 6, category: 'brands', before: personAccsRef, after: personAccsResult, tags: ['accessories_ref', 'accessories'] },
  { id: 7, category: 'realestate', before: roomBase1, after: roomFinish, tags: ['interior_finish'] },
  { id: 8, category: 'realestate', before: roomBase1, after: roomFurnishing, tags: ['furnishing'] },
  { id: 9, category: 'realestate', before: roomBase2, after: roomView, tags: ['view_change'] },
  { id: 10, category: 'realestate', before: roomBase2, after: roomTime, tags: ['time_day', 'lighting'] },
  { id: 11, category: 'realestate', before: roomBase2, after: roomStyle, tags: ['style_transfer'] },
  { id: 12, category: 'ecommerce', before: shoeBase, after: shoeSplash, tags: ['splash', 'effects'] },
  { id: 13, category: 'ecommerce', before: shoeBase, after: shoeSuede, tags: ['suede', 'material_color'] },
  { id: 14, category: 'ecommerce', before: shoeBase, after: shoeIce, tags: ['ice', 'effects'] },
  { id: 15, category: 'ecommerce', before: shoeBase, after: shoeLevitation1, tags: ['levitation'] },
  { id: 16, category: 'ecommerce', before: shoeBase, after: shoeLevitation2, tags: ['levitation', 'lighting'] },
  { id: 17, category: 'ecommerce', before: shoeBase, after: shoeRecolor, tags: ['recolor'] },
  { id: 18, category: 'ecommerce', before: shoeBase, after: shoeLight, tags: ['lighting'] },
  { id: 19, category: 'ecommerce', before: shoeBase, after: shoePlastic, tags: ['plastic', 'material_color'] },
  { 
    id: 20, 
    category: 'ecommerce', 
    before: shoeBase, 
    after: shoeMacro, 
    tags: ['macro', 'lighting'] 
  },
  { 
  id: 21, 
  category: 'brands', 
  before: modelBase, 
  after: modelLogo, 
  tags: ['logo_overlay'] 
},
{ id: 22, category: 'personal', before: girlBase, after: girlNight, tags: ['view_change', 'lighting'] },
{ id: 23, category: 'personal', before: girlBase, after: girlTravel, tags: ['travel', 'view_change'] },
{ id: 24, category: 'personal', before: girlBase, after: girlStyle, tags: ['style_transfer'] },
{ id: 25, category: 'personal', before: trashBase, after: trashClear, tags: ['cleanup'] },
{ id: 26, category: 'personal', before: selfieBase, after: selfieStyle, tags: ['any_style', 'style_transfer'] },
{ id: 27, category: 'personal', before: bizBase, after: bizUpgrade, tags: ['business', 'lighting'] },
];

const CONTACTS = {
  avito: "https://www.avito.ru/moskva/predlozheniya_uslug/professionalnaya_obrabotka_foto_neyrosetyu_7939830573",
  telegram: "https://t.me/M1LLiGaT"
};

const CATEGORIES = ['ecommerce', 'brands', 'realestate', 'personal'];

function App() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  const renderProjectGrid = (categoryKey) => {
    const filteredList = projects.filter(p => p.category === categoryKey);
    if (filteredList.length === 0) return null;

    return (
      <div key={categoryKey} className={styles.categorySection}>
        <motion.h2 
          className={styles.categoryTitle}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {t(`categories.${categoryKey}`)}
        </motion.h2>
        <div className={styles.grid}>
          {filteredList.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onZoom={() => setSelectedProject(project)} 
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>{USER_NAME}</div>
        <nav className={styles.nav}>
          <button onClick={toggleLanguage} className={styles.langBtn}>
            {i18n.language.toUpperCase()}
          </button>
          <a href="#works">{t('nav.works')}</a>
          <a href="#services">{t('nav.services')}</a>
          <a href={CONTACTS.telegram} target="_blank" rel="noreferrer" className={styles.contactBtn}>
            {t('nav.contact')}
          </a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div 
            className={styles.heroActions}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a href={CONTACTS.telegram} target="_blank" rel="noreferrer" className={styles.cta}>
              {t('hero.cta_tg')}
            </a>
            <a href={CONTACTS.avito} target="_blank" rel="noreferrer" className={styles.secondaryCta}>
              {t('hero.cta_avito')}
            </a>
          </motion.div>
        </section>

        <section id="works" className={styles.works}>
          <div className={styles.filterBar}>
            <button 
              className={`${styles.filterBtn} ${filter === 'all' ? styles.activeFilter : ''}`}
              onClick={() => setFilter('all')}
            >
              {t('categories.all')}
            </button>
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                className={`${styles.filterBtn} ${filter === cat ? styles.activeFilter : ''}`}
                onClick={() => setFilter(cat)}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
          </div>

          <div className={styles.portfolioContent}>
            {filter === 'all' 
              ? CATEGORIES.map(category => renderProjectGrid(category))
              : renderProjectGrid(filter)
            }
          </div>

          <motion.div 
            className={styles.unlimitedNote}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.noteContent}>
              <h3>{t('portfolio.unlimited_title')}</h3>
              <p>{t('portfolio.unlimited_text')}</p>
            </div>
          </motion.div>
        </section>

        <section id="services" className={styles.about}>
          <motion.div 
            className={styles.aboutContent}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionTitle}>{t('about.title')}</h2>
            <p className={styles.sectionDesc}>{t('about.description')}</p>
            
            <div className={styles.servicesGrid}>
              <div className={styles.serviceItem}>
                <h3>{t('about.brands_title')}</h3>
                <p>{t('about.brands_text')}</p>
              </div>
              <div className={styles.serviceItem}>
                <h3>{t('about.ecom_title')}</h3>
                <p>{t('about.ecom_text')}</p>
              </div>
              <div className={styles.serviceItem}>
                <h3>{t('about.estate_title')}</h3>
                <p>{t('about.estate_text')}</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className={styles.finalCta}>
          <motion.div 
            className={styles.ctaBox}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>{t('contact.title')}</h2>
            <p>{t('contact.subtitle')}</p>
            <div className={styles.ctaButtons}>
              <a href={CONTACTS.telegram} className={styles.cta}>{t('contact.tg')}</a>
              <a href={CONTACTS.avito} target="_blank" rel="noreferrer" className={styles.secondaryCta}>{t('contact.avito')}</a>
            </div>
          </motion.div>
        </section>
      </main>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <BeforeAfterSlider 
            beforeImage={selectedProject.before} 
            afterImage={selectedProject.after} 
            isModal={true}
          />
        )}
      </Modal>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} {USER_NAME}. AI Generative Production.</p>
      </footer>
    </div>
  );
}

export default App;