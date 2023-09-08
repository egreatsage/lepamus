import { Container } from '@chakra-ui/react'
import React from 'react'

const FormContainer = ({children}) => {
  return (
    <Container>
        {children}
    </Container>
  )
}

export default FormContainer