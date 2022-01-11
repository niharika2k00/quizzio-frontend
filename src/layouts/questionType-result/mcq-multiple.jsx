
import { useState, useEffect } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Typography, } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useTheme } from '@mui/styles';


const MCQMultiple = (props) => {

  const { questionId, options, userAnswer, correctAnswer } = props;
  const theme = useTheme();


  //  -------------------------------------------------------
  //      LOGIC FOR THE COLOR OF THE CORRECT AND WRONG 
  // --------------------------------------------------------
  const getBackgroundColor = (optionId) => {
    if (correctAnswer.includes(optionId) && userAnswer.includes(optionId))  //  returns Boolean
      return 'rgb(237, 247, 237)';

    else if (userAnswer.includes(optionId) && !correctAnswer.includes(optionId))
      return '#ffccd5';

    else if (!userAnswer.includes(optionId) && correctAnswer.includes(optionId))
      return 'rgb(237, 247, 237)';

    return theme.palette.background.default;
  }

  const getRedTick = (optionId) => {
    if (userAnswer.includes(optionId) && !correctAnswer.includes(optionId))
      return {
        color: pink[800], '&.Mui-checked': { color: pink[600] }   // Red CheckBox Tick 
      };
  }


  return (
    <>
      <Typography variant="subtitle2" style={{ fontWeight: 'bold', color: theme.palette.primary.grey, letterSpacing: "0.6px" }} >
        Your Answer
      </Typography>

      <FormGroup>
        {options.map((o) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!userAnswer ? userAnswer.includes(o.id) : false}
                sx={getRedTick(o.id)}
              />
            }
            label={o.data}
            style={{ backgroundColor: getBackgroundColor(o.id), width: "46%" }}
          />
        ))}
      </FormGroup>
    </>
  );
};

export default MCQMultiple;
