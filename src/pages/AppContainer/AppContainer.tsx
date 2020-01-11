import React, { Fragment, FC, useState, useEffect } from 'react';
import * as service from '../../services/xs-json-requester';
import Menu from '../../components/Menu/Menu';
import JSONContainer from '../JSONContainer/JSONContainer';
import Console from '../../components/Console/Console';
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner';
import '../../styles/cssOverwrite.scss';
import './appContainer.scss';

interface IProps {
  ip: string | null;
  token: string | null;
  showSweetAlertDialog: (title: string, hint: string, action: () => void) => void;
  removeAuthentication: () => void;
}

const AppContainer: FC<IProps> = (props) => {
  const apiUrl = `http://${props.ip}/api/${props.token}`;

  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [failedLoading, setFailedLoading] = useState<boolean>(false);
  const [failedMessage, setFailedMessage] = useState<string>('');
  const [hueData, setHueData] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [subMenuItems, setSubMenuItems] = useState<any[]>([]);
  const [activeMenu, setActiveMenu] = useState<number>(0);
  const [activeSubMenu, setActiveSubMenu] = useState<number>(0);
  const [showConsole, setShowConsole] = useState<boolean>(false);
  const [consoleOutput, setConsoleOutput] = useState<any[]>([]);

  useEffect(() => {
    requestHueData();
    setInterval(() => {
      setRefreshCount((prevCount) => prevCount + 1);
    }, 2000);
  }, []);

  useEffect(() => {
    requestHueData();
  }, [activeMenu, activeSubMenu, refreshCount]);

  const requestHueData = async (options?: { force?: boolean }) => {
    try {
      const newMenuItems = await fetchMenuItems('');
      const newSubMenuItems = await fetchMenuItems(newMenuItems[activeMenu].id);

      const dataQuery = newMenuItems[activeMenu]?.id || '';
      const dataPath = newSubMenuItems[activeSubMenu]?.id || '';

      const prepareHueData = await fetchHueData(`${dataQuery}/${dataPath}`);

      const newHueData = {
        keyName: newSubMenuItems[activeSubMenu]?.id,
        data: prepareHueData,
      };

      if (JSON.stringify(newHueData) !== JSON.stringify(hueData) || options?.force) {
        setMenuItems(newMenuItems);
        setSubMenuItems(newSubMenuItems);
        setHueData(newHueData);
      }
    } catch (e) {
      setFailedLoading(true);
      setFailedMessage(e.message);
      throw e;
    }
  };

  const fetchMenuItems = async (query: string): Promise<any[]> => {
    const result = await service.getJSON(`${apiUrl}/${query}`);

    if (result[0]) {
      throw result[0].error.description;
    }

    if (query === 'config') {
      return [];
    }

    return Object.keys(result).map((item) => ({
      id: item,
      name: query ? `${item} : ${result[item].name}` : item.replace(/^\w/, (c) => c.toUpperCase()),
    }));
  };

  const fetchHueData = async (query: string): Promise<any> => {
    const result = await service.getJSON(`${apiUrl}/${query}`);

    if (result[0]) {
      throw result[0].error.description;
    }

    return result;
  };

  const putHueData = async (query: string, data: any) => {
    const url = `${apiUrl}/${menuItems[activeMenu].id}/${query}`;

    try {
      const result = await service.putJSON(url, data);
      requestHueData({ force: true });
      writeToConsole(result);
    } catch (error) {
      writeToConsole(error);
    }
  };

  const deleteHueData = async (query: string) => {
    const url = `${apiUrl}/${menuItems[activeMenu].id}/${query}`;

    try {
      const result = await service.deleteJSON(url, null);
      writeToConsole(result);
      requestHueData({ force: true });
    } catch (error) {
      writeToConsole(error);
    }
  };

  const createNewHueData = async (newHueData: any) => {
    try {
      const result = await service.postJSON(`${apiUrl}/${menuItems[activeMenu].id}}/`, newHueData);
      writeToConsole(result);
      requestHueData({ force: true });
    } catch (error) {
      writeToConsole(error);
    }
  };

  const writeToConsole = (write: any[]) => setConsoleOutput((prevOutput) => [...prevOutput, write]);

  const menuClick = (menuIndex: number) => {
    setActiveMenu(menuIndex);
    setActiveSubMenu(0);
  };

  const subMenuClick = (menuIndex: number) => {
    setActiveSubMenu(menuIndex);
  };

  const consoleClick = () => {
    setShowConsole((prevShow) => !prevShow);
  };

  if (!hueData) {
    return (
      <LoaderSpinner
        isLoading={!failedLoading}
        failMessage={failedMessage}
        backAction={props.removeAuthentication}
      />
    );
  }

  return (
    <Fragment>
      <div className='mainContainer'>
        <Menu
          key={activeMenu}
          menuItems={menuItems}
          menuClick={menuClick}
          menuSelected={activeMenu}
        />
        <JSONContainer
          jsonData={hueData}
          subMenuItems={subMenuItems}
          putHueData={putHueData}
          deleteHueData={deleteHueData}
          createNewHueData={createNewHueData}
          writeToConsole={writeToConsole}
          subMenuClick={subMenuClick}
          activeSubMenu={activeSubMenu}
          showSweetAlertDialog={props.showSweetAlertDialog}
        />
      </div>

      <Console show={showConsole} toggleConsole={consoleClick} consoleOutput={consoleOutput} />
    </Fragment>
  );
};

export default AppContainer;
