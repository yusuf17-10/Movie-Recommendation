import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import axios from "axios";
import { concatSeries } from 'async';
import { Button } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            movie_details: {}
        }
    }

    time_convert = (num) => {
        var hours = Math.floor(num / 60)
        var minutes = num % 60
        return (
            `${hours} hrs ${minutes} mins`
        )
    }

    liked_movie = () => {
        const url = "http://localhost:5000/liked-movie"
        axios.post(url).then((response) => {
            this.getMovie()
        })
            .catch(error => {
                console.log(error.message)
            })
    }

    unliked_movie = () => {
        const url = "http://localhost:5000/unliked-movie"
        axios.post(url).then((response) => {
            this.getMovie()
        })
            .catch(error => {
                console.log(error.message)
            })
    }
    not_watch = () => {
        const url = "http://localhost:5000/did-not-watch-movie"
        axios.post(url).then((response) => {
            this.getMovie()
        })
            .catch(error => {
                console.log(error.message)
            })
    }

    getMovie = () => {
        const url = "http://localhost:5000/get-movie"
        axios.get(url).then((response) => {
            var details = response.data.data
            details["duration"] = this.time_convert(details.duration)
            this.setState({ movie_details: details })
        })
            .catch(error => {
                console.log(error.message)
            })

    }
    componentDidMount() {
        this.getMovie()
    }

    render() {

        if (Object.keys(this.state.movie_details).length !== 0) {
            var posterlink = "#"
            if (this.state.movie_details.poster_link) {
                posterlink = this.state.movie_details.poster_link
                console.log(posterlink)
            }
            return (
                <View>
                    <View>
                        <Text style={styles.title}>Movie-Recommendation</Text>
                    </View>
                    <View>
                        <Image
                            source={{ uri: posterlink }}
                            style={{ height: 50, width: 100 }}
                        />
                        <Text style={styles.movie_description}>
                            {this.state.movie_details.title}
                        </Text>

                        <Text style={styles.movie_description}>
                            duration :  {this.state.movie_details.duration}
                        </Text>

                        <Text style={styles.movie_description}>

                            release_date:  {this.state.movie_details.release_date.split("-")[0]}
                        </Text>

                        <TouchableOpacity style={styles.button}
                            onPress={this.liked_movie}>
                            <Text style={styles.text}>LIKE</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.button}
                            onPress={this.unliked_movie}>
                            <Text style={styles.text}>UNLIKE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}
                            onPress={this.not_watch}>
                            <Text style={styles.text}>NOT WATCHED</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button2}
                            onPress={()=>{
                                this.props.navigation.navigate("AppTabnavigator")
                            }}>
                            <Text style={styles.text}>Recommendations</Text>
                        </TouchableOpacity>



                    </View>


                </View>
            )
        } else {
            return (
                <View>

                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    text: {
        fontSize: 15,
    },
    title: {
        fontSize: 30,
        marginLeft: 20,
        backgroundColor: "orange",
        borderRadius: 10,
        marginRight: 20,
        alignSelf: "center"
    },
    movie_description: {
        marginVertical: 5,
        fontSize: 20,
        alignItems: "center",
        alignSelf: "center",
    },
    button: {
        backgroundColor: "blue",
        fontSize: 10,
        borderRadius: 10,
        marginBottom: 2,
        alignItems: 'center',
        marginTop: 10
    },
    button2: {
        backgroundColor: "red",
        fontSize: 10,
        borderRadius: 10,
        marginBottom: 2,
        alignItems: 'center',
        marginTop: 10
    }
})