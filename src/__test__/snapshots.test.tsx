import React from 'react';
import renderer from 'react-test-renderer';
import LoaderSpinner from './../components/LoaderSpinner/LoaderSpinner';
import Console from './../components/Console/Console';
import Authenticate from './../pages/Authenticate/Authenticate';

describe('Components should render correctly', () => {
  const createTree = (fromComponent: React.ReactElement) => renderer.create(fromComponent).toJSON();
  const stubFunc = () => {};

  it('should render LoaderSpinner correctly', () => {
    const tree = createTree(
      <LoaderSpinner isLoading={true} failMessage='Test fail message' backAction={stubFunc} />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('should render Console correctly', () => {
    const tree = createTree(<Console show={true} consoleOutput={[]} toggleConsole={stubFunc} />);

    expect(tree).toMatchSnapshot();
  });

  it('should render Authenticate correctly', () => {
    const tree = createTree(
      <Authenticate setAuthentication={stubFunc} showSweetAlertWarning={stubFunc} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
