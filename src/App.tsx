import React, { useEffect, useState, FC } from 'react';
import swal from 'sweetalert';
import AppContainer from './pages/AppContainer/AppContainer';
import Authenticate from './pages/Authenticate/Authenticate';

const App: FC = () => {
  const [hueIp, setHueIp] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem('hueApiIp') && localStorage.getItem('hueApiAuthToken')) {
      setHueIp(localStorage.getItem('hueApiIp'));
      setAuthToken(localStorage.getItem('hueApiAuthToken'));
    }
  }, []);

  const setAuthentication = (ip: string, token: string) => {
    localStorage.setItem('hueApiIp', ip);
    localStorage.setItem('hueApiAuthToken', token);
    setHueIp(ip);
    setAuthToken(token);
  };

  const removeAuthentication = () => {
    localStorage.removeItem('hueApiIp');
    localStorage.removeItem('hueApiAuthToken');
    setHueIp(null);
    setAuthToken(null);
  };

  const showSweetAlertDialog = async (title: string, hint: string, action: () => void) => {
    const willDelete = await swal({
      title,
      text: hint,
      icon: 'warning',
      dangerMode: true,
    });

    if (willDelete) {
      action();
    }
  };

  const showSweetAlertWarning = (warning: string) => {
    swal(warning);
  };

  if (hueIp && authToken) {
    return (
      <AppContainer
        ip={hueIp}
        token={authToken}
        showSweetAlertDialog={showSweetAlertDialog}
        removeAuthentication={removeAuthentication}
      />
    );
  }

  return (
    <Authenticate
      setAuthentication={setAuthentication}
      showSweetAlertWarning={showSweetAlertWarning}
    />
  );
};

export default App;
