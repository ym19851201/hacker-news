import React from 'react'

class Button extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    const {text, selected, disabled} = this.props
    return (
      <button onClick={this.handleClick.bind(this)} disabled={disabled} style={{backgroundColor: selected ? 'blue' : null}}>{text}</button>
    )
  }

  handleClick() {
    this.props.onClick(this.props.value)
  }
}

export default Button
