import { FC } from 'react';
import styles from './styles.module.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { selectChartLegendOptions } from '../../store/chart/selectors';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { setChartLegendOptions } from '../../store/chart/slice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { T_Legend } from '../../store/chart/types';

export const LegendsTable: FC = () => {

    const dispatch = useTypedDispatch()
    const legendOptions = useTypedSelector(selectChartLegendOptions) 

    const handleChange: React.FocusEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.currentTarget
        const attrName = e.currentTarget.getAttribute('data-chartoptionname') as keyof T_Legend
        console.log({attrName});
        
        dispatch(setChartLegendOptions({
            id: name,
            [attrName]: value
        }))
    }

    return (
        <div className={styles.legendTable}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="chart legend table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Range Start</TableCell>
                            <TableCell>Range End</TableCell>
                            <TableCell>Color</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            legendOptions.allIds.map((legendOptionId) => {  
                                const { id, rangeStart, rangeEnd, color } = legendOptions.byId[legendOptionId];
                                console.log({color});
                                
                                return (
                                    <TableRow key={id}>
                                        <TableCell>
                                            <input 
                                                name={id}
                                                data-chartoptionname='text'
                                                className={styles.text}
                                                defaultValue={rangeStart} 
                                                onBlur={handleChange} 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <input 
                                                type='number' 
                                                data-chartoptionname='value'
                                                name={id}
                                                className={styles.value} 
                                                defaultValue={rangeEnd}
                                                onBlur={handleChange} 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <input 
                                                type="color"
                                                data-chartoptionname='color'
                                                className={styles.color} 
                                                name={id}
                                                defaultValue={color} 
                                                onBlur={handleChange} 
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