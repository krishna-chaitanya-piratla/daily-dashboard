import React, { useEffect, useState } from 'react';
import { StyledEditMessageIcon, StyledWelcomeMessage, StyledWelcomeMessageContainer, StyledWelcomeMessageWrapper } from '../../styled-components/FocusCenter/WelcomeMessage';
import EditIcon from '@mui/icons-material/Edit';



interface WelcomeMessageProps {
    userName?: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName = 'Stranger' }) => {
    const [greeting, setGreeting] = useState<string>('');
    const welcomeName = userName === '' ? 'Stranger' : userName;

    useEffect(() => {
        const getCurrentGreeting = () => {
            const currentHour = new Date().getHours();

            if (currentHour >= 22 || currentHour < 4) {
                return `Time to Sleep, ${welcomeName}`;
            } else if (currentHour >= 4 && currentHour < 12) {
                return `Good Morning, ${welcomeName}`;
            } else {
                return `Good Evening, ${welcomeName}`;
            }
        };
        
        setGreeting(getCurrentGreeting())

        const intervalId = setInterval(() => {
            setGreeting(getCurrentGreeting());
        }, 60000); 

        return () => clearInterval(intervalId);
    }, [welcomeName]);


    return (
        <StyledWelcomeMessageContainer>
            <StyledWelcomeMessageWrapper>
                <StyledWelcomeMessage>
                    {greeting}
                </StyledWelcomeMessage>
                <StyledEditMessageIcon className='edit-message-icon'>
                    <EditIcon />
                </StyledEditMessageIcon>
            </StyledWelcomeMessageWrapper>
        </StyledWelcomeMessageContainer>
    )
}

export default WelcomeMessage;