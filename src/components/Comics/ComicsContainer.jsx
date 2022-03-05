import { connect } from 'react-redux';
import Comics2 from './Comics2.jsx';
import * as axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { setComics,setPage, setSearch, setSort, setAddFavorite, deleteFavorite } from '../../reducers/comics-reducer';

class ComicsContainer extends React.Component {

  componentDidMount() {

    axios.get(`https://gateway.marvel.com/v1/public/comics?format=comic&${this.props.search === '' ? '' : `titleStartsWith=${this.props.search}`}&orderBy=${this.props.sort}&limit=8&offset=${(this.props.page - 1) * 8}&ts=1&apikey=bee04bdf1525b71dabcfedee5c7ad617&hash=9c56fc53e014b8e7f336c28a76203510`).then(response => {
      //debugger;
      this.props.setComics(response.data.data.results);
    })
  }
  pageChange = (pageNumber) => {
    debugger;
    this.props.setPage(pageNumber);
    //this.props.setSort(sort);
  
    axios.get(`https://gateway.marvel.com/v1/public/comics?format=comic&${this.props.search === '' ? '' : `titleStartsWith=${this.props.search}`}&orderBy=${this.props.sort}&limit=8&offset=${(pageNumber - 1) * 8}&ts=1&apikey=bee04bdf1525b71dabcfedee5c7ad617&hash=9c56fc53e014b8e7f336c28a76203510`).then(response => {
      //debugger;
      this.props.setComics(response.data.data.results);
      debugger;
    })
  }

  sortChange = (sort) => {
    this.props.setPage(1);
    this.props.setSort(sort);

    axios.get(`https://gateway.marvel.com/v1/public/comics?format=comic&${this.props.search === '' ? '' : `nameStartsWith=${this.props.search}`}&orderBy=${sort}&limit=8&offset=0&ts=1&apikey=bee04bdf1525b71dabcfedee5c7ad617&hash=9c56fc53e014b8e7f336c28a76203510`).then(response => {
      //debugger;
      this.props.setComics(response.data.data.results);
    })
  }

  search = (value) => {
    this.props.setPage(1);
    this.props.setSearch(value);
    
    if (value === '') {
      axios.get('https://gateway.marvel.com/v1/public/comics?format=comic&orderBy=title&limit=8&ts=1&apikey=bee04bdf1525b71dabcfedee5c7ad617&hash=9c56fc53e014b8e7f336c28a76203510').then(response => {
       
        this.props.setComics(response.data.data.results);
      })
    } else {
      axios.get(`https://gateway.marvel.com/v1/public/comics?format=comic&orderBy=title&titleStartsWith=${value}&limit=8&offset=0&ts=1&apikey=bee04bdf1525b71dabcfedee5c7ad617&hash=9c56fc53e014b8e7f336c28a76203510`).then(response => {
        
        this.props.setComics(response.data.data.results);
      })
    }

    
  }


  render() {
    let allPages = [];
    for (let i = 1; i <= 10; i++) {
      allPages.push(i);

    }
    return (
      <Comics2 comics={this.props.comics} favorites={this.props.favorites} pageChange={this.pageChange} page={this.props.page} sortChange={this.sortChange} search={this.search} setAddFavorite={this.props.setAddFavorite} deleteFavorite={this.props.deleteFavorite} />
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
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ComicsContainer));

