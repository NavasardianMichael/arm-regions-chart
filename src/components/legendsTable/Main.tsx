import { FC } from 'react';
import styles from './styles.module.css';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { selectChartLegendOptions } from '../../store/chart/selectors';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { addChartLegend, removeChartLegend, setChartLegendOptions } from '../../store/chart/slice';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { T_Legend } from '../../store/chart/types';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { makeid } from '../../helpers/functions/commons';

export const LegendsTable: FC = () => {

    const dispatch = useTypedDispatch()
    const legendOptions = useTypedSelector(selectChartLegendOptions) 

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.currentTarget
        const attrName = e.currentTarget.getAttribute('data-chartoptionname') as keyof T_Legend
        
        const action = {
            id: name,
            [attrName]: value
        }
        if(attrName === 'rangeStart' || attrName === 'rangeEnd') {
            const { rangeStart, rangeEnd } = legendOptions.byId[name]
            action.name = rangeStart + ' - ' + rangeEnd
        }
console.log({action});

        dispatch(setChartLegendOptions(action))
    }

    const handlePlusClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(addChartLegend({ id: makeid() }))
    }

    const handleRemoveClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        dispatch(removeChartLegend({ id: e.currentTarget.id }))
    }

    return (
        <div className={styles.legendTable}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="chart legend table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Range Start</TableCell>
                            <TableCell>Range End</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell sx={{marginLeft: 'auto'}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            legendOptions.allIds.map((legendOptionId) => {  
                                const { id, name, rangeStart, rangeEnd, color } = legendOptions.byId[legendOptionId];
                                
                                return (
                                    <TableRow key={id}>
                                        <TableCell>
                                            <input 
                                                name={id}
                                                data-chartoptionname='name'
                                                className={styles.name}
                                                value={name} 
                                                onChange={handleChange} 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <input 
                                                name={id}
                                                data-chartoptionname='rangeStart'
                                                className={styles.rangeStart}
                                                value={rangeStart}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <input 
                                                type='number' 
                                                data-chartoptionname='rangeEnd'
                                                name={id}
                                                className={styles.rangeEnd}
                                                value={rangeEnd}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <input 
                                                type="color"
                                                data-chartoptionname='color'
                                                className={styles.color} 
                                                name={id}
                                                value={color} 
                                                onChange={handleChange} 
                                            />
                                        </TableCell>
                                        <TableCell className={styles.removeLegendCell}>
                                            <IconButton onClick={handleRemoveClick} title='Remove Current Legend' id={id}>
                                                <RemoveCircleOutlineIcon color='error' />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <IconButton onClick={handlePlusClick} title='Add a New Legend'>
                <AddCircleOutlineRoundedIcon color='action' fontSize='large' />
            </IconButton>
        </div>
    )
}