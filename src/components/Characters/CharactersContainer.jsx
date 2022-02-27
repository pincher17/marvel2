import { connect } from 'react-redux';
import { setCharactersActionCreator, setPageActionCreator, setSearchActionCreator, setSortActionCreator, setAddFavoriteActionCreator, deleteFavoriteActionCreator } from '../../reducers/characters-reducer';
import Characters from './Characters';
import * as axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';

class CharactersAPI extends React.Component {

  componentDidMount() {

    axios.get('https://gateway.marvel.com/v1/public/characters?&orderBy=name&limit=8&offset=0&ts=1&apikey=bee04bdf1525b71dabcfedee5c7ad617&hash=9c56fc53e014b8e7f336c28a76203510').then(response => {
      //debugger;
      this.props.setCharacters(response.data.data.results);
    })
  }
  pageChange = (pageNumber) => {
    debugger;
    this.props.setPage(pageNumber);
    //this.props.setSort(sort);

    axios.get(`https://gateway.marvel.com/v1/public/characters?${this.props.search === '' ? '' : `nameStartsWith=${this.props.search}`}&orderBy=${this.props.sort}&limit=8&offset=${(pageNumber - 1) * 8}&ts=1&apikey=bee04bdf1525b71dabcfedee5c7ad617&hash=9c56fc53e014b8e7f336c28a76203510`).then(response => {
      //debugger;
      this.props.setCharacters(response.data.data.results);
    })
  }

  sortChange = (sort) => {
    this.props.setPage(1);
    this.props.setSort(sort);

    axios.get(`https://gateway.marvel.com/v1/public/characters?${this.props.search === '' ? '' : `nameStartsWith=${this.props.search}`}&orderBy=${sort}&limit=8&offset=0&ts=1&apikey=bee04bdf1525b71dabcfedee5c7ad617&hash=9c56fc53e014b8e7f336c28a76203510`).then(response => {
      //debugger;
      this.props.setCharacters(response.data.data.results);
    })
  }

  search = (value) => {
    this.props.setPage(1);
    this.props.setSearch(value);
    if (value === '') {
      axios.get('https://gateway.marvel.com/v1/public/characters?&orderBy=name&limit=8&offset=0&ts=1&apikey=bee04bdf1525b71dabcfedee5c7ad617&hash=9c56fc53e014b8e7f336c28a76203510').then(response => {
        //debugger;
        this.props.setCharacters(response.data.data.results);
      })
    } else {
      axios.get(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${value}&limit=8&offset=0&ts=1&apikey=bee04bdf1525b71dabcfedee5c7ad617&hash=9c56fc53e014b8e7f336c28a76203510`).then(response => {
        //debugger;
        this.props.setCharacters(response.data.data.results);
      })
    }

    //this.props.setSort(sort);
  }


  render() {
    let allPages = [];
    for (let i = 1; i <= 10; i++) {
      allPages.push(i);

    }
    return (
      <Characters characters={this.props.characters} favorites={this.props.favorites} pageChange={this.pageChange} page={this.props.page} sortChange={this.sortChange} search={this.search} setAddFavorite={this.props.setAddFavorite} deleteFavorite={this.props.deleteFavorite} />
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
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CharactersAPI));

