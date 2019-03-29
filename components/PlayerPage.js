// import React from 'react'
// import {
//   Text,
//   View
// } from 'react-native'

// export default class PlayerPage extends React.Component {
//   render () {
//     return (
//       <View>
//         <Text>
//           PlayerPage
//         </Text>
//       </View>
//     )
//   }
// }

import React, { Component } from 'react';
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import Slider from 'react-native-slider';
import { Asset, Audio, Font } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFFFFF';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = 'Loading...';
const BUFFERING_STRING = 'Buffering...';
const RATE_SCALE = 3.0;

export default class App extends Component {
  constructor(props) {
		super(props);
		this.index = 0;
		this.isSeeking = false;
		this.shouldPlayAtEndOfSeek = false;
		this.playbackInstance = null;
		this.state = {
			playbackInstanceName: LOADING_STRING,
			playbackInstancePosition: null,
			playbackInstanceDuration: null,
			shouldPlay: false,
			isPlaying: false,
			isBuffering: false,
			isLoading: true,
			fontLoaded: false,
			volume: 1.0,
			rate: 1.0,
			portrait: null,
		};
  }
  
  render() {
    return (
			<View style={styles.container}>
				<View style={styles.portraitContainer}>
					
				</View>
				<View style={styles.detailsContainer}>
					<Text>
						{this.state.playbackInstanceName}
					</Text>
					<Text>
						{this.state.isBuffering ? (
							BUFFERING_STRING
						) : (
							this._getTimestamp()
						)}
					</Text>
				</View>
				<View
					style={[
						styles.buttonsContainerBase,
						styles.buttonsContainerTopRow,
						{
							opacity: this.state.isLoading
								? DISABLED_OPACITY
								: 1.0,
						},
					]}
				>
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onBackPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<MaterialIcons
								name="fast-rewind"
								size={40}
								color="#56D5FA"
							/>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onPlayPausePressed}
						disabled={this.state.isLoading}
					>
						<View>
							{this.state.isPlaying ? (
								<MaterialIcons
									name="pause"
									size={40}
									color="#56D5FA"
								/>
							) : (
								<MaterialIcons
									name="play-arrow"
									size={40}
									color="#56D5FA"
								/>
							)}
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onStopPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<MaterialIcons
								name="stop"
								size={40}
								color="#56D5FA"
							/>
						</View>
					</TouchableHighlight>
					<TouchableHighlight
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onForwardPressed}
						disabled={this.state.isLoading}
					>
						<View>
							<MaterialIcons
								name="fast-forward"
								size={40}
								color="#56D5FA"
							/>
						</View>
					</TouchableHighlight>
				</View>
				<View
					style={[
						styles.playbackContainer,
						{
							opacity: this.state.isLoading
								? DISABLED_OPACITY
								: 1.0,
						},
					]}
				>
					<Slider
						style={styles.playbackSlider}
						value={this._getSeekSliderPosition()}
						onValueChange={this._onSeekSliderValueChange}
						onSlidingComplete={this._onSeekSliderSlidingComplete}
						thumbTintColor="#000000"
						minimumTrackTintColor="#4CCFF9"
						disabled={this.state.isLoading}
					/>
				</View>
				<View
					style={[
						styles.buttonsContainerBase,
						styles.buttonsContainerMiddleRow,
					]}
				>
					<View style={styles.volumeContainer}>
						<View>
							<MaterialIcons
								name="volume-down"
								size={40}
								color="#56D5FA"
							/>
						</View>
						<Slider
							style={styles.volumeSlider}
							value={1}
							onValueChange={this._onVolumeSliderValueChange}
							thumbTintColor="#000000"
							minimumTrackTintColor="#4CCFF9"
						/>
						<View>
							<MaterialIcons
								name="volume-up"
								size={40}
								color="#56D5FA"
							/>
						</View>
					</View>
				</View>
				<View
					style={[
						styles.buttonsContainerBase,
						styles.buttonsContainerBottomRow,
					]}
				>
					<View>
						<MaterialIcons
							name="call-received"
							size={40}
							color="#56D5FA"
						/>
					</View>
					<Slider
						style={styles.rateSlider}
						value={this.state.rate / RATE_SCALE}
						onSlidingComplete={this._onRateSliderSlidingComplete}
						thumbTintColor="#000000"
						minimumTrackTintColor="#4CCFF9"
					/>
					<View>
						<MaterialIcons
							name="call-made"
							size={40}
							color="#56D5FA"
						/>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: BACKGROUND_COLOR,
	},
	portraitContainer: {
		marginTop: 80,
	},
	portrait: {
		height: 200,
		width: 200,
	},
	detailsContainer: {
		height: 40,
		marginTop: 40,
		alignItems: 'center',
	},
	playbackContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
	},
	playbackSlider: {
		alignSelf: 'stretch',
		marginLeft: 10,
		marginRight: 10,
	},
	text: {
		fontSize: FONT_SIZE,
		minHeight: FONT_SIZE,
	},
	buttonsContainerBase: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	buttonsContainerTopRow: {
		maxHeight: 40,
		minWidth: DEVICE_WIDTH / 2.0,
		maxWidth: DEVICE_WIDTH / 2.0,
	},
	buttonsContainerMiddleRow: {
		maxHeight: 40,
		alignSelf: 'stretch',
		paddingRight: 20,
	},
	volumeContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		minWidth: DEVICE_WIDTH - 40,
		maxWidth: DEVICE_WIDTH - 40,
	},
	volumeSlider: {
		width: DEVICE_WIDTH - 80,
	},
	buttonsContainerBottomRow: {
		alignSelf: 'stretch',
	},
	rateSlider: {
		width: DEVICE_WIDTH - 80,
	},
});