import { FC, useCallback, useState } from 'react';
import { useTypedDispatch } from 'hooks/useTypedDispatch';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { selectRegionsData } from 'store/regions/selectors';
import { T_RegionOptions, T_RegionsState } from 'store/regions/types';
import { setRegionOptions, setRegionsData } from 'store/regions/slice';
import { TextFormat } from './TextFormat';
import styles from './styles.module.css';
import Table, { ColumnsType } from 'antd/es/table';
import { Button, Flex, Input, notification } from 'antd';

export const DataTable: FC = () => {

    const dispatch = useTypedDispatch()
    const data = useTypedSelector(selectRegionsData)
    const [ isProcessedTable, setIsProcessedTable ] = useState(false)
    const [ hasError, setHasError ] = useState(false)
    const [ unProcessedText, setUnprocessedText ] = useState('');
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
      api.info({
        message: `Notification`,
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      });
    };

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
            <Flex className={styles.inputProcessButtons} style={{fontSize: 'var(--size-sm)'}}>
                <Button type='primary' disabled={!unProcessedText} onClick={handleProcessTextData}>Process Tab Delimited Text</Button>
                <Button type='primary' onClick={() => setIsProcessedTable(true)}>Skip to Table</Button>
            </Flex>
        </>
    )

    const columns: ColumnsType<T_RegionOptions> = [
        {
            key: 'name',
          title: 'Region Name',
          dataIndex: 'text',
          render: (value, record) => {
            return (
                    <Input 
                        name={record.id}
                        value={value}
                        data-region-option-name='text'
                        onChange={handleTextChange}
                    />
                )
            },
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (value, record) => {
                return (
                    <Input 
                        type='number'
                        name={record.id}
                        value={value}
                        data-region-option-name='value'
                        onChange={handleTextChange}
                    />
                )
            },            
        },
    ];

    const dataSource: T_RegionOptions[] = data.allIds.map((regionId) => data.byId[regionId])

    return (
        <div className={styles.dataTable}>
            <Table 
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                bordered 
            />
        </div>
    )
}