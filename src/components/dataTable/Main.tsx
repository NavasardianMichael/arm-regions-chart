import { FC, useCallback, useState } from 'react';
import { useTypedDispatch } from 'hooks/useTypedDispatch';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { selectRegionsData } from 'store/regions/selectors';
import { T_RegionOptions, T_RegionsState } from 'store/regions/types';
import { setRegionOptions, setRegionsData } from 'store/regions/slice';
import { TextFormat } from './TextFormat';
import styles from './styles.module.css';
import Table, { ColumnsType } from 'antd/es/table';
import { Button } from 'antd';

export const DataTable: FC = () => {

    const dispatch = useTypedDispatch()
    const data = useTypedSelector(selectRegionsData)
    const [ isProcessedTable, setIsProcessedTable ] = useState(false)
    const [ hasError, setHasError ] = useState(false)
    const [ unProcessedText, setUnprocessedText ] = useState('');

    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
        const { name, value } = e.target
        const attrName = e.currentTarget.getAttribute('data-region-option-name') as keyof T_RegionOptions
        dispatch(setRegionOptions({
            id: name as T_RegionOptions['id'],
            [attrName]: value,
        }))
    }, [])

    const handleChange:  React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(e => {
        if(hasError) setHasError(false)
        setUnprocessedText(e.target.value)
    }, [])

    const handleCloseError = useCallback(() => {
        setHasError(false)
    }, [])

    const handleProcessTextData: React.MouseEventHandler<HTMLButtonElement> = () => {
        try {
            const rows = unProcessedText.trim().split('\n').filter(row => !!row)

            const state: any = {
                byId: {},
                allIds: []
            }
            const regionsState = rows.reduce((acc, row) => {
                const [text, value] = row.split('\t')
                if(!text && !value || isNaN(+value)) {console.log({text, value, row});
                return acc}
                const id = text.split(' ').join('').toLowerCase()
                acc.byId[id] = {
                    id,
                    text,
                    value: +value
                }
                acc.allIds.push(id)
                return acc
            }, state) as T_RegionsState

            dispatch(setRegionsData(regionsState))
            setIsProcessedTable(true)
        } catch {
            setHasError(true)
        }
    }
    
    if(!isProcessedTable) return (
        <>
            <TextFormat value={unProcessedText} onChange={handleChange} />
            <div className={styles.inputProcessButtons}>
                <Button disabled={!!unProcessedText} onClick={handleProcessTextData}>Process Tab Delimited Text</Button>
                <Button onClick={() => setIsProcessedTable(true)}>Skip to Table</Button>
            </div>
        </>
    )

    const columns: ColumnsType<any> = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
      ];

    return (
        <div className={styles.dataTable}>
            <Table columns={columns} />
        </div>
    )
}