import React from 'react';

import { InputLabel, MenuItem, FormHelperText, FormControl, Select } from '@material-ui/core';

function Difficulty({lvlTitle}) {
    const [difficultyLvl, setDifficultyLvl] = React.useState(3);

    const handleDifficultyChange = (event) => {
        setDifficultyLvl(event.target.value);
    };

    return (
        <FormControl>
            <InputLabel id="demo-simple-select-label">{lvlTitle}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={difficultyLvl}
                onChange={handleDifficultyChange}
            >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
            </Select>
        </FormControl>
    );
}

export default Difficulty;
