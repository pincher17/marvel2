import { connect } from 'react-redux';
import { setCharactersActionCreator, setPageActionCreator, setSearchActionCreator, setSortActionCreator, setAddFavoriteActionCreator, deleteFavoriteActionCreator } from '../../reducers/characters-reducer';
import Characters from './Characters';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { charactersApi } from '../../api/api';
import { setFetchingAC } from '../../reducers/spinner-reducer';

class CharactersAPI extends React.Component {

  componentDidMount() {

    this.props.setFetching(true)
    charactersApi.getCharacters(this.props.search, this.props.sort, this.props.page)
    .then(response => {
      this.props.setCharacters(response.data.results)
      this.props.setFetching(false)
    })

  }
  pageChange = (pageNumber) => {
    this.props.setPage(pageNumber);
    this.props.setFetching(true)
    charactersApi.getCharacters(this.props.search, this.props.sort, pageNumber)
    .then(response => {
      this.props.setCharacters(response.data.results)
      this.props.setFetching(false)
    })
  }

  sortChange = (sort) => {
    this.props.setPage(1);
    this.props.setSort(sort);
    this.props.setFetching(true)
    charactersApi.getCharacters(this.props.search, sort)
    .then(response => {
      this.props.setCharacters(response.data.results)
      this.props.setFetching(false)
    })
  
  }

  search = (value) => {
    this.props.setPage(1);
    this.props.setSearch(value);
    this.props.setFetching(true)
    charactersApi.getCharacters(value, this.props.sort)
    .then(response => {
      this.props.setCharacters(response.data.results)
      this.props.setFetching(false)
    })

  }


  render() {

    return (
      <Characters characters={this.props.characters} favorites={this.props.favorites} 
      pageChange={this.pageChange} page={this.props.page} sortChange={this.sortChange} 
      search={this.search} setAddFavorite={this.props.setAddFavorite} 
      deleteFavorite={this.props.deleteFavorite} searchValue={this.props.search} fetching={this.props.fetching} />
    )
  }
}

let mapStateToProps = (state) => {

  return {
    characters: state.characters.items,
    page: state.characters.page,
    sort: state.characters.sort,
    search: state.characters.search,
    favorites: state.characters.favorites,
    fetching: state.fetching.isFetching
  }

}

let mapDispatchToProps = (dispatch) => {

  return {
    setCharacters: (characters) => {
      dispatch(setCharactersActionCreator(characters))
    },
    setPage: (page) => {
      dispatch(setPageActionCreator(page))
    },
    setSort: (sort) => {
      dispatch(setSortActionCreator(sort))
    },
    setSearch: (search) => {
      dispatch(setSearchActionCreator(search))
    },
    setAddFavorite: (favoriteId) => {
      dispatch(setAddFavoriteActionCreator(favoriteId))
    },
    deleteFavorite: (favoriteId) => {
      dispatch(deleteFavoriteActionCreator(favoriteId))
    },
    setFetching: (fetching) => {
      dispatch(setFetchingAC(fetching))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CharactersAPI));

