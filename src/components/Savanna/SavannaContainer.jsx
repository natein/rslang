import { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import Savanna from './Savanna';
import styled, { StyleSheetManager } from 'styled-components';

function SavannaContainer() {
    useEffect(() => {}, []);

    return (
        <>
            <StyleSheetManager disableVendorPrefixes={process.env.NODE_ENV === 'development'}>
                <Savanna />
            </StyleSheetManager>
        </>
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SavannaContainer);
