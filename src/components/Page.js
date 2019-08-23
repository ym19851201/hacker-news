import React from 'react'
import Spinner from './Spinner'
import style from './style'
const {useState} = React

const Page = (props) => {
  const links = props.items.map((item, i) => {
    const {id, url, title, kids} = item
    return <li key={i} style={style.listItem}><a href={item.url}>{item.title}</a></li>
  })

  const spinner = props.loading ?
    <Spinner height='25%' width='25%' viewBox='0 0 600 600' style={style.loading} /> 
    : null

  return <div style={{position: 'relative'}}>{spinner}<ul style={style.list}>{links}</ul></div>
}

export default Page
