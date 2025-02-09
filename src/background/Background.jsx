import React, { useEffect, useState } from 'react';
import './Background.scss';
const Background = () => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        // Create initial elements
        const initialElements = [
            // Cubes
            ...Array(15).fill().map((_, i) => ({
                id: `cube-${i}`,
                type: 'cube',
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 20 + 10,
                rotation: Math.random() * 360,
                speed: Math.random() * 10 + 5,
                direction: Math.random() > 0.5 ? 1 : -1
            })),
            // Birds
            ...Array(8).fill().map((_, i) => ({
                id: `bird-${i}`,
                type: 'bird',
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 15 + 10,
                speed: Math.random() * 8 + 4
            })),
            // Coins
            ...Array(12).fill().map((_, i) => ({
                id: `coin-${i}`,
                type: 'coin',
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 12 + 8,
                rotation: Math.random() * 360
            }))
        ];
        setElements(initialElements);
    }, []);

    return (
        <div className="bg fixed inset-0 bg-gradient-to-b from-blue-900 via-blue-600 to-blue-400 overflow-hidden">
            {/* Animated grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24px,rgba(0,0,0,0.1)_25px),linear-gradient(90deg,transparent_24px,rgba(0,0,0,0.1)_25px)] bg-[size:25px_25px] animate-[moveGrid_20s_linear_infinite]" />

            {/* Floating elements */}
            {elements.map((element) => {
                switch (element.type) {
                    case 'cube':
                        return (
                            <div
                                key={element.id}
                                className="absolute transform-gpu animate-float"
                                style={{
                                    left: `${element.x}%`,
                                    top: `${element.y}%`,
                                    width: `${element.size}px`,
                                    height: `${element.size}px`,
                                    animation: `float ${element.speed}s infinite ease-in-out, 
                             rotate ${element.speed * 2}s infinite linear`,
                                    perspective: '1000px'
                                }}
                            >
                                <div className="relative w-full h-full transform-gpu rotate-45 animate-spin-slow">
                                    <div className="absolute inset-0 bg-blue-200 opacity-20 border-2 border-blue-300" />
                                    <div className="absolute inset-0 bg-blue-300 opacity-30 transform translate-z-8" />
                                </div>
                            </div>
                        );

                    case 'bird':
                        return (
                            <div
                                key={element.id}
                                className="absolute animate-bird"
                                style={{
                                    left: `${element.x}%`,
                                    top: `${element.y}%`,
                                    width: `${element.size}px`,
                                    height: `${element.size}px`,
                                    animation: `birdFloat ${element.speed}s infinite ease-in-out`
                                }}
                            >
                                <div className="w-full h-full bg-blue-200 rounded-full opacity-60 animate-pulse" />
                            </div>
                        );

                    case 'coin':
                        return (
                            <div
                                key={element.id}
                                className="absolute animate-spin-slow"
                                style={{
                                    left: `${element.x}%`,
                                    top: `${element.y}%`,
                                    width: `${element.size}px`,
                                    height: `${element.size}px`,
                                    animation: `spin ${Math.random() * 4 + 2}s infinite linear`
                                }}
                            >
                                <div className="w-full h-full rounded-full border-4 border-yellow-300 opacity-40" />
                            </div>
                        );

                    default:
                        return null;
                }
            })}

            {/* Particle overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(0,0,255,0.1)_70%)]" />
        </div>
    );
};

export default Background;