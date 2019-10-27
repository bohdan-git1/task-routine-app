import React from 'react'
import {connect} from 'react-redux'
import Styles from './Styles/CustomWebviewStyle'
import {WebView} from 'react-native'
import {getJSForVideoDimens, showMessage} from '../Lib/Utilities'
import {Actions as NavigationActions} from 'react-native-router-flux'
import AlertMessage from './AlertMessage'
import * as _ from 'lodash'
import {Metrics} from '../Themes'

class CustomWebview extends React.Component {
  state: {
    isLoading: boolean
  }

  onNavigationStateChange = (navState) => {
    this.setState({
      isLoading: navState.loading,
      scalesPageToFit: true
    })
    if (navState.title === "success") {
      // this.setState({ showModal: false, status: "Complete" });
    } else if (navState.title === "cancel") {
      // this.setState({ showModal: false, status: "Cancelled" });
    } else {
      return;
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      scalesPageToFit: true,
      isLoading: false,
      loadingError: false
    }
  }

  setScheme = (url) => {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = 'http://' + url
    }
    return url
  };

  componentDidMount () {
    const {isVideoUrl, title} = this.props
    if (isVideoUrl) {
      NavigationActions.refresh({hideNavBar: true})
    }
    if (title) {
      NavigationActions.refresh({title})
    }
  }

  render () {
    let {url, html, isVideoUrl} = this.props
    if (!isVideoUrl && !_.isEmpty(url)) {
      url = this.setScheme(url)
    }
    const contentInsets = isVideoUrl ? {top: 0, left: 0, bottom: 0, right: 0} : {top: 0, left: 10, bottom: 0, right: 5}
    return _.isEmpty(html) && _.isEmpty(url)
      ? <AlertMessage messageStyle={{marginBottom: Metrics.navBarHeight}}
        title={'Unable to load the page. Please try later.'}
        IconClass={null}
      /> : (
        <WebView
          onNavigationStateChange={this.onNavigationStateChange}
          source={html ? {html} : {uri: url}}
          injectedJavaScript={isVideoUrl ? getJSForVideoDimens() : ''}
          javaScriptEnabled
          contentInset={contentInsets}

          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          startInLoadingState
          onError={(e) => {
            showMessage(e.nativeEvent.description)
          }}
          style={Styles.webView} />
    )
  }
}
export default connect(null)(CustomWebview)
