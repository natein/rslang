import React from 'react';
import styled from 'styled-components';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { SECTIONS_EBOOK } from '../../../constants/index';
import PropTypes from 'prop-types';
import { GAMES } from '../../../constants/index';

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

function Difficulty({ setDifficulty = (f) => f, difficultyLvl }) {

    return (
        <DifficultyForm color="primary" variant="outlined">
            <DifficultyLabel>{GAMES.difficultyTitle}</DifficultyLabel>

            <DifficultySelect value={difficultyLvl} onChange={(e) => setDifficulty(e)} label={GAMES.difficultyTitle}>
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
    setDifficulty: PropTypes.func.isRequired,
    difficultyLvl: PropTypes.number,
};

export default Difficulty;
