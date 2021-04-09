import React from 'react';
import Box from '@material-ui/core/Box';

const Loader = () => {
    return (
        <>
            <h2>Загрузка видео...</h2>
        </>
    );
};

export default class Video extends React.Component {
    state = {
        videoIsLoading: true,
    };

    componentDidMount() {
        this.video.addEventListener('load', this.handleIframeLoad);
    }
    componentWillUnmount() {
        this.video.removeEventListener('load', this.handleIframeLoad);
    }

    handleIframeLoad = () => {
        this.setState({
            videoIsLoading: false,
        });
    };

    render() {
        return (
            <Box>
                <iframe
                    title={'title'}
                    width="600px"
                    height="350px"
                    type="text/html"
                    src={`https://www.youtube.com/embed/ODUbvMV606I`}
                    frameBorder="0"
                    allow="accelerometer"
                    autoPlay
                    clipboard-write="true"
                    encrypted-media="true"
                    gyroscope="true"
                    ref={(frame) => (this.video = frame)}
                    picture-in-picture="true"
                    allowFullScreen={true}
                ></iframe>
                {this.state.videoIsLoading ? <Loader /> : null}
            </Box>
        );
    }
}
