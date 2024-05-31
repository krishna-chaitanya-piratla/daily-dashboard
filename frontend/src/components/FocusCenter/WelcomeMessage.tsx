import React, { useEffect, useState } from 'react';
import { StyledWelcomeMessage } from '../../styled-components/FocusCenter/WelcomeMessage';



interface WelcomeMessageProps {
    userName?: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName = 'Stranger' }) => {
    const [greeting, setGreeting] = useState<string>('');

    useEffect(() => {
        const getCurrentGreeting = () => {
            const currentHour = new Date().getHours();

            if (currentHour >= 22 || currentHour < 4) {
                return `Time to Sleep, ${userName}`;
            } else if (currentHour >= 4 && currentHour < 12) {
                return `Good Morning, ${userName}`;
            } else {
                return `Good Evening, ${userName}`;
            }
        };
        
        setGreeting(getCurrentGreeting())

        const intervalId = setInterval(() => {
            setGreeting(getCurrentGreeting());
        }, 60000); 

        return () => clearInterval(intervalId);
    }, [userName]);


    return (
        <StyledWelcomeMessage>
            {greeting}
        </StyledWelcomeMessage>
    )
}

export default WelcomeMessage;