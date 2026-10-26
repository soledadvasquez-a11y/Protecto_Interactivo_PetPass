
import './DecorativeConfetti.css';

// Paleta de colores decorativos de Pet Pass
const COLORS = {
  cream: '#FAF8F1',
  orange: '#D47C54',
  olive: '#A2AA60',
  powder: '#97ABC9',
  yellow: '#EED9A4',
};

// Distribución de las figuras del confeti
// x: posición horizontal en porcentaje
// bottom: distancia desde abajo en porcentaje
// size: tamaño de la figura en píxeles
// rotation: rotación opcional en grados

const confettiPieces = [
  // Figuras decorativas de los laterales
  { shape: 'sparkle', x: 0, bottom: 64, size: 23, color: 'cream', rotation: 15 },
  { shape: 'circle', x: 7, bottom: 55, size: 12, color: 'orange' },
  { shape: 'sparkle', x: 1, bottom: 42, size: 17, color: 'cream' },
  { shape: 'circle', x: 0, bottom: 33, size: 12, color: 'cream' },

  { shape: 'circle', x: 96, bottom: 73, size: 19, color: 'olive' },
  { shape: 'circle', x: 98, bottom: 55, size: 22, color: 'yellow' },
  { shape: 'circle', x: 97, bottom: 38, size: 18, color: 'cream' },

  // Zona inferior izquierda
  { shape: 'circle', x: 10, bottom: 11, size: 28, color: 'cream' },
  { shape: 'star', x: 14, bottom: 29, size: 23, color: 'olive', rotation: -14 },
  { shape: 'circle', x: 19, bottom: 1, size: 14, color: 'yellow' },
  { shape: 'circle', x: 25, bottom: 6, size: 19, color: 'olive' },
  { shape: 'star', x: 24, bottom: 19, size: 23, color: 'orange', rotation: 12 },
  { shape: 'circle', x: 33, bottom: 18, size: 20, color: 'yellow' },
  { shape: 'circle', x: 40, bottom: 5, size: 18, color: 'orange' },

  // Zona inferior central
  { shape: 'circle', x: 36, bottom: 0, size: 10, color: 'cream' },
  { shape: 'sparkle', x: 53, bottom: 18, size: 26, color: 'cream', rotation: 15 },
  { shape: 'circle', x: 51, bottom: 0, size: 10, color: 'powder' },
  { shape: 'star', x: 67, bottom: 6, size: 21, color: 'olive', rotation: -10 },
  { shape: 'star', x: 69, bottom: 24, size: 14, color: 'olive', rotation: 20 },

  // Zona inferior derecha
  { shape: 'circle', x: 76, bottom: 1, size: 10, color: 'cream' },
  { shape: 'star', x: 81, bottom: 19, size: 23, color: 'yellow', rotation: 14 },
  { shape: 'circle', x: 86, bottom: 3, size: 10, color: 'powder' },
  { shape: 'star', x: 91, bottom: 31, size: 27, color: 'orange', rotation: -10 },
  { shape: 'circle', x: 98, bottom: 8, size: 16, color: 'yellow' },
  { shape: 'star', x: 97, bottom: 1, size: 32, color: 'orange', rotation: 15 },

  // Pequeños detalles adicionales
  { shape: 'circle', x: 38, bottom: 36, size: 8, color: 'powder' },
  { shape: 'circle', x: 88, bottom: 49, size: 17, color: 'olive' },
  { shape: 'circle', x: 6, bottom: 4, size: 9, color: 'cream' },
  { shape: 'sparkle', x: 58, bottom: 7, size: 13, color: 'yellow' },
];

function OnboardingConfetti() {
  return (
    <div
      className="onboarding-confetti"
      aria-hidden="true"
    >
      <div className="onboarding-confetti__canvas">
        {confettiPieces.map((piece, index) => (
          <span
            key={index}
            className={`
              onboarding-confetti__piece
              onboarding-confetti__piece--${piece.shape}
            `}
            style={{
              '--piece-x': `${piece.x}%`,
              '--piece-bottom': `${piece.bottom}%`,
              '--piece-size': `${piece.size}px`,
              '--piece-color': COLORS[piece.color],
              '--piece-rotation': `${piece.rotation ?? 0}deg`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default OnboardingConfetti;
