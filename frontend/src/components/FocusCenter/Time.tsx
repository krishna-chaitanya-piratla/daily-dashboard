import React from 'react';
import { observer } from 'mobx-react-lite';
import { StyledTimeContainer, StyledTimeWrapper, StyledTime, StyledMoreIcon } from '../../styled-components/FocusCenter/Time';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useStore } from '../../store/StoreProvider';

interface TimeProps {
  displaySeconds?: boolean;
  displayAMPM?: boolean;
  display24Hour?: boolean;
}

const Time: React.FC<TimeProps> = observer(({
  displaySeconds = false,
  displayAMPM = false,
  display24Hour = false,
}) => {
  const { focusCenterStore } = useStore();

  return (
    <StyledTimeContainer>
      <StyledTimeWrapper>
        <StyledTime>{focusCenterStore.time}</StyledTime>
        <StyledMoreIcon className="more-icon">
          <MoreHorizIcon />
        </StyledMoreIcon>
      </StyledTimeWrapper>
    </StyledTimeContainer>
  );
});

export default Time;
