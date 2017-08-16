// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr

import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { SideMenuButton, SideMenuDrawer } from 'containers';
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import I18n from 'utils/i18n';

import type { NavigationState } from 'reducers/navigation';

import {
    FeedScreen,
    FeedSettingsScreen,
    LoginScreen,
    CommitScreen,
    RepositoryIssueScreen,
    RepositoryPullRequestScreen,
    ProfileScreen,
    RepositoryScreen,
    AboutScreen,
    AccountIssues,
    AccountPullRequests,
    HomeHeaderRight,
} from 'containers';

export const AppNavigator = StackNavigator(
    {
        Home: {
            screen: FeedScreen,
            navigationOptions: {
                headerLeft: <SideMenuButton />,
                headerRight: <HomeHeaderRight />
            }
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            }
        },
        Issue: {
            screen: RepositoryIssueScreen,
            navigationOptions: ({ navigation }) => {
                const params = navigation.state.params;

                return {
                    title: `${params.repo}#${params.number}`
                };
            },
        },
        PullRequest: {
            screen: RepositoryPullRequestScreen,
            navigationOptions: ({ navigation }) => {
                const params = navigation.state.params;

                return {
                    title: `${params.repo}#${params.number}`
                };
            },
        },
        Commit: {
            screen: CommitScreen,
            navigationOptions: {
                title: 'Commit overview'
            }
        },
        FeedSettings: {
            screen: FeedSettingsScreen,
            navigationOptions: {
                title: 'Feed Settings'
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: ({ navigation }) => {
                const params = navigation.state.params;

                return {
                    title: params.id ? params.id : 'Profile'
                };
            },
        },
        Repository: {
            screen: RepositoryScreen,
            navigationOptions: ({ navigation }) => {
                const params = navigation.state.params;

                return {
                    title: params.repo ? params.repo : 'Repository'
                };
            },
        },
        AccountIssues: {
            screen: AccountIssues,
            navigationOptions: {
                title: I18n.t('AccountIssues.Title'),
            },
        },
        AccountPullRequests: {
            screen: AccountPullRequests,
            navigationOptions: {
                title: I18n.t('AccountPullRequests.Title'),
            },
        },
        AboutScreen: {
            screen: AboutScreen,
            navigationOptions: {
                title: 'About',
            },
        },
    },
    {
        cardStyle: {
            backgroundColor: 'white'
        }
    }
);

type AppWithNavigationStateProps = {
    navigation: NavigationState,
    dispatch: Dispatch
};

class AppWithNavigationState extends React.Component<void, AppWithNavigationStateProps, void> {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const { dispatch, navigation } = this.props;

            if (navigation.index === 0) {
                return false;
            }

            dispatch(NavigationActions.back());

            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }

    render() {
        return (
            <SideMenuDrawer>
                <AppNavigator navigation={ addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.navigation,
                }) } />
            </SideMenuDrawer>
        );
    }
}

const mapStateToProps = state => ({
    navigation: state.navigation
});

export default connect(mapStateToProps)(AppWithNavigationState);
