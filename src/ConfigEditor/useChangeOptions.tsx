import { useCallback } from 'react'
import type { PropelDataSourceOptions, PropelDataSourceSecureOptions } from 'types'
import type { EditorProps } from './types'

type OnChangeType = (value: string) => void

export function useChangeOptions (
  props: EditorProps,
  propertyName: keyof PropelDataSourceOptions
): OnChangeType {
  const { onOptionsChange, options } = props

  return useCallback(
    (event: string) => {
      onOptionsChange({
        ...options,
        jsonData: {
          ...options.jsonData,
          [propertyName]: event
        }
      })
    },
    [onOptionsChange, options, propertyName]
  )
}

export function useChangeSecureOptions (
  props: EditorProps,
  propertyName: keyof PropelDataSourceSecureOptions
): OnChangeType {
  const { onOptionsChange, options } = props

  return useCallback(
    (event: string) => {
      onOptionsChange({
        ...options,
        secureJsonData: {
          ...options.secureJsonData,
          [propertyName]: event
        }
      })
    },
    [onOptionsChange, options, propertyName]
  )
}

export function useResetSecureOption (
  props: EditorProps,
  propertyName: keyof PropelDataSourceSecureOptions
): () => void {
  const { onOptionsChange, options } = props

  return useCallback(
    () => {
      onOptionsChange({
        ...options,
        secureJsonFields: {
          ...options.secureJsonFields,
          [propertyName]: false
        },
        secureJsonData: {
          ...options.secureJsonData,
          [propertyName]: ''
        }
      })
    },
    [onOptionsChange, options, propertyName]
  )
}
