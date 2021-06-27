import React from 'react'
import { Container, Icon, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import './styles.css'

const MainHeader = () => {
  return (
    <div className='header'>
      <Container className='header__content'>
        <Header as={Link} to='/' color='teal' style={{ margin: 0, width: 'max-content' }}>
          <Icon name='syringe' />

          <Header.Content>
            Carteira de Vacinação
          </Header.Content>
        </Header>

        <div className='header__link__wrapper'>
          <Button 
            as={Link} 
            to='/' 
            className="header__link"
          >
            Crianças
          </Button>

          <Button 
            as={Link} 
            to='/vacinas' 
            color='teal' 
            className='header__link'
          >
            Vacinas
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default MainHeader