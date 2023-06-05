import type { TypedUseSelectorHook } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '..'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector