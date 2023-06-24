import { FC } from 'react';
import { renderToString } from 'react-dom/server';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';
import { T_RegionsState } from 'store/regions/types';
import { T_ChartState } from 'store/chart/types';
import styles from './styles.module.css';
import { Chart } from 'components/chart/Main';

type T_Props = {
    data: T_RegionsState,
    chart: T_ChartState
}

export const ChartDownloadPanel: FC<T_Props> = ({ data, chart }) => {

    const handleClick = () => {
        const svgMarkup = <Chart data={data} chart={chart} />;
        const svgStr = renderToString(svgMarkup);
        const blob = new Blob([svgStr]);
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'armenia-regions-chart.svg';
        downloadLink.click();
    }

    return (
        <div className={styles.chartDownloadPanel}>           
            <IconButton onClick={handleClick} sx={{borderRadius: 1}}>
                <DownloadIcon sx={{marginTop: '6px', paddingRight: '6px'}} />
                <div>Download SVG</div>
            </IconButton>
        </div>
    )
}