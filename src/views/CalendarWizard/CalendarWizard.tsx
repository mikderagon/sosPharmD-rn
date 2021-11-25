import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import Wizard from 'react-native-wizard';

import Step1 from './WizardStep1';
import Step2 from './WizardStep2';

const CalendarWizard = ({ navigation }) => {
  const wizard = useRef();
  const [isFirstStep, setIsFirstStep] = useState();
  const [isLastStep, setIsLastStep] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const stepList = [
    {
      content: (
        <Step1 navigation={navigation} onNext={() => wizard.current.next()} />
      ),
    },
    {
      content: (
        <Step2
          navigation={navigation}
          onPrev={() => wizard.current.prev()}
          onNext={() => wizard.current.next()}
        />
      ),
    },
  ];

  return (
    <Wizard
      ref={wizard}
      activeStep={0}
      steps={stepList}
      isFirstStep={val => setIsFirstStep(val)}
      isLastStep={val => setIsLastStep(val)}
      onNext={() => {
        console.log('Next Step Called');
      }}
      onPrev={() => {
        console.log('Previous Step Called');
      }}
      currentStep={({ currentStep, isLastStep, isFirstStep }) => {
        setCurrentStep(currentStep);
      }}
    />
  );
};

export default CalendarWizard;
