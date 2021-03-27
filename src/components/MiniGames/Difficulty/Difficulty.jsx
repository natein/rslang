import React from 'react';
import styled from 'styled-components';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { SECTIONS_EBOOK } from '../../../constants/index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadWords } from '../../../actions/gamesActions';

const DifficultyForm = styled(FormControl)`
    min-width: 120px;
`;
const DifficultyLabel = styled(InputLabel)`
    color: white;
`;
const DifficultySelect = styled(Select)`
    color: white;
    fieldset {
        border-color: white;
    }
    svg {
        color: white;
    }
`;

function Difficulty({ lvlTitle, loadWords }) {
    const [difficultyLvl, setDifficultyLvl] = React.useState(2);

    const handleDifficultyChange = ({ target }) => {
        loadWords(target.value, 1);
        setDifficultyLvl(target.value);
    };

    return (
        <DifficultyForm color="primary" variant="outlined">
            <DifficultyLabel>{lvlTitle}</DifficultyLabel>
            <DifficultySelect value={difficultyLvl} onChange={handleDifficultyChange} label={lvlTitle}>
                {SECTIONS_EBOOK.map((item) => {
                    return (
                        <MenuItem key={item.name} value={item.group + 1}>
                            {item.group + 1}
                        </MenuItem>
                    );
                })}
            </DifficultySelect>
        </DifficultyForm>
    );
}

Difficulty.propTypes = {
    lvlTitle: PropTypes.string.isRequired,
    loadWords: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    loadWords: (group, page) => dispatch(loadWords(group, page)),
});

export default connect(null, mapDispatchToProps)(Difficulty);
