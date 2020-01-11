import React, { FC, useState, FormEvent } from 'react';
import * as service from '../../services/xs-json-requester';
import AuthButton from '../../components/AuthButton/AuthButton';
import './authenticate.scss';

interface IProps {
  setAuthentication: (ip: string, devName: string) => void;
  showSweetAlertWarning: (text: string) => void;
}

const Authenticate: FC<IProps> = (props) => {
  const [inputIp, setInputIp] = useState<string>('');
  const [inputDevName, setInputDevName] = useState<string>('');
  const [authenticateWaiter, setAuthenticateWaiter] = useState<boolean>(false);
  const [authenticateTimeout, setAuthenticateTimeout] = useState<NodeJS.Timeout | null>(null);

  const onInputIpChange = (changer: React.Dispatch<React.SetStateAction<string>>) => {
    return (e: FormEvent<HTMLInputElement>) => {
      changer(e.currentTarget.value);
    };
  };

  const validateInput = () => {
    const formattedInput = inputIp.replace(/[a-zA-Z]|:|\//g, '');

    if (!formattedInput) {
      props.showSweetAlertWarning('Fill the IP address of your HUE bridge');
      return;
    }

    if (!validateIfIp(formattedInput)) {
      props.showSweetAlertWarning('That IP is not right');
      return;
    }

    if (!inputDevName) {
      props.showSweetAlertWarning('Choose a cool developer name');
      return;
    }

    if (!validateDevName(inputDevName)) {
      props.showSweetAlertWarning('Developer name is not accepted');
      return;
    }

    beginCountdown();
    setInputIp(formattedInput);
  };

  const startAuthenticateProbing = () => {
    const probe = setInterval(() => {
      if (authenticateWaiter) {
        authorizeNewUser();
      } else {
        clearInterval(probe);
      }
    }, 1500);
  };

  const authorizeNewUser = async () => {
    try {
      const request = await service.postJSON(`http://${inputIp}/api`, {
        devicetype: `hue_debugger_ui#${inputDevName}`,
      });

      const result = await request.json();

      Object.keys(result[0]).forEach((key) => {
        if (key === 'success') {
          if (authenticateTimeout) {
            clearTimeout(authenticateTimeout);
          }
          props.setAuthentication(inputIp, result[0].success.username);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderInputFields = () => (
    <div className='authContainer'>
      <div className='authHeadline'>Enter bridge IP</div>
      <input
        value={inputIp}
        onChange={onInputIpChange(setInputIp)}
        type='text'
        className='authInput'
        placeholder='e.g. 192.168.0.100'
      />

      <div className='authHeadline'>Developer name</div>
      <input
        value={inputDevName}
        onChange={onInputIpChange(setInputDevName)}
        type='text'
        className='authInput'
        placeholder='Choose a developer name'
      />

      <AuthButton hint='Begin' onClick={validateInput} />
    </div>
  );

  const renderCountdown = () => (
    <div className='authContainer'>
      <div className='countdownLine'>
        <div className='countdownProcess' />
      </div>

      <div className='bridgePushRow'>
        <div className='bridgePushIcon' />
        <div className='bridgePushText'>Go and press the Hue Bridge button to authenticate!</div>
      </div>
    </div>
  );

  const validateIfIp = (sequence: string) => {
    let isIp = true;
    sequence.split('.').forEach((block: string) => {
      const parsedBlock = Number(block);
      if (isNaN(parsedBlock) || parsedBlock < 0 || parsedBlock > 255) {
        isIp = false;
      }
    });

    return isIp;
  };

  const validateDevName = (name: string) => {
    return /^[a-zA-ZæøåÆØÅ]+$/gm.test(name);
  };

  const beginCountdown = async () => {
    setAuthenticateWaiter(true);
    setAuthenticateTimeout(setTimeout(endCountdown, 15500));
    startAuthenticateProbing();
  };

  const endCountdown = async () => {
    setAuthenticateWaiter(false);
    props.showSweetAlertWarning(
      'Hue failed to authenticate!\nDid you press the button on the bridge?',
    );
  };

  if (authenticateWaiter) {
    return renderCountdown();
  }

  return renderInputFields();
};

export default Authenticate;
