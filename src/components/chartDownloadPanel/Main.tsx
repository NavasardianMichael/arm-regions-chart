import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { jsPDF } from "jspdf"
import { FC, useState } from 'react'
import { renderToString } from 'react-dom/server';

import { T_ChartState } from '../../store/chart/types';
import { T_RegionsState } from '../../store/regions/types';
import { Chart } from '../chart/Main'
import styles from './styles.module.css'

type T_Props = {
    data: T_RegionsState,
    legendOptions: T_ChartState['legend']
}

export const ChartDownloadPanel: FC<T_Props> = ({ data, legendOptions }) => {
    
    const [assetType, setAssetType] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAssetType(event.target.value);
    };

    const generatePDF = () => {
        const svgMarkup = <Chart data={data} legendOptions={legendOptions} />;
        const svgStr = renderToString(svgMarkup);
        const report = new jsPDF('portrait','pt','a4');
        report.html(document.getElementById('chart') as HTMLElement).then(() => {
            console.log({report});
            report.save('report.pdf');
            
        });
    }

    const handleClick = () => {
        console.log({assetType});
        
        if(assetType === 'pdf') return generatePDF();

        const svgMarkup = <Chart data={data} legendOptions={legendOptions} />;
        const svgStr = renderToString(svgMarkup);
        const blob = new Blob([svgStr], { type: 'application/pdf' });
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
            <InputLabel id="demo-simple-select-label">Export Type</InputLabel>
            <Select
                size='small'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Export Type"
                value={assetType}
                onChange={handleChange}
            >
                <MenuItem value='svg'>SVG</MenuItem>
                <MenuItem value='png'>PNG</MenuItem>
                <MenuItem value='pdf'>PDF</MenuItem>
            </Select>
            </FormControl>            
            <button onClick={handleClick}>
                Download
            </button>
        </div>
    )
}