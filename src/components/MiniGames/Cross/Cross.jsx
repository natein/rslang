import styled from 'styled-components';
import { Box } from '@material-ui/core/';
import { GAMES } from '../../../constants/index';

const Cross = styled(Box)`
    width: 20px;
    height: 20px;
    background-image: url(${GAMES.cross});
    background-size: cover;
    position: absolute;
    top: 27px;
    right: 27px;
    cursor: pointer;
`;


export default Cross