import React from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import { Platform, usePlatform } from 'hooks/platform';
import { dispatch } from 'store/rematch';
import { selectAccountReady } from 'store/selectors';
import { Colors, ModalName, TOPBAR_HEIGHT_PX } from 'vars/defines';

import { ButtonSmall } from 'components/_General/buttons';
import { HSpaceSmall } from 'components/Dashboard/widgets/common';
import NspvIndicator from 'components/NspvIndicator';
import WindowControls from 'components/WindowControls';

// import User from './User';

type TopBarRootProps = {
  bgColor?: string;
};

const TopBarRoot = styled.div<TopBarRootProps>`
  background-color: var(${p => p.bgColor});
  height: ${TOPBAR_HEIGHT_PX}px;
  width: 100%;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
  -webkit-app-region: drag;
`;

const RightSideContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const TopBar = () => {
  const accountReady = useSelector(selectAccountReady);

  const isWindowsOrLinux = [Platform.WINDOWS, Platform.LINUX].includes(usePlatform());

  return (
    <TopBarRoot bgColor={accountReady ? '--color-almostBlack' : '--color-black'}>
      {isWindowsOrLinux ? <WindowControls /> : <div />}
      {accountReady ? (
        <RightSideContainer>
          <NspvIndicator />
          <ButtonSmall onClick={() => dispatch.environment.SET_MODAL_NAME(ModalName.FEEDBACK)}>
            Feedback
          </ButtonSmall>
          <HSpaceSmall />
          <ButtonSmall theme={Colors.TRANSPARENT} onClick={() => dispatch.wallet.logout()}>
            Logout
          </ButtonSmall>
        </RightSideContainer>
      ) : (
        <div />
      )}
    </TopBarRoot>
  );
};

export default TopBar;
