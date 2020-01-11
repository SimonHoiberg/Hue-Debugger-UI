import React, { FC, useState, useEffect } from 'react';
import moment from 'moment';
import { Resizable } from 're-resizable';
import 'moment/locale/pt-br';
import './console.scss';

interface IConsoleProps {
  consoleOutput: any[];
  show: boolean;
  toggleConsole: () => void;
}

const Console: FC<IConsoleProps> = (props) => {
  const [showFormatted, setShowFormatted] = useState<boolean>(true);
  const [currentHeight, setCurrentHeight] = useState<number>(300);
  const consoleContainerRep = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [props.consoleOutput]);

  const scrollToBottom = () => {
    consoleContainerRep.current?.scrollTo(0, consoleContainerRep.current.scrollHeight);
  };

  const toggleFormatting = () => {
    setShowFormatted((prevShowFormatted: boolean) => !prevShowFormatted);
  };

  const consoleOutput = () => {
    return props.consoleOutput.map((o, index) => (
      <ConsoleOutput key={index} output={o} formatted={showFormatted} />
    ));
  };

  const formattedIcon = showFormatted ? 'notes' : 'sort';
  const headerClasses = props.show ? 'consoleHeader consoleHeaderShow' : 'consoleHeader';
  const dataTitle = showFormatted ? 'No formatting' : 'Formatting';

  const handleChangeHeight = (e: any, dir: any, ref: any, d: { width: number; height: number }) => {
    setCurrentHeight((prevHeight) => prevHeight + d.height);
  };

  return (
    <Resizable
      className='consoleWrapper'
      size={{ width: '100%', height: props.show ? currentHeight : 30 }}
      onResizeStop={handleChangeHeight}
      enable={{ top: props.show }}
      maxHeight={760}
      minHeight={30}
    >
      <div>
        <div className={headerClasses} onClick={props.toggleConsole}>
          Console
        </div>
      </div>
      <div className='menuLine'>
        <div className='menuButton' onClick={toggleFormatting} data-title={dataTitle}>
          <i className='material-icons'>{formattedIcon}</i>
        </div>
      </div>
      <div ref={consoleContainerRep} className='consoleContent'>
        {consoleOutput()}
      </div>
    </Resizable>
  );
};

interface IConsoleOutputProps {
  output: any;
  formatted: boolean;
}

const ConsoleOutput: FC<IConsoleOutputProps> = (props) => {
  const now = moment().format('h:mm:ss a');

  const formattedConsoleOutput = () => {
    const rawConsoleOutput = () => (
      <tbody>
        {formattedConsoleRow(now, '')}
        {formattedConsoleRow('', JSON.stringify(props.output, null, 2))}
      </tbody>
    );

    const outputContent = () => {
      if (props.output[0] === undefined) {
        return <tbody>{formattedConsoleRow(now, 'error: undefined output')}</tbody>;
      }

      const logType = Object.keys(props.output[0])[0];

      if (logType === 'success') {
        return (
          <tbody>
            {formattedConsoleRow(now, 'success:')}
            {formattedConsoleRow('', JSON.stringify(props.output[0][logType], null, 2))}
          </tbody>
        );
      }

      return (
        <tbody>
          {formattedConsoleRow(now, `error: type  ${props.output[0][logType].type}`)}
          {formattedConsoleRow('', `address:  ${props.output[0][logType].address}`)}
          {formattedConsoleRow('', `description:  ${props.output[0][logType].description}`)}
        </tbody>
      );
    };

    if (props.formatted) {
      return <table className='consoleTable'>{outputContent()}</table>;
    }

    return <table className='consoleTable'>{rawConsoleOutput()}</table>;
  };

  const formattedConsoleRow = (firstCell: string, secondCell: string) => (
    <tr>
      <td>{firstCell}</td>
      <td>{secondCell}</td>
    </tr>
  );

  return <div className='outputWrapper'>{formattedConsoleOutput()}</div>;
};

export default Console;
