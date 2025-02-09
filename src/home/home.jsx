//import style from output.css of tailwind
import '../output.css';
import '../home/home.scss';
import React, { useEffect, useState, useRef } from 'react';
import Background from '../background/Background';
import { SparklesCore } from '../../components/ui/sparkles'
import AOS from 'aos';
import '../../node_modules/aos/dist/aos.css';
import '../../node_modules/animate.css';
import { motion } from "motion/react";
import FeatureCards from '../../components/ui/FeatureCards';
export default function Home() {
    useEffect(() => {
        AOS.init({
            duration: 1000
        });
    }, []);
    return (
        <>
            <Background></Background>
            <div className='home'>
                <h1 className="title animate__animated animate__fadeIn">
                    Flappy Bird Enhanced Edition
                </h1>
                <button
                    className='animate__animated animate__fadeIn'
                    onClick={() => window.location.href = '/game'}
                >
                    PLAY NOW!
                </button>
                <div className="bird-container">
                    <SparklesCore className="sparkles"
                        background="transparent"
                    />
                    <img src="src\assets\FlappyBird1.gif" alt="" />
                </div>  
                <FeatureCards></FeatureCards>
            </div>
        </>
    );
}
