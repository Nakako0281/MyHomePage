import React, { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 100, delay = 0, className = "" }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isCursorVisible, setIsCursorVisible] = useState(true);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        let currentIndex = 0;

        const startTyping = () => {
            const typeChar = () => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                    timeoutId = setTimeout(typeChar, speed);
                }
            };
            typeChar();
        };

        if (delay > 0) {
            timeoutId = setTimeout(startTyping, delay);
        } else {
            startTyping();
        }

        // Cursor blink effect
        const cursorInterval = setInterval(() => {
            setIsCursorVisible((prev) => !prev);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(cursorInterval);
        };
    }, [text, speed, delay]);

    return (
        <span className={className}>
            {displayedText}
            <span className={`${isCursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100 ml-1`}>|</span>
        </span>
    );
};
