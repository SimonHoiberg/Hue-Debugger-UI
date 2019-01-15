import React from 'react';
import renderer from 'react-test-renderer';
import LoaderSpinner from './../components/loaderSpinner';
import Console from './../console/Console';
import Authenticate from './../pages/Authenticate';

describe("Components should render correctly", () => {
  const createTree = fromComponent =>
    renderer.create(fromComponent).toJSON();

  it("should render LoaderSpinner correctly", () => {
    const tree = createTree(
      <LoaderSpinner 
        isLoading
        failMessage="Test fail message"
      />
    );

    expect(tree).toMatchSnapshot();
  });
  
  it("should render Console correctly", () => {
    const tree = createTree(
      <Console
        show
        consoleOutput={[]}
      />
    );

    expect(tree).toMatchSnapshot();
  });

  it("should render Authenticate correctly", () => {
    const tree = createTree(
      <Authenticate />
    );

    expect(tree).toMatchSnapshot();
  });

})