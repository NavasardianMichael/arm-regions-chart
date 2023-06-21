import { FC, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Chart } from '../chart/Main'
import { T_RegionsState } from '../../store/regions/types';
import { T_ChartState } from '../../store/chart/types';
import { renderToString } from 'react-dom/server';
import styles from './styles.module.css'

type T_Props = {
    data: T_RegionsState,
    legendOptions: T_ChartState['legend']
}

export const ChartDownloadPanel: FC<T_Props> = ({ data, legendOptions }) => {
    
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };

    const handleClick = () => {
        const svgMarkup = <Chart data={data} legendOptions={legendOptions} />;
        const svg = renderToString(svgMarkup);
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'armenia-regions-chart.svg';
        downloadLink.click();

        URL.revokeObjectURL(url);
    }

    return (
        <div className={styles.chartDownloadPanel}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                size='small'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value='svg'>SVG</MenuItem>
                <MenuItem value='png'>PNG</MenuItem>
                <MenuItem value='png'>PDF</MenuItem>
            </Select>
            </FormControl>            
            <button onClick={handleClick}>
                Download
            </button>
        </div>
    )
}