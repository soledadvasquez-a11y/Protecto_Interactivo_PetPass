import './OnboardingDots.css';

function OnboardingDots({
  currentStep = 1,
  totalSteps = 3,
  onStepChange,
}) {
  const steps = Array.from(
    { length: totalSteps },
    (_, index) => index + 1
  );

  return (
    <div
      className="onboarding-dots"
      aria-label={`Paso ${currentStep} de ${totalSteps}`}
    >
      {steps.map((step) => {
        const isActive = step === currentStep;

        return (
          <button
            key={step}
            type="button"
            className={`onboarding-dots__dot ${
              isActive
                ? 'onboarding-dots__dot--active'
                : ''
            }`}
            onClick={() => onStepChange?.(step)}
            aria-label={`Ir al paso ${step}`}
            aria-current={isActive ? 'step' : undefined}
          />
        );
      })}
    </div>
  );
}

export default OnboardingDots;