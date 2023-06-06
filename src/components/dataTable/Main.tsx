import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC } from 'react';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { selectRegionsData } from '../../store/regions/selectors';
import { setRegionOptions } from '../../store/regions/slice';
import { T_RegionOptions } from '../../store/regions/types';
import styles from './styles.module.css';

export const DataTable: FC = () => {

    const data = useTypedSelector(selectRegionsData)
    const dispatch = useDispatch()

    const handleTextBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target
        const attrName = e.currentTarget.getAttribute('data-regionoptionname') as keyof T_RegionOptions
        dispatch(setRegionOptions({
            id: name as T_RegionOptions['id'],
            [attrName]: value,
        }))
    }

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
                                const { fill, text, value } = data.byId[id];
                                return (
                                    <TableRow key={id}>
                                        <TableCell>
                                            <input 
                                                name={id}
                                                data-regionoptionname='text'
                                                className={styles.text}
                                                defaultValue={text} 
                                                onBlur={handleTextBlur} 
                                                />
                                        </TableCell>
                                        <TableCell>
                                            <input 
                                                type='number' 
                                                data-regionoptionname='value'
                                                name={id}
                                                className={styles.value} 
                                                defaultValue={value}
                                                onBlur={handleTextBlur} 
                                                />
                                        </TableCell>
                                        <TableCell>
                                            <input 
                                                type="color"
                                                data-regionoptionname='fill' 
                                                name={id}
                                                defaultValue={fill} 
                                                onChange={handleTextBlur} 
                                            />
                                        </TableCell>
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