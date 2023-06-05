import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC } from 'react'

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { selectRegionsData } from '../../store/regions/selectors';
import styles from './styles.module.css'

export const DataTable: FC = () => {

    const data = useTypedSelector(selectRegionsData)
console.log({data})
    return (
        <div className={styles.dataTable}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="chart data table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Color</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.allIds.map((id) => {
                                const { fill, text, value } = data.byId[id]
                                return (
                                    <TableRow
                                        key={id}
                                    >
                                        <TableCell>
                                            {text}
                                        </TableCell>
                                        <TableCell>
                                            {value}
                                        </TableCell>
                                        <TableCell align="right">{fill}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}