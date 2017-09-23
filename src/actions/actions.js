import axios from '../utils/axios';




export function logOutUser() {
    console.log( 'REDUX - ACTION - fn: logOutUser' );
    return axios.get( '/api/logout' )

        .then( result => {
            console.log( 'REDUX - ACTION - fn: logOutUser - data', result.data );
            if ( result.data.success ) {
                window.location.href = '/';
            }
        } )

        .catch( err => console.log( err ) );
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


export function loadUserData() {
    console.log( 'REDUX - ACTION - fn: loadUserData' );
    return axios.get( '/api/user' )
        .then( result => {
            console.log( 'REDUX - ACTION - fn: loadUserData - data', result.data );
            return {
                type: 'LOAD_USER_DATA',
                user: result.data.userData
            };

        } )

        .catch( err => {
            console.log( err );
            return { type: 'ERROR' };
        } );
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


export function updateProfilePic( formData ) {
    console.log( 'REDUX - ACTION - fn: updateProfilePic' );
    return axios.put( '/api/user/profile_pic', formData )

        .then( result => {
            if ( result.data.success ) {
                return {
                    type: 'UPDATE_USER_DATA',
                    user: result.data.userData
                };
            }
        } )

        .catch( err => console.log( err ) );

}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


export function loadFriends() {
    console.log( 'REDUX - ACTION - fn: loadFriends' );

    return axios.get( '/api/friends' )

        .then( result => {
            console.log( 'REDUX - ACTION - fn: loadFriends - data', result.data.friends );
            return {
                type: 'LOAD_FRIENDS',
                friends: result.data.friends
            };
        } )

        .catch( err => {
            console.log( err );
            return { type: 'ERROR' };
        } );
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function updateFriendship( fromUserId, toUserId, status ) {

    console.log( `REDUX - ACTION - fn: updateFriendship
        fromUserId: ${fromUserId},
        toUserId: ${toUserId},
        status: ${status}` );

    return axios.put( `/api/friends/${fromUserId}/${toUserId}`, { status: status } )

        .then( result => {
            console.log( 'REDUX - ACTION - fn: updateFriendship - data', result.data );
            return {
                type: 'UPDATE_FRIENDSHIP',
                status: result.data.status,
                fromUserId: result.data.fromUserId,
                toUserId: result.data.toUserId
            };
        } )

        .catch( err => {
            console.log( err );
            return { type: 'ERROR' };
        } );
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function connectLoggedInUser( socketId ) {
    console.log( 'REDUX - ACTION - fn: connectLoggedInUser' );
    return axios.post( `/ws/connected/${socketId}` )

        .then( () => { return { type: 'CONNECT_LOGGEDIN_USER' }; } )

        .catch( err => console.log( err ) );
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function createOnlineUsers( onlineUsers ) {
    console.log( 'REDUX - ACTION - fn: createOnlineUsers' );
    return {
        type: 'CREATE_ONLINE_USERS',
        onlineUsers
    };
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function addOnlineUser( userJoined ) {
    console.log( 'REDUX - ACTION - fn: addOnlineUser' );
    return {
        type: 'ADD_ONLINE_USER',
        userJoined
    };
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function removeOnlineUser( uid ) {
    console.log( 'REDUX - ACTION - fn: removeOnlineUser' );
    return {
        type: 'REMOVE_ONLINE_USER',
        uid
    };
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function createPublicMessageList( publicMessageList ) {
    console.log( 'REDUX - ACTION - fn: createPublicMessageList' );
    return {
        type: 'CREATE_PUBLIC_MESSAGE_LIST',
        publicMessageList
    };
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function createPrivateMessageList( privateMessageList ) {
    console.log( 'REDUX - ACTION - fn: createPrivateMessageList' );
    return {
        type: 'CREATE_PRIVATE_MESSAGE_LIST',
        privateMessageList
    };
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function addNewPublicMessage( newPublicMessage ) {
    console.log( 'REDUX - ACTION - fn: addNewPublicMessage' );
    return {
        type: 'ADD_NEW_PUBLIC_MESSAGE',
        newPublicMessage
    };
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function addNewPrivateMessage( newPrivateMessage ) {
    console.log( 'REDUX - ACTION - fn: addNewPrivateMessage', newPrivateMessage );
    return {
        type: 'ADD_NEW_PRIVATE_MESSAGE',
        newPrivateMessage
    };
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function persistOtherUid( otherUid ) {
    console.log( 'REDUX - ACTION - fn: persistOtherUid' );
    return {
        type: 'PERSIST_OTHER_UID',
        otherUid
    };
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
