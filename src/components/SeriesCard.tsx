// ============================================================
// SeriesCard - Card minimalista de série para listagens
// ============================================================
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { type Series } from '../data/data';

interface SeriesCardProps {
  series: Series;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export default function SeriesCard({ series, isFavorite = false, onToggleFavorite }: SeriesCardProps) {
  return (
    <div className="group relative">
      <Link to={`/catalogo/${series.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-square mb-3 bg-card">
          <img
            src={series.cover}
            alt={series.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Badge Free/Paid */}
          <div className="absolute top-2 left-2">
            <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${
              series.isFree
                ? 'bg-accent/20 text-accent'
                : 'bg-white/10 text-white/80'
            }`}>
              {series.isFree ? 'FREE' : 'PREMIUM'}
            </span>
          </div>
        </div>
        <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors truncate">
          {series.title}
        </h3>
        <p className="text-xs text-text-muted mt-0.5">{series.genre} · {series.year}</p>
      </Link>

      {/* Botão de favorito */}
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-bg/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-bg/80"
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              isFavorite ? 'fill-accent text-accent' : 'text-white/60'
            }`}
          />
        </button>
      )}
    </div>
  );
}
