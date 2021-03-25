import { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import Savanna from './Savanna';
import { openCrossModal } from '../../../actions/gamesActions';
import styled, { StyleSheetManager } from 'styled-components';

function SavannaContainer({ crossModalOpen }) {
    return (
        <>
            <StyleSheetManager disableVendorPrefixes={process.env.NODE_ENV === 'development'}>
                <Savanna crossModalOpen={crossModalOpen} />
            </StyleSheetManager>
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    crossModalOpen: () => dispatch(openCrossModal()),
});

export default connect(null, mapDispatchToProps)(SavannaContainer);
