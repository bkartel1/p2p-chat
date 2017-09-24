// REACT
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

// REDUX
import { connect } from 'react-redux';
import { logOutUser, updateProfilePic, loadUserData } from '../actions/actions';

// SOCKETIO
import getSocket from '../utils/socketIo';

// MATERIAL-UI:
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

// ICONS
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialGroup from 'material-ui/svg-icons/social/group';
import SocialGroupAdd from 'material-ui/svg-icons/social/group-add';




// MY COMPONENTS
import Logo from '../components/logo';
import ProfilePic from '../components/profile-pic';
import ProfilePicUpload from '../components/profile-pic-upload';

class App extends Component {

    constructor( props ) {
        super( props );
        getSocket();
        this.state = {
            uploaderIsVisible: false,
            open: false,
            selectedIndex: null
        };
        this.showProfilePicUpload = this.showProfilePicUpload.bind( this );
    }

    componentDidMount() {
        console.log( 'App - fn: componentDidMount - this.props: ', this.props );
        this.props.loadUserData();
    }

    componentWillReceiveProps( nextProps ) {
        const { pathname } = nextProps.location;
        switch ( pathname ) {
        case '/online':
            this.setState( { selectedIndex: 0 } );
            break;
        case '/chat':
            this.setState( { selectedIndex: 1 } );
            break;
        case '/friends':
            this.setState( { selectedIndex: 2 } );
            break;
        case '/users':
            this.setState( { selectedIndex: 3 } );
            break;
        }
    }

    showProfilePicUpload( e ) {
        e.stopPropagation();
        console.log( 'App - fn: showProfilePicUpload' );
        this.setState( { uploaderIsVisible: true } );
    }

    hideProfilePicUpload( e ) {
        e.stopPropagation();
        console.log( 'App - fn: hideProfilePicUpload' );
        this.setState( { uploaderIsVisible: false } );
    }

    uploadProfilePic( e ) {
        console.log( 'App - fn: uploadProfilePic' );
        e.stopPropagation();
        const formData = new FormData;
        formData.append( 'file', e.target.files[ 0 ] );
        this.props.updateProfilePic( formData );
    }

    handleLogOut() {
        console.log( 'App - fn: handleLogOut' );
        this.props.logOutUser();
    }

    handleTouchTitle() {
        console.log( 'App - fn: handleTouchTitle' );
        browserHistory.push( '/' );
    }


    // DRAWER:
    handleToggle() {
        this.setState( { open: !this.state.open } );
    }

    handleClose() {
        this.setState( { open: false } );
    }

    // BOTTOM NAVIGATION
    handleNavigation( href ) {
        browserHistory.push( href );
        switch ( href ) {
        case '/online':
            this.setState( { selectedIndex: 0 } );
            break;
        case '/chat':
            this.setState( { selectedIndex: 1 } );
            break;
        case '/friends':
            this.setState( { selectedIndex: 2 } );
            break;
        case '/users':
            this.setState( { selectedIndex: 3 } );
            break;
        }
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    render() {
        console.log( 'App - RENDER - this.props: ', this.props );

        const { error, uploaderIsVisible } = this.state;


        const titleStyle = { cursor: 'pointer' };

        if ( !this.props.user ) {
            return null;
        }

        const {
            uid,
            firstName,
            lastName,
            email,
            bio,
            profilePic
        } = this.props.user;


        return (
            <div>
                <AppBar
                    title={<span style={titleStyle}>p2pChat</span>}
                    onTitleTouchTap={ () => this.handleTouchTitle() }
                    iconClassNameRight='muidocs-icon-navigation-expand-more'
                    iconElementRight={<FlatButton label="LogOut" />}
                    onRightIconButtonTouchTap={ () => this.handleLogOut() }
                    onLeftIconButtonTouchTap={ () => this.handleToggle() }>
                </AppBar>


                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label='Online Users'
                        icon={<ActionHome />}
                        onClick={ e => this.handleNavigation('/online')}/>
                    <BottomNavigationItem
                        label='Chat'
                        icon={<CommunicationChatBubble />}
                        onClick={ e => this.handleNavigation('/chat')}/>
                    <BottomNavigationItem
                        label='Friends'
                        icon={<SocialGroup />}
                        onClick={ e => this.handleNavigation('/friends')}/>
                    <BottomNavigationItem
                        label='Users'
                        icon={<SocialGroupAdd />}
                        onClick={ e => this.handleNavigation('/users')}/>
                </BottomNavigation>



                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={ open => this.setState( { open } )}>
                    <List>
                        <Subheader>User Data</Subheader>
                        <ListItem
                            primaryText={`${firstName} ${lastName}`}
                            leftAvatar={<Avatar src={profilePic} />}
                            rightIcon={<ActionInfo />}
                            onClick={ (e) => this.showProfilePicUpload(e) }
                        />
                    </List>
                    <Divider />
                    <Subheader>Navigation</Subheader>
                    <ListItem
                        primaryText="Online Users"
                        leftIcon={<ContentSend />}
                        onClick={ e => this.handleNavigation('/online')}/>
                    <ListItem
                        primaryText="Chat"
                        leftIcon={<CommunicationChatBubble />}
                        onClick={ e => this.handleNavigation('/chat')}/>
                    <ListItem
                        primaryText="Friends"
                        leftIcon={<CommunicationChatBubble />}
                        onClick={ e => this.handleNavigation('/friends')}/>

                </Drawer>




                {
                    uploaderIsVisible &&
                    <ProfilePicUpload
                        uploadProfilePic={ (e) => this.uploadProfilePic(e) }
                        hideProfilePicUpload={ (e) => this.hideProfilePicUpload(e) }/>
                }


                { error && <div>{ error }</div> }


                {this.props.children}


                <footer></footer>

            </div>
        );
    }

}
// REDUX - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const mapStateToProps = ( state ) => {
    console.log( 'App - fn: mapStateToProps' );
    return { user: state.user };
};

const mapDispatchToProps = ( dispatch ) => ( {
    loadUserData: () => dispatch( loadUserData() ),
    logOutUser: () => dispatch( logOutUser() ),
    updateProfilePic: ( formData ) => dispatch( updateProfilePic( formData ) )
} );

export default connect( mapStateToProps, mapDispatchToProps )( App );
