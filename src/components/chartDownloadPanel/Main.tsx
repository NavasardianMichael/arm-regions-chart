import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import { jsPDF } from 'jspdf';
import { FC } from 'react';
import { renderToString } from 'react-dom/server';

import { Chart } from 'components/chart/Main';
import { T_ChartState } from 'store/chart/types';
import { T_RegionsState } from 'store/regions/types';

import styles from './styles.module.css';

type T_Props = {
    data: T_RegionsState,
    chart: T_ChartState
}

export const ChartDownloadPanel: FC<T_Props> = ({ data, chart }) => {

    function main () {
        var svgString = new XMLSerializer().serializeToString(document.getElementById('map') as Node);
        var canvas = document.getElementById("canvas") as HTMLCanvasElement;
        var ctx = canvas.getContext("2d") as CanvasRenderingContext2D ;
        var DOMURL = window.URL || window.webkitURL || window;
        var img = new Image();
        var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
        var url = DOMURL.createObjectURL(svg);
        console.log({url});
        
        img.src = url;
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            var png = canvas.toDataURL("image/png");
            DOMURL.revokeObjectURL(png);
            const downloadLink = document.createElement('a');
            downloadLink.href = png;
            downloadLink.download = 'armenia-regions-chart.png';
            downloadLink.click();
            console.log(465465465);
            
        };


      }

      const handleDownloadPdf = async (svgMarkup: any) => {
        var opt = {
            margin:       0,
            filename:     'myfile.pdf',
            image:        { type: 'svg', quality: 1 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(svgMarkup).save();
      };

    const handleClick = () => {
        const svgMarkup = <Chart data={data} chart={chart} />;
        const svgStr = renderToString(svgMarkup);
        const blob = new Blob([svgStr]);
        const url = URL.createObjectURL(blob);
        
        // return handleDownloadPdf(svgStr)

        return main()

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