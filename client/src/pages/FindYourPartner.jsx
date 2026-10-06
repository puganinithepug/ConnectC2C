import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Shield,
  Phone,
  HandHeart,
  X,
  PlayCircle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import FindYourServiceQuiz from '../components/FindYourServiceQuiz';

/* -------------------- YOUTUBE MODAL -------------------- */
function VideoModal({ videoId, onClose }) {
  if (!videoId) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white rounded-xl shadow-xl w-[90%] max-w-3xl">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full" style={{ paddingBottom: '56.25%', position: 'relative' }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          />
        </div>
      </div>
    </div>
  );
}
/* --------------------------------------------------------- */

export default function FindYourPath() {
  const { language } = useLanguage();
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* -------------------- HEADER -------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary/10 via-background to-primary/20 mb-6 relative"
          >
            <Sparkles className="w-12 h-12 text-primary" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/40"
              animate={{ scale: [1, 1.2, 1.2], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {language === 'fr' ? 'Trouvez Votre Parcours' : 'Find Your Path'}
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Cliquez sur un parcours pour regarder une courte vidéo et découvrir où votre contribution peut avoir le plus d’impact.'
              : 'Click a path to watch a short video and discover where your contribution can make the greatest impact.'}
          </p>
        </motion.div>

        {/* -------------------- PATH BOXES -------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {/* WISDOM */}
          <div
            onClick={() => setActiveVideo('PY6ls0v6hu4')}
            className="group relative cursor-pointer bg-gradient-to-br from-highlight/20 to-highlight/10 border-2 border-highlight/40 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-transform"
          >
            {/* hover play overlay */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
              <div className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-foreground shadow">
                <PlayCircle className="w-4 h-4" />
                <span>{language === 'fr' ? 'Lire la vidéo' : 'Play video'}</span>
              </div>
            </div>

            <div className="inline-flex p-3 rounded-full bg-highlight/30 mb-3">
              <Phone className="w-8 h-8 text-highlight" />
            </div>
            <h3 className="font-bold text-foreground mb-2">
              {language === 'fr' ? 'Sagesse' : 'Wisdom'}
            </h3>
            <p className="text-sm text-foreground/70">
              {language === 'fr' ? 'Premier contact & information' : 'First contact & information'}
            </p>

            {/* bottom row “watch video” */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-foreground/70">
              <PlayCircle className="w-4 h-4" />
              <span>{language === 'fr' ? 'Regarder la vidéo' : 'Watch intro video'}</span>
            </div>
          </div>

          {/* COURAGE */}
          <div
            onClick={() => setActiveVideo('HFqvJ_e_emw')}
            className="group relative cursor-pointer bg-gradient-to-br from-muted/20 to-muted/10 border-2 border-muted/40 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-transform"
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
              <div className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-foreground shadow">
                <PlayCircle className="w-4 h-4" />
                <span>{language === 'fr' ? 'Lire la vidéo' : 'Play video'}</span>
              </div>
            </div>

            <div className="inline-flex p-3 rounded-full bg-muted/30 mb-3">
              <Heart className="w-8 h-8 text-muted" />
            </div>
            <h3 className="font-bold text-foreground mb-2">
              {language === 'fr' ? 'Courage' : 'Courage'}
            </h3>
            <p className="text-sm text-foreground/70">
              {language === 'fr' ? 'Guérison & counseling' : 'Healing & counseling'}
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-foreground/70">
              <PlayCircle className="w-4 h-4" />
              <span>{language === 'fr' ? 'Regarder la vidéo' : 'Watch intro video'}</span>
            </div>
          </div>

          {/* PROTECTION */}
          <div
            onClick={() => setActiveVideo('7eZvuWHRBKQ')}
            className="group relative cursor-pointer bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/40 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-transform"
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
              <div className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-foreground shadow">
                <PlayCircle className="w-4 h-4" />
                <span>{language === 'fr' ? 'Lire la vidéo' : 'Play video'}</span>
              </div>
            </div>

            <div className="inline-flex p-3 rounded-full bg-secondary/30 mb-3">
              <Shield className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">
              {language === 'fr' ? 'Protection' : 'Protection'}
            </h3>
            <p className="text-sm text-foreground/70">
              {language === 'fr' ? 'Refuge sûr & logement' : 'Safe shelter & housing'}
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-foreground/70">
              <PlayCircle className="w-4 h-4" />
              <span>{language === 'fr' ? 'Regarder la vidéo' : 'Watch intro video'}</span>
            </div>
          </div>

          {/* SERVICE */}
          <div
            onClick={() => setActiveVideo('gawZBbcaA1M')}
            className="group relative cursor-pointer bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/40 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-transform"
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
              <div className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-foreground shadow">
                <PlayCircle className="w-4 h-4" />
                <span>{language === 'fr' ? 'Lire la vidéo' : 'Play video'}</span>
              </div>
            </div>

            <div className="inline-flex p-3 rounded-full bg-accent/30 mb-3">
              <HandHeart className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-bold text-foreground mb-2">
              {language === 'fr' ? 'Service' : 'Service'}
            </h3>
            <p className="text-sm text-foreground/70">
              {language === 'fr'
                ? 'Bénévolat & soutien pratique'
                : 'Volunteering & hands-on support'}
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-foreground/70">
              <PlayCircle className="w-4 h-4" />
              <span>{language === 'fr' ? 'Regarder la vidéo' : 'Watch intro video'}</span>
            </div>
          </div>
        </motion.div>

        {/* -------------------- QUIZ -------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <FindYourPathQuiz />
        </motion.div>

        {/* -------------------- EXPLANATION -------------------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="bg-background rounded-xl shadow-sm border border-foreground/10 p-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {language === 'fr'
                ? 'Pourquoi choisir un parcours?'
                : 'Why choose a path?'}
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              {language === 'fr'
                ? "Chaque parcours représente une étape différente du parcours d'une survivante..."
                : "Each path represents a different stage of a survivor's journey..."}
            </p>
          </div>
        </motion.div>

        {/* -------------------- VIDEO MODAL -------------------- */}
        <VideoModal videoId={activeVideo} onClose={() => setActiveVideo(null)} />
      </div>
    </div>
  );
}