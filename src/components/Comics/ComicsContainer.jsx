import { connect } from 'react-redux';
import Comics2 from './Comics2.jsx';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { setComics,setPage, setSearch, setSort, setAddFavorite, deleteFavorite } from '../../reducers/comics-reducer';
import { comicsApi } from '../../api/api.js';
import { setFetchingAC } from '../../reducers/spinner-reducer.js';

class ComicsContainer extends React.Component {

  componentDidMount() {

    this.props.setFetching(true)

    comicsApi.getComics(this.props.search, this.props.sort, this.props.page)
    .then(response => {
      this.props.setComics(response.data.results)
      this.props.setFetching(false)
    })

  }
  pageChange = (pageNumber) => {
    this.props.setPage(pageNumber);
    this.props.setFetching(true)

    comicsApi.getComics(this.props.search, this.props.sort, pageNumber)
    .then(response => {
      this.props.setComics(response.data.results)
      this.props.setFetching(false)
    })
  }

  sortChange = (sort) => {
    this.props.setPage(1);
    this.props.setSort(sort);
    this.props.setFetching(true)
    comicsApi.getComics(this.props.search, sort)
    .then(response => {
      this.props.setComics(response.data.results)
      this.props.setFetching(false)
    })
  }

  search = (value) => {
    this.props.setPage(1);
    this.props.setSearch(value);
    this.props.setFetching(true)
    comicsApi.getComics(value, this.props.sort)
    .then(response => {
      this.props.setComics(response.data.results)
      this.props.setFetching(false)
    })
    
  }


  render() {

    return (
      <Comics2 comics={this.props.comics} favorites={this.props.favorites} 
      pageChange={this.pageChange} page={this.props.page} sortChange={this.sortChange} 
      search={this.search} setAddFavorite={this.props.setAddFavorite} 
      deleteFavorite={this.props.deleteFavorite} fetching={this.props.fetching} />
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

let mapDispatchToProps = (dispatch) => {

  return {
    setComics: (comics) => {
      dispatch(setComics(comics))
    },
    setPage: (page) => {
      dispatch(setPage(page))
    },
    setSort: (sort) => {
      dispatch(setSort(sort))
    },
    setSearch: (search) => {
      dispatch(setSearch(search))
    },
    setAddFavorite: (favoriteId) => {
      dispatch(setAddFavorite(favoriteId))
    },
    deleteFavorite: (favoriteId) => {
      dispatch(deleteFavorite(favoriteId))
    },
    setFetching: (fetching) => {
      dispatch(setFetchingAC(fetching))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ComicsContainer));

