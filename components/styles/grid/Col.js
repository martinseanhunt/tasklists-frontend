import styled from 'styled-components'

const Col = styled.div`
  margin: 0 25px 0 30px;
  flex: 1;
  
  ${({marginBottom}) => marginBottom && `
    margin-bottom: 20px;
  `}

  ${({division}) => division === 'halves' && `
    flex-basis: calc(50% - 30px);
    width: calc(50% - 30px);
    flex-shrink: 0;
    flex-grow: 0;
  `}

  ${({division}) => division === 'fourths' && `
    flex-basis: calc(25% - 30px);
    width: calc(25% - 30px);
    flex-shrink: 0;
    flex-grow: 0;
  `}

  ${({division}) => division === 'thirds' && `
    flex-basis: calc(33.3% - 30px);
    width: calc(33.3% - 30px);
    flex-shrink: 0;
    flex-grow: 0;
  `}

${({sidebar}) => sidebar && `
    border-left: 1px solid #eee;
    margin: 0 25px 0 0;
    padding-left: 30px;
    flex-basis: calc(33.3% - 30px);
    width: calc(33.3% - 30px);
    flex-shrink: 0;
    flex-grow: 0;
  `}

`

export default Col