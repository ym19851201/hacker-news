import React from 'react'
import request from 'superagent'
import Button from './Button'
import Buttons from './Buttons'
import Page from './Page'
import Spinner from './Spinner'
import styles from './style'
const {useState, useEffect} = React

const getItem = async (id) => {
    return await request.get(await `https:\/\/hacker-news.firebaseio.com\/v0\/item\/${id}.json`)
}

const eachSlice = (array, limit) => {
    const pageCount = Math.ceil(array.length / limit)
    return [...Array(pageCount).keys()].map(p => array.slice(p * limit, (p + 1) * limit))
}

const Pagenation = (props) => {
//    this.handleClick = this.handleClick.bind(this)
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const {itemsPerPage, style, name, url, realtimeLoading} = props

  useEffect(async () => {
    setLoading(true)
    const res = await request.get(url).catch(e => null)
    const ids = !!res ? res.body : []

    if (realtimeLoading) {
      const itemRes = []
      for (let id of ids) {
        itemRes.push(await getItem(id).catch(e => null))
        const data = itemRes.filter(res => !!res && !!res.body).map(res => res.body)

        const slicedPages = eachSlice(data, itemsPerPage)
        setPages(slicedPages)
      }
      setLoading(false)
    } else {
      const itemRes = await Promise.all(ids.map(async (id) => await getItem(id).catch(e => null)))
      const data = itemRes.filter(res => !!res && !!res.body).map(res => res.body)

      const pages = eachSlice(data, itemsPerPage)
      setLoading(false)
      setPages(pages)
    }
  }, [setPages]);

  const pagenated = pages.map((page, i) => <Page items={page} loading={loading && page.length < itemsPerPage} />)

  const buttons = <Buttons number={pages.length} onClick={setCurrentPage} loading={loading} style={styles.pagenationButtons} />

  return (
    <div style={styles.pagenation}>
      <h2 style={styles.pagenationTitle}>{name}{loading ? <Spinner style={styles.pagenationTitleSpinner} viewBox='0 0 512 512' /> : null}</h2>
      {pagenated[currentPage]}
      {buttons}
    </div>
  )
}

Pagenation.defaultProps = {
  realtimeLoading: true,
  itemsPerPage: 20,
}

export default Pagenation
