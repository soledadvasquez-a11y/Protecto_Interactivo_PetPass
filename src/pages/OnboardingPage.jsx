import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingDots from '../components/OnboardingDots/OnboardingDots.jsx';
import logoPetpass from '../assets/logo-petpass.svg';
import confettiPattern from '../assets/confetti.png';
import './OnboardingPage.css';

const onboardingSteps = [
  {
    theme: 'welcome-1',
    title: 'Bienvenido',
    description:
      'El carnet digital y guía pet-friendly para tu peludo en La Paz',
  },
  {
    theme: 'welcome-2',
    title: 'Explora La Paz',
    description:
      'Encuentra parques, cafés y veterinarias que aceptan a tu mascota cerca de ti.',
  },
  {
    theme: 'welcome-3',
    title: 'Todo en un solo lugar',
    description:
      'Lleva la cartilla de vacunación y datos de emergencia siempre listos con tu código QR.',
  },
];

function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const stepData = onboardingSteps[currentStep - 1];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length) {
      setCurrentStep((step) => step + 1);
      return;
    }
    navigate('/login');
  };

  return (
    <main className={`onboarding-page onboarding-page--${stepData.theme}`}>
      {/* Fondo de confeti inferior */}
      <img
        src={confettiPattern}
        alt=""
        aria-hidden="true"
        className="onboarding-page__confetti-bg"
      />

      {/* Header con Logo PetPass */}
      <header className="onboarding-page__header">
        <img
          src={logoPetpass}
          alt="PetPass"
          className="onboarding-page__logo"
        />
      </header>

      {/* Bloque inferior: Tarjeta + Puntos unidos */}
      <div className="onboarding-page__main-content">
        <section className="onboarding-page__card">
          <h1>{stepData.title}</h1>
          <p>{stepData.description}</p>

          {currentStep === 3 ? (
            <button
              type="button"
              className="onboarding-page__btn-start"
              onClick={handleNext}
            >
              Empezar
            </button>
          ) : (
            <button
              type="button"
              className="onboarding-page__btn-circle"
              onClick={handleNext}
              aria-label="Siguiente paso"
            >
              ➔
            </button>
          )}
        </section>

        {/* Puntos elevados pegados a la base de la tarjeta */}
        <footer className="onboarding-page__dots-wrapper">
          <OnboardingDots
            currentStep={currentStep}
            totalSteps={3}
            onStepChange={setCurrentStep}
          />
        </footer>
      </div>
    </main>
  );
}

export default OnboardingPage;