import styled from 'styled-components'

import Container from '../styles/grid/Container'
import Row from '../styles/grid/Row'
import Col from '../styles/grid/Col'

const SubHeader = props => (
  <SubHeaderOuter>
      <Container noPadd>
        <Row>
          <SubHeaderCol>
            {props.children ? props.children : (
              <>
              <div>
                <h2>{props.title}</h2>
              </div>

              {props.rightText && (
                <span>{props.rightText}</span>
              )}
              </>
            ) }
          </SubHeaderCol>
        </Row>
      </Container>
  </SubHeaderOuter>
)

const SubHeaderOuter = styled.div`
  border-bottom: 1px solid #eaedf3;
  margin-bottom: 10px;
`

const SubHeaderCol = styled(Col)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  h2 {
    font-weight: 500;
    color: #3e3f42;
    font-size: 1.8rem;
  }

  span {
    background: #fff;
    color: #3e3f42;
    border: solid 1px #eaedf3;
    font-weight: medium;
    padding: 10px 20px;
    border-radius: 20px;
  }
`

export default SubHeader