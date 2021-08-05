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

    liked_movie = ()=>{
        const url = "http://localhost:5000/liked-movie"
        axios.post(url).then((response)=>{
            this.getMovie()
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    unliked_movie = ()=>{
        const url = "http://localhost:5000/unliked-movie"
        axios.post(url).then((response)=>{
            this.getMovie()
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    not_watch = ()=>{
        const url = "http://localhost:5000/did-not-watch-movie"
        axios.post(url).then((response)=>{
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
        var posterlink = "#"
        if (this.state.movie_details.posterlink) {
            posterlink = this.state.movie_details.posterlink

        }
        if(Object.keys(this.state.movie_details).length !== 0){
        return (
            <View>
                <View>
                    <Text>Movie-Recommendation</Text>
                </View>
                <View>
                    <Image
                        source={{ uri: posterlink }}
                        style={{ height: 50, width: 100 }}
                    />
                    <Text>
                        {this.state.movie_details.title}
                    </Text>

                    <Text>
                        duration :  {this.state.movie_details.duration}
                    </Text>

                    <Text>

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
                        onPress={this.not_watched}>
                        <Text style={styles.text}>NOT WATCHED</Text>
                    </TouchableOpacity>





                </View>


            </View>
        )
        }else{
            return(
                <View>
                    
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    text: {
        fontSize: 15
    },
    button: {
        backgroundColor: "blue"
    }
})