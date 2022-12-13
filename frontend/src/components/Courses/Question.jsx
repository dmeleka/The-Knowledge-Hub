import React, { useEffect, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';

// const question = {
//   title: 'What is the capital of France?',
//   imageURL:
//     'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png',
//   choices: ['Paris', 'London', 'Berlin', 'Rome'],
//   answer: 0,
//   number: 1,
// };

const useStyles = makeStyles((theme) => ({
    choice: {
        width: '100%',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
    },
}));

function Question({ title, imageURL, choices, number, onSolved }) {
    const [value, setValue] = useState(null);
    const classes = useStyles();

    const handleChange = (event) => {
        onSolved(event.target.value);
        setValue(event.target.value);
    };

    useEffect(() => {
        setValue(null);
    }, [number]);

    return (
        <div>
            <FormControl component='fieldset'>
                <FormLabel
                    style={{ fontSize: '1.5rem', fontWeight: '600', color: 'black' }}
                    component='legend'
                >
                    {number}. {title}
                </FormLabel>
                <RadioGroup value={value ? value : ''} onChange={handleChange}>
                    {choices.map((choice, index) => {
                        return (
                            <FormControlLabel
                                key={index}
                                value={choices[index]}
                                control={<Radio />}
                                label={choice}
                                className={classes.choice}
                            />
                        );
                    })}
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default Question;