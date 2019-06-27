import React from 'react'
import request from 'superagent'
import Spinner from './Spinner'
import List from './List'
import Select from './Select'

class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      groupBy: 'by'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    const {name} = this.props
    const {groupBy} = this.state
    const {names, options} = this.props

    return (
      <div>
        <h1>Hello {name}!</h1>
        <Select options={options} onChange={this.handleChange}/>
        <div style={{display: 'flex'}}>
          {names.map((obj, i) => <List key={i} groupBy={groupBy} {...obj}/>)}
        </div>
      </div>
    )
  }

  handleChange(value) {
    this.setState({groupBy: value})
  }
}

Hello.defaultProps = {
  options: [
    {name: '筆者', value: 'by'},
    {name: 'ID', value: 'id'},
    {name: 'Type', value: 'type'},
    {name: 'スコア', value: 'score'},
  ],
  names: [
    {name: '新着', url: 'https://hacker-news.firebaseio.com/v0/newstories.json'},
    {name: '人気', url: 'https://hacker-news.firebaseio.com/v0/topstories.json'},
    {name: 'ベスト', url: 'https://hacker-news.firebaseio.com/v0/beststories.json'},
  ],
}

export default Hello
