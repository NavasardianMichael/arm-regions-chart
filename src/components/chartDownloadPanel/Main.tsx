import { SelectChangeEvent } from '@mui/material/Select';
import { FC, useState } from 'react';
import { renderToString } from 'react-dom/server';

import { IconButton } from '@mui/material';
import { T_ChartState } from '../../store/chart/types';
import { T_RegionsState } from '../../store/regions/types';
import { Chart } from '../chart/Main';
import DownloadIcon from '@mui/icons-material/Download';
import styles from './styles.module.css';

type T_Props = {
    data: T_RegionsState,
    legendOptions: T_ChartState['legend']
}

export const ChartDownloadPanel: FC<T_Props> = ({ data, legendOptions }) => {

    const handleClick = () => {
        const svgMarkup = <Chart data={data} legendOptions={legendOptions} />;
        const svgStr = renderToString(svgMarkup);
        const blob = new Blob([svgStr], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'armenia-regions-chart.svg';
        downloadLink.click();

        // URL.revokeObjectURL(url);
    }

    return (
        <div className={styles.chartDownloadPanel}>           
            <IconButton onClick={handleClick}>
                <DownloadIcon sx={{marginTop: '6px', paddingRight: '6px'}} />
                <div>Download SVG</div>
            </IconButton>
        </div>
    )
}