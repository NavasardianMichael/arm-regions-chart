import { RootState } from 'index'
import type { TypedUseSelectorHook } from 'react-redux'
import { useSelector } from 'react-redux'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector