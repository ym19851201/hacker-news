import React from 'react'
import request from 'superagent'
import Spinner from './Spinner'
import List from './List'
import Select from './Select'
import Pagenation from './Pagenation'
import style from './style'
const {useState} = React

const Hello = (props) => {
  const [groupBy, setGroupBy] = useState('by')
  const {name, names, options, } = props

  return (
    <div>
      <h1>Hello {name}!</h1>
      <Select options={options} onChange={(value) => {setGroupBy(value)}}/>
      <div style={style.container}>
        {names.map((name, i) => <Pagenation
          key={i}
          style={style.pagenation}
          {...name}
          />)}
      </div>
    </div>
  )
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
    {name: 'tmp', url: 'https://hacker-news.firebaseio.com/v0/beststories.json'},
  ],
}

export default Hello
