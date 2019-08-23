const style = {
  list: {
    height: '80%',
    overflow: 'scroll',
    backgroundColor: 'rgb(240, 240, 240)',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
  },
  pagenation: {
    backgroundColor: 'rgba(220, 220, 220, 0.6)',
    height: '90%',
    maxWidth: '32%',
    margin: '3 3 10 3',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pagenationButtons: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  pagenationTitle: {
    position: 'relative',
    display: 'inline-block',
  },
  pagenationTitleSpinner: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    float: 'left',
  },
  listItem: {
    whiteSpace: 'nowrap',
  },
  loading: {
    position:'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
  }
}

export default style
