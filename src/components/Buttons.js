import React from 'react'
import Button from './Button'

class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onArrowClick = this.onArrowClick.bind(this)
    this.state = {
      selectedValue: 0,
    }
  }

  render() {
    const {number} = this.props
    const {selectedValue} = this.state
    const leftButton = (
      <Button
        text={'<'}
        value={-1}
        onClick={this.onArrowClick}
        disabled={selectedValue === 0}
      />
    )
    const rightButton = (
      <Button
        text={'>'}
        value={1}
        onClick={this.onArrowClick}
        disabled={selectedValue === number - 1}
      />
    )

    const buttons = [...Array(number).keys()].map((page, i) => {
      const props = {text: i + 1, value: i, onClick: this.onClick, selected: selectedValue === i}
      return <Button key={i} {...props} />
    })

    return <div style={this.props.style}>{leftButton}{buttons}{rightButton}</div>
  }

  onArrowClick(value) {
    const tmp = this.state.selectedValue + value
    const selectedValue = Math.min(Math.max(tmp, 0), this.props.number - 1)
    this.setValue(selectedValue)
  }

  onClick(value) {
    this.setValue(value)
  }

  setValue(value) {
    this.setState({selectedValue: value})
    this.props.onClick(value)
  }
}

Buttons.defaultProps = {
  selectedValue: 0,
}

export default Buttons
