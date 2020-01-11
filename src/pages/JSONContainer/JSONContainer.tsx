import React, { Component, Fragment, FC, useState, useEffect } from 'react';
import ReactJson from 'react-json-view';
import AuthButton from '../../components/AuthButton/AuthButton';
import JSONTextEditor from '../../components/JSONTextEditor/JSONTextEditor';
import './jsonContainer.scss';

interface IJSONContainerProps {
  subMenuItems: Array<{ name: string }>;
  activeSubMenu: number;
  jsonData: { keyName: string; data: any };
  subMenuClick: (menuIndex: number) => void;
  putHueData: (query: string, data: { [x: number]: any }) => void;
  showSweetAlertDialog: (title: string, text: string, action: () => void) => void;
  writeToConsole: (data: any[]) => void;
  deleteHueData: (query: string) => void;
  createNewHueData: (content: string) => void;
}

const JSONContainer: FC<IJSONContainerProps> = (props) => {
  const [showCreateNewModal, setShowCreateNewModal] = useState<boolean>(false);
  const [editorError, setEditorError] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string>('');

  useEffect(() => {
    setShowCreateNewModal(false);
  }, [props.activeSubMenu]);

  const menuClick = (menuIndex: number) => props.subMenuClick(menuIndex);

  const onTextEditorChange = (data: { content: string; error: boolean }) => {
    setEditorContent(data.content);
    setEditorError(data.error);
  };

  const menuItems = () => {
    if (!props.subMenuItems) {
      return null;
    }

    const renderSubMenuItems = props.subMenuItems.map((item, index) => {
      const handleMenuClick = () => {
        menuClick(index);
      };

      return (
        <MenuItem
          key={JSON.stringify(item)}
          onMenuClick={handleMenuClick}
          onDeleteClick={onDelete}
          isActive={index === props.activeSubMenu}
          menuTitle={item.name}
        />
      );
    });

    return <div className='menuContainer'>{renderSubMenuItems}</div>;
  };

  const constructQueryData = (edit: any) => {
    let query = `${props.jsonData.keyName}/`;

    let currentLevel = edit.updated_src;
    let key = edit.name;
    let value = edit.new_value;

    for (const namespace of edit.namespace) {
      currentLevel = currentLevel[namespace];
      if (Array.isArray(currentLevel)) {
        key = namespace;
        value = currentLevel;
        break;
      }
      query += `${namespace}/`;
    }

    let data = { [key]: value };

    if (edit.namespace[0] === 'lightstates') {
      data = edit.updated_src.lightstates[edit.namespace[1]];
    }

    return { query, data };
  };

  const onEdit = (edit: any) => {
    const queriedData = constructQueryData(edit);
    props.putHueData(queriedData.query, queriedData.data);
  };

  const onEditDelete = (del: any) => {
    props.showSweetAlertDialog('Are you sure?', 'Are you sure you want to delete this?', () => {
      if (!props.jsonData.keyName) {
        onConfigDelete(del);
      } else {
        onEdit(del);
      }
    });
    return false;
  };

  const onConfigDelete = (del: any) => {
    if (del.namespace[0] !== 'whitelist') {
      props.writeToConsole([
        {
          error: {
            type: -1,
            address: '/config',
            description: 'only properties in "whitelist" can be deleted from config',
          },
        },
      ]);
    } else {
      props.deleteHueData(`whitelist/${del.name}`);
    }
  };

  const onDelete = () =>
    props.showSweetAlertDialog('Are you sure?', 'Are you sure you want to delete this?', () =>
      props.deleteHueData(props.jsonData.keyName),
    );

  const renderMenu = () => {
    if (!props.jsonData.keyName && props.jsonData.data) {
      return null;
    }

    const handleNewItemClick = () => {
      setShowCreateNewModal(true);
    };

    return (
      <div className='menuWrapper'>
        <div className='createNewItemButton' onClick={handleNewItemClick}>
          <i className='material-icons createNewItemIcon'>add_circle</i>
          Create new item
        </div>
        {menuItems()}
      </div>
    );
  };

  const renderCreateNewModal = () => {
    const handleCreateNewClick = () => {
      setShowCreateNewModal(false);
    };

    const handleAuthButtonClick = () => {
      if (editorContent && !editorError) {
        props.createNewHueData(editorContent);
        setShowCreateNewModal(false);
      }
    };

    const style = {
      verticalAlign: 'middle',
      color: 'rgb(56, 56, 48)',
      fontSize: '15px',
      transform: 'rotate(45deg)',
      height: '1em',
      width: '1em',
    };

    return (
      <div className='jsonCreateModalWrapper'>
        <div className='jsonCreateNewEditorContainer'>
          <div className='jsonCreateNewCloseBtn' onClick={handleCreateNewClick}>
            <svg
              viewBox='0 0 40 40'
              fill='currentColor'
              preserveAspectRatio='xMidYMid meet'
              style={style}>
              <g>
                <path d='m31.6 21.6h-10v10h-3.2v-10h-10v-3.2h10v-10h3.2v10h10v3.2z' />
              </g>
            </svg>
          </div>
          <JSONTextEditor onChange={onTextEditorChange} />
          <AuthButton hint='Create new' onClick={handleAuthButtonClick} />
        </div>
        <div className='jsonDataOverlay' onClick={handleCreateNewClick} />
      </div>
    );
  };

  const renderJsonViewer = () => {
    if (!Object.keys(props.jsonData.data).length) {
      return (
        <div className='emptyContainer'>
          <div className='emptyText'>No content to show</div>
        </div>
      );
    }

    return (
      <ReactJson
        name={props.jsonData.keyName}
        src={props.jsonData.data}
        theme='monokai'
        onEdit={onEdit}
        onDelete={onEditDelete}
        collapsed={false}
        displayDataTypes={true}
        displayObjectSize={false}
        validationMessage=''
        enableClipboard={true}
      />
    );
  };

  const renderJsonContent = () => {
    return (
      <div className='jsonDataWrapper'>
        {showCreateNewModal && renderCreateNewModal()}
        <div className='jsonDataContainer'>{renderJsonViewer()}</div>
      </div>
    );
  };

  const style = !props.subMenuItems.length ? { width: '100%' } : { width: '75%' };

  return (
    <Fragment>
      <div className='contentContainer'>
        {renderMenu()}
        <div style={style}>{renderJsonContent()}</div>
      </div>
    </Fragment>
  );
};

interface IMenuItemProps {
  menuTitle: string;
  isActive: boolean;
  onDeleteClick: () => void;
  onMenuClick: () => void;
}

const MenuItem: FC<IMenuItemProps> = (props) => {
  const style = props.isActive ? { width: '35px' } : { width: 0 };

  const deleteButton = () => (
    <div className='deleteButton' style={style} onClick={props.onDeleteClick}>
      <i className='material-icons'>delete_forever</i>
    </div>
  );

  const menuStyle = props.isActive ? 'menuItem menuItemActive' : 'menuItem';

  return (
    <div className='itemContainer'>
      {deleteButton()}
      <div onClick={props.onMenuClick} className={menuStyle} data-title={props.menuTitle}>
        {props.menuTitle}
      </div>
    </div>
  );
};

export default JSONContainer;
