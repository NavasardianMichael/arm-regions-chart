import type { TypedUseSelectorHook } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from 'index'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
