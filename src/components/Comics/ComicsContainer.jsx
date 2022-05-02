import { connect } from 'react-redux';
import Comics2 from './Comics2.jsx';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { getComicsThunk, sortChangeComicsThunk, searchComicsThunk, 
          setAddFavorite, deleteFavorite, setTotalPagesComics, 
          updateSearch, getComicsAutoCompleteThunk } from '../../reducers/comics-reducer';


class ComicsContainer extends React.Component {

  componentDidMount() {

    this.props.getComicsThunk(this.props.search, this.props.sort, this.props.pageSize, this.props.page)

  }

  render() {

    return (
      <Comics2 thunk={this.props.getComicsThunk} total={this.props.totalComics} 
      setTotalPages={this.props.setTotalPagesComics} {...this.props} />
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
    totalPages: state.comics.totalPages,
    totalComics: state.comics.totalComics,
    pageSize: state.comics.pageSize,
    autoComplete: state.comics.autoComplete,
  }

}




export default connect(mapStateToProps, {getComicsThunk, sortChangeComicsThunk, 
  searchComicsThunk, setAddFavorite, deleteFavorite, setTotalPagesComics, updateSearch,
  getComicsAutoCompleteThunk})(withRouter(ComicsContainer));

