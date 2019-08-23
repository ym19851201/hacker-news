import React from 'react';
import Spinner from './Spinner'
import request from 'superagent'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({links: []}, props)
  }

  async componentDidMount() {
    this.setState({loading: true})
    const res = await request.get(this.props.url).catch(e => null)
    const ids = !!res ? res.body.slice(0, 10) : []

    const itemRes = await Promise.all(ids.map(async (id) => await this.getItem(id).catch(e => null)))
    const data = itemRes.filter(res => !!res && !!res.body).map(res => res.body)
    const groupedByAuthor = Object.entries(this.constructor.groupBy(data, this.state.groupBy))

    this.setState({links: groupedByAuthor, loading: false})
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.groupBy !== prevProps.groupBy) {
      this.setState({loading: true})
      const flattened = Array.prototype.concat.apply([], this.state.links.map(([key, values]) => values))
      const links = Object.entries(this.constructor.groupBy(flattened, this.props.groupBy))
      this.setState({links, loading: false})
    }
  }

//  shouldComponentUpdate(nextProps, nextState) {
//    return nextProps.groupBy !== this.props.groupBy
//  }

  async getItem(id) {
    return await request.get(await `https:\/\/hacker-news.firebaseio.com\/v0\/item\/${id}.json`)
  }

  createLink(item, i, j) {
    const {id, url, title, kids} = item
//    const children = !!kids ? kids.map((kid, k) => 
//      <li key={`${i}-${j}-${k}`}>{kid}</li>
//    ) : null
    const children = null

    return (
      <li key={j}>
        <a href={url}>{title}</a>
          {!!children ? (
            <ul>
            {children}
            </ul>
          ) : null}
      </li>
    )
  }

  handleClick(e) {
    const sorted = this.state.links.sort(([key1, value1], [key2, value2]) => (key1 > key2) === this.state.ascend ? 1 : -1)
    this.setState({links: sorted, ascend: !this.state.ascend})
  }

  render() {
    if (this.state.loading) {
      return (<div>
        <h2>{this.props.name}</h2>
        <Spinner height='25%' width='25%' viewBox='0 0 600 600' />
      </div>)
    }

    const links = this.state.links.map(([key, items], i) => {
      const itemLinks = items.map((item, j) => {
        return this.createLink(item, i, j)
      })

      return (
        <li key={i}>
        {key}
          <ul>
            {itemLinks}
          </ul>
        </li>
      )
    })

    return (
      <div>
        <h2>{this.props.name}</h2>
        <div>
          <button onClick={this.handleClick.bind(this)}>sort</button>
          <ul>
            {links}
          </ul>
        </div>
      </div>
    )
  }

  static groupBy(array, groupKey) {
    return array.reduce((h, e) => {
      const key = e[groupKey]
      h[key] = h[key] || []
      h[key].push(e)
      return h
    }, {})
  }

  static eachSlice(array, dividedBy) {
    const unit = Math.floor(array.length / dividedBy)
    const divides = [...Array(dividedBy + 1).keys()]
    return divides.map(i => array.slice(unit * i, unit * (i + 1))).filter(l => l.length > 0)
  }

  static eachSlice2(array, max) {
    const number = Math.ceil(array.length / max)
    const units = [...Array(number).keys()]
    return units.map(i => array.slice(i * max, (i + 1) * max))
  }
}

List.defaultProps = {
  ascend: true,
  groupBy: 'by',
  loading: false,
}
export default List
