import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { loadFriends, updateFriendship } from '../actions/actions';
import FriendshipsPending from '../components/friendships-pending';
import FriendshipsCurrent from '../components/friendships-current';
import FriendshipsBlocked from '../components/friendships-blocked';

class FriendsContainer extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
        // this.handleFriendshipChange = this.handleFriendshipChange.bind( this );
    }

    componentDidMount() {
        this.props.loadFriends();
    }

    handleFriendshipChange( toUserId, status ) {
        console.log('handleFriendshipChange', toUserId, status);
        const { updateFriendship, uid } = this.props;
        updateFriendship( uid, toUserId, status );
    }

    render() {
        console.log( 'FriendsContainer - RENDER - this.props: ', this.props );
        const { pendingFriendships, currentFriendships, blockedFriendships } = this.props;

        if ( !pendingFriendships && currentFriendships ) {
            return <div>Loading friendships...</div>;
        }

        return (
            <div>
                {
                    pendingFriendships &&
                    <FriendshipsPending
                        pendingFriendships={pendingFriendships}
                        handleFriendshipChange={
                            ( toUserId, status ) => this.handleFriendshipChange( toUserId, status )
                        }/>
                }
                {
                    currentFriendships &&
                    <FriendshipsCurrent
                        uidSelf={this.props.uid}
                        currentFriendships={currentFriendships}
                        handleFriendshipChange={
                            ( toUserId, status ) => this.handleFriendshipChange( toUserId, status )
                        }/>
                }
                {
                    blockedFriendships &&
                    <FriendshipsBlocked
                        blockedFriendships={blockedFriendships}
                        handleFriendshipChange={
                            ( toUserId, status ) => this.handleFriendshipChange( toUserId, status )
                        }/>
                }
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const mapStateToProps = ( state ) => {
    console.log( 'FriendsContainer - fn: mapStateToProps' );
    return {
        pendingFriendships: state.friends &&
            state.friends.filter( friend => friend.status === 'PENDING' ),
        currentFriendships: state.friends &&
            state.friends.filter( friend => friend.status === 'ACCEPTED' ),
        blockedFriendships: state.friends &&
            state.friends.filter( friend => friend.status === 'TERMINATED' || friend.status === 'CANCELED' )
    };
};

// Get actions and pass them as props to to FriendsContainer
const mapDispatchToProps = ( dispatch ) => ( {
    loadFriends: () => dispatch( loadFriends() ),
    updateFriendship: ( fromUserId, toUserId, status ) => dispatch( updateFriendship( fromUserId, toUserId, status ) )
} );

export default connect( mapStateToProps, mapDispatchToProps )( FriendsContainer );
