import React from 'react';
import "../styles/css/loaderSpinner.css";
import AuthButton from './AuthButton';

/**
 * Loader spinner
 * Shows a loader spinner animation while loading.
 * When done loading shows a message and a back-button
 * @prop {boolean} isLoading show spinner if true, shows back-action otherwise
 * @prop {string} failMessage message shown if failed
 * @prop {function} backAction function that will be called on back-action 
 */
const LoaderSpinner = props => {
  if (props.isLoading)
    return (
      <div className="loaderSpinnerWrapper">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
        <div className="loaderSpinnerText">Loading Hue resources</div>
      </div>
    )
  else
    return (
      <div className="loaderSpinnerWrapper">
        <div className="loaderSpinnerText">
          An error occured:<br/>
          {props.failMessage}
        </div>
        <AuthButton 
          hint="Re-authenticate Hue"
          onClick={props.backAction}
        />
      </div>
    )
}

export default LoaderSpinner;