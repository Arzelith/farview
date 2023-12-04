import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'

const FormikValueObserver = ({ onChange }) => {
  const { values, initialValues } = useFormikContext()

  useEffect(() => onChange(values), [values])

  return null
}

export default FormikValueObserver