import React from 'react';
import styled from 'styled-components';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { SECTIONS_EBOOK } from '../../../constants/index';

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

function Difficulty({ lvlTitle }) {
    const [difficultyLvl, setDifficultyLvl] = React.useState(2);

    const handleDifficultyChange = (event) => {
        setDifficultyLvl(event.target.value);
    };

    return (
        <DifficultyForm color="primary" variant="outlined">
            <DifficultyLabel>{lvlTitle}</DifficultyLabel>
            <DifficultySelect value={difficultyLvl} onChange={handleDifficultyChange} label={lvlTitle}>
                {SECTIONS_EBOOK.map((item) => {
                    return (
                        <MenuItem key={item.name} value={item.group}>
                            {item.group + 1}
                        </MenuItem>
                    );
                })}
            </DifficultySelect>
        </DifficultyForm>
    );
}

export default Difficulty;
