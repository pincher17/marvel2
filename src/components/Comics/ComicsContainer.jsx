import { connect } from 'react-redux';
import Comics2 from './Comics2.jsx';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { getComicsThunk, sortChangeComicsThunk, searchComicsThunk, setAddFavorite, deleteFavorite } from '../../reducers/comics-reducer';


class ComicsContainer extends React.Component {

  componentDidMount() {

    this.props.getComicsThunk(this.props.search, this.props.sort, this.props.page)

  }

  render() {

    return (
      <Comics2 thunk={this.props.getComicsThunk} {...this.props} />
    )
  }
}

let mapStateToProps = (state) => {

  return {
    comics: state.comics.items,
    page: state.comics.page,
    sort: state.comics.sort,
    search: state.comics.search,
    favorites: state.comics.favorites,
    fetching: state.fetching.isFetching,
  }

}




export default connect(mapStateToProps, {getComicsThunk, sortChangeComicsThunk, 
  searchComicsThunk, setAddFavorite, deleteFavorite})(withRouter(ComicsContainer));

