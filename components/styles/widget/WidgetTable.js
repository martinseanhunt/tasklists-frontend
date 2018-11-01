import styled from 'styled-components'

const WidgetTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  color: #9ea0a5;


  thead {
    width: 100%;
    font-size: 1.2rem;
    
    tr {
      height: 45px;
    }

    th {
      font-weight: 500;
      text-transform: uppercase;
    }
  }

  tr {
    border-bottom: 1px solid #EAEDF3;
  }

  td:first-child, th:first-child {
    padding-left: 30px;
  }

  td:last-child, th:last-child {
    padding-right: 30px;
  }

  td {
    padding: 25px 0;
  }

  .edit {
    font-size: 3.3rem;
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  strong {
    color: #3e3f42;
    font-weight: 500;
  }
`

export default WidgetTable