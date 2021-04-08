import PropTypes from 'prop-types';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { Button, makeStyles } from '@material-ui/core';
import { common } from '@material-ui/core/colors';
import { useState } from 'react';

const styles = makeStyles(() => ({
    fullscreen: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: common.white,
        margin: 0,
        marginRight: '30px',
        marginTop: '15px',
        padding: 0,
        minWidth: 'auto',
    },
}));

const FullScreen = ({ reference }) => {
    const classes = styles();
    const [isFullscreen, setIsFullscreen] = useState(false);

    const onFullScreen = () => {
        if (!!document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);
        } else {
            reference.current.requestFullscreen();
            setIsFullscreen(true);
        }
    };

    return (
        <Button className={classes.fullscreen} onClick={onFullScreen}>
            {!isFullscreen ? <FullscreenIcon fontSize="large" /> : <FullscreenExitIcon fontSize="large" />}
        </Button>
    );
};

FullScreen.propTypes = {
    reference: PropTypes.object.isRequired,
};

export default FullScreen;
