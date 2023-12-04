import { EXPORTED_FILE_NAME } from 'helpers/constants/chart'
import html2pdf from 'html2pdf.js/dist/html2pdf.min'

export const downloadSVG = (svgStr: string) => {
  const blob = new Blob([svgStr])
  const url = URL.createObjectURL(blob)

  const downloadLink = document.createElement('a')
  downloadLink.href = url
  downloadLink.download = EXPORTED_FILE_NAME + '.svg'
  downloadLink.click()
}

export const downloadPNG = (svgStr: string) => {
  const svgString = new XMLSerializer().serializeToString(document.getElementById('map') as Node)
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const DOMURL = window.URL || window.webkitURL || window
  const img = new Image()
  const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const url = DOMURL.createObjectURL(svg)

  img.src = url
  img.onload = function () {
    ctx.drawImage(img, 0, 0)
    const png = canvas.toDataURL('image/png')
    DOMURL.revokeObjectURL(png)
    const downloadLink = document.createElement('a')
    downloadLink.href = png
    downloadLink.download = EXPORTED_FILE_NAME
    downloadLink.click()
  }
}

export const downloadPDF = (svgStr: string) => {
  const opt = {
    margin: 0,
    filename: EXPORTED_FILE_NAME,
    image: { type: 'svg', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  }
  html2pdf().set(opt).from(svgStr).save()
}

export const generateRandomColor = () => {
  const x = Math.round(0xffffff * Math.random()).toString(16)
  const y = 6 - x.length
  const z = '000000'
  const z1 = z.substring(0, y)
  return '#' + z1 + x
}

export const generateRandomNumberInRange = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min))
}
