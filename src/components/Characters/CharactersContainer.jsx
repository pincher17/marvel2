import { connect } from 'react-redux';
import { getCharactersThunk, setAddFavorite, deleteFavorite, sortChangeThunk, searchThunk } from '../../reducers/characters-reducer';
import Characters from './Characters';
import React from 'react';
import { withRouter } from 'react-router-dom';

class CharactersAPI extends React.Component {

  componentDidMount() {

    this.props.getCharactersThunk(this.props.search, this.props.sort, this.props.page)

  }

  render() {

    return (
      <Characters thunk={this.props.getCharactersThunk} {...this.props} />
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


export default connect(mapStateToProps, {getCharactersThunk, 
  setAddFavorite, deleteFavorite, 
  sortChangeThunk, searchThunk})(withRouter(CharactersAPI));

