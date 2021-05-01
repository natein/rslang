import { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core';

const styles = makeStyles(() => ({
    main: {
        display: 'contents',
    },
}));

const Loader = () => {
    return (
        <>
            <h2>Загрузка видео...</h2>
        </>
    );
};

const Video = () => {
    const [videoLoad, setVideoLoad] = useState(true);
    const classes = styles();
    const video = useRef();
    

    const handleIframeLoad = () => {
        setVideoLoad(false);
    };

    useEffect(() => {
        const frameVideo = video.current;
        frameVideo.addEventListener('load', handleIframeLoad);
        return () => {
            frameVideo.removeEventListener('load', handleIframeLoad);
        };
    }, []);

    return (
        <Box className={classes.main}>
            <iframe
                title={'title'}
                width="600px"
                height="350px"
                type="text/html"
                src={`https://www.youtube.com/embed/ZgHBVkXFEqE`}
                frameBorder="0"
                allow="accelerometer"
                autoPlay
                clipboard-write="true"
                encrypted-media="true"
                gyroscope="true"
                ref={video}
                picture-in-picture="true"
                allowFullScreen={true}
            ></iframe>
            {videoLoad ? <Loader /> : null}
        </Box>
    );
}

export default Video;
