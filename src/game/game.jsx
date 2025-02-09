import './game.scss';
import Background from '../background/Background';
import React, { useEffect, useState, useRef } from 'react';
import { FlipWords } from "../../components/ui/flip-words";
import { useSettings } from '../contexts/settingsContext';
import Pipe from './pipe';

// Move these outside the component

const jumpSound = new Audio('assets/game_assets/audio/jump.wav');
const windSound = new Audio('assets/game_assets/audio/windsound.mp3');
jumpSound.volume = 0.5;
windSound.volume = 0.5;
jumpSound.preload = 'auto';
windSound.preload = 'auto';
windSound.loop = true;
const Game = () => {
    const [started, setStarted] = useState(false); // Game has started (UI changes)
    const [gameActive, setGameActive] = useState(false); // Bird movement active
    const [score, setScore] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const [birdY, setBirdY] = useState(window.innerHeight / 3);
    const [lost, setLost] = useState(false);
    const [pipes, setPipes] = useState([]);
    const [currentFrame, setCurrentFrame] = useState(2); // Track current animation frame
    const [passedPipes, setPassedPipes] = useState(new Set()); // Track pipes we've already scored
    const [ignoreSpace, setIgnoreSpace] = useState(false); // Ignore space button for 1s after losing
    const [bestScore, setBestScore] = useState(0);
    const [scorePreviw, setScorePreview] = useState(score);
    const [playSound, setPlaySound] = useState(false);
    const { settings } = useSettings(); // Get settings from context

    const birdSkin = `assets/game_assets/Player/${settings.birdSkin}.png`;
    const bgStyle = `assets/game_assets/Background/${settings.background}.png`;
    const birdRef = useRef(null);
    const titleRef = useRef(null);
    const bgRef = useRef(null);
    const frameTimeoutRef = useRef(null); // For managing frame reset timeout
    const pipeId = useRef(0); // Track unique pipe IDs

    const pipeWidth = 60;
    let pipeGap = 160;
    let pipeSpeed = 3;
    let moveSpeed = 5;
    if (settings.difficulty === 1) {
        pipeGap = 160;
        moveSpeed = 5;
        pipeSpeed = 3;
    }
    else if (settings.difficulty === 2) {
        pipeGap = 150;
        moveSpeed = 6;
        pipeSpeed = 4;
    }
    else if (settings.difficulty === 3) {
        pipeGap = 150;
        moveSpeed = 9;
        pipeSpeed = 7;
    }
    const gravity = 0.8; // Adjusted for better physics
    const jumpVelocity = -12; // More responsive jump

    let ground = 0;
    //run once on start to play sound or not
    useEffect(() => {
        if (settings.sound) {
            setPlaySound(true);
        }
    }, []);
    // Handle frame animation based on bird state
    useEffect(() => {
        if (gameActive) {
            if (velocity < 0) {
                setCurrentFrame(1);
                if (frameTimeoutRef.current) {
                    clearTimeout(frameTimeoutRef.current);
                }
                frameTimeoutRef.current = setTimeout(() => {
                    setCurrentFrame(3);
                }, 200);
            } else if (velocity > 2) {
                setCurrentFrame(4);
            } else {
                setCurrentFrame(2);
            }
        } else {
            setCurrentFrame(2);
        }

        return () => {
            if (frameTimeoutRef.current) {
                clearTimeout(frameTimeoutRef.current);
            }
        };
    }, [velocity, gameActive]);

    // Start game on Enter
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter' && !started) {
                setStarted(true);
                titleRef.current.classList.add('animate__animated', 'animate__backOutLeft');
                setTimeout(() => {
                    titleRef.current.style.display = 'none';
                }, 500);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [started]);

    // Bird physics and game loop
    useEffect(() => {
        if (started) {
            ground = bgRef.current.clientHeight;

            const handleJump = (event) => {
                event.preventDefault();
                if ((event.key === ' ' || event.type === 'mousedown') && !ignoreSpace) {
                    setLost(false);

                    if (playSound) jumpSound.play();
                    if (!gameActive) {
                        setScore(0);
                        setGameActive(true);
                    }
                    setVelocity(jumpVelocity);
                }
            };

            const gameLoop = () => {
                if (gameActive) {
                    setVelocity((prevVelocity) => prevVelocity + gravity);
                    setBirdY((prevY) => Math.max(prevY + velocity, -20));
                }
            };

            window.addEventListener('keydown', handleJump);
            window.addEventListener('mousedown', handleJump);
            const interval = setInterval(gameLoop, 16);

            return () => {
                window.removeEventListener('keydown', handleJump);
                window.removeEventListener('mousedown', handleJump);
                clearInterval(interval);
            };
        }
    }, [started, gameActive, velocity, ignoreSpace]);

    // Background movement
    useEffect(() => {
        let animationFrameId;
        if (gameActive) {
            const moveBackground = () => {
                if (bgRef.current) {
                    bgRef.current.style.backgroundPositionX = `${parseFloat(bgRef.current.style.backgroundPositionX || 0) - moveSpeed}px`;
                    animationFrameId = requestAnimationFrame(moveBackground);
                }
            };
            moveBackground();
        }
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [gameActive, started]);

    // Handle collision (bird hits the ground)
    useEffect(() => {
        if (birdY >= ground && gameActive) {
            setBirdY(window.innerHeight / 3);
            setGameActive(false);
            setLost(true);
            setPipes([]);
            setBestScore(Math.max(score, bestScore));
            setIgnoreSpace(true);
            setTimeout(() => {
                setIgnoreSpace(false);
            }, 1000);
        }
    }, [birdY, gameActive, ground]);

    // Pipe generation and movement
    useEffect(() => {
        let pipeInterval;
        let moveInterval;

        const generatePipe = () => {
            const minPipeHeight = 80;
            const maxPipeHeight = bgRef.current.clientHeight - pipeGap - minPipeHeight;

            const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight)) + minPipeHeight;
            const bottomHeight = bgRef.current.clientHeight - (topHeight + pipeGap);

            if (bottomHeight < minPipeHeight || bottomHeight > maxPipeHeight) {
                return generatePipe();
            }

            setPipes((prevPipes) => [
                ...prevPipes,
                {
                    id: pipeId.current++,
                    x: bgRef.current.clientWidth + 10,
                    topHeight: topHeight,
                    bottomHeight: bottomHeight,
                },
            ]);
        };

        const movePipes = () => {
            setPipes((prevPipes) =>
                prevPipes
                    .map((pipe) => {
                        if (pipe.x + pipeWidth <= 0) {
                            const pipeElement = document.querySelector(`.pipe-${pipe.id}`);
                            if (pipeElement) {
                                pipeElement.classList.add('animate__animated', 'animate__fadeOut');
                            }
                        }
                        return {
                            ...pipe,
                            x: pipe.x - pipeSpeed,
                        };
                    })
                    .filter((pipe) => pipe.x + pipeWidth / 2 > 0)
            );
        };

        if (gameActive) {
            if (settings.difficulty < 3) {
                pipeInterval = setInterval(generatePipe, 1300); //generate pipe every 1.3s
            }
            else {
                pipeInterval = setInterval(generatePipe, 900); //generate pipe every .9s
            }
            moveInterval = setInterval(movePipes, 16);
        }

        return () => {
            clearInterval(pipeInterval);
            clearInterval(moveInterval);
        };
    }, [gameActive, started]);

    // Handle collision: bird hits the pipe + score increment
    useEffect(() => {
        if (gameActive) {
            const birdX = window.innerWidth * 0.15;
            const birdWidth = 10;
            const birdHeight = 25;

            pipes.forEach((pipe) => {
                if (
                    birdX + birdWidth > pipe.x &&
                    birdX < pipe.x + pipeWidth
                ) {
                    const birdBottom = birdY + birdHeight;
                    const bottomPipeTop = bgRef.current.clientHeight - pipe.bottomHeight;

                    if (
                        birdY < pipe.topHeight ||
                        birdBottom > bottomPipeTop - 30
                    ) {
                        setGameActive(false);
                        setLost(true);
                        setScorePreview(score);
                        setPipes([]);
                        setPassedPipes(new Set());
                        setBestScore(Math.max(score, bestScore));
                        setIgnoreSpace(true);
                        setTimeout(() => {
                            setIgnoreSpace(false);
                        }, 1000);
                    }
                }
                if (birdX > pipe.x + pipeWidth && !passedPipes.has(pipe.id)) {
                    setScore(prevScore => prevScore + 1);
                    setPassedPipes(prevPassed => {
                        const newPassed = new Set(prevPassed);
                        newPassed.add(pipe.id);
                        return newPassed;
                    });
                }
            });
        }
    }, [birdY, pipes, gameActive]);

    useEffect(() => {
        if (!gameActive) {
            setPassedPipes(new Set());
            setScore(0);
        }
    }, [gameActive]);
    //sound handling
    // In the game start logic
    useEffect(() => {
        if (gameActive && playSound) {
            windSound.currentTime = 0; // Restart wind sound
            windSound.play(); // Play wind sound when game starts
        }
    }, [gameActive]);

    // In the game over logic
    useEffect(() => {
        if (lost) {
            windSound.pause(); // Pause wind sound when game ends
        }
    }, [lost]);
    return (
        <div className="game">
            <Background />
            <div className='title' ref={titleRef}>
                <FlipWords
                    words={["Press Enter To Start", "Press Space To Play"]}
                    duration={1500}
                />
            </div>
            {started && (
                <div className='game_container animate__animated animate__backInRight' ref={bgRef}
                    style={{ backgroundImage: `url(${bgStyle})` }}
                >
                    <h3 className='score animate__animated animate__fadeIn animate__delay-1s'>Score: {score}</h3>

                    <div
                        ref={birdRef}
                        className={`bird frame-${currentFrame}`}
                        style={{ top: birdY, left: '15%', backgroundImage: `url(${birdSkin})` }}
                    />

                    {pipes.map((pipe, index) => (
                        <React.Fragment key={index}>
                            <Pipe
                                className={`pipe-${pipe.id}`}
                                x={pipe.x}
                                height={pipe.topHeight}
                                isTop={true}
                                type={'top'}
                            />
                            <Pipe
                                className={`pipe-${pipe.id}`}
                                x={pipe.x}
                                height={pipe.bottomHeight}
                                isTop={false}
                                type={'bottom'}
                            />
                        </React.Fragment>
                    ))}
                    {lost && (
                        <div className="gameOver animate__animated animate__fadeIn">
                            <h3>GAME OVER!</h3>
                            <p>Score: {scorePreviw}</p>
                            <p>Best Score: {bestScore}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Game;