import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import axios from "axios";
import { concatSeries } from 'async';
import { Button } from 'react-native';

export default class PopularMoviesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommend_data: {}
        }
    }

    time_convert = (num) => {
        var hours = Math.floor(num / 60)
        var minutes = num % 60
        return (
            `${hours} hrs ${minutes} mins`
        )
    }

    renderItem = ({ item, index }) => {
        return (
            <Card>
                <Text>{item.title}</Text>
                <Image
                    source={{ uri: item.poster_link }}
                    style={{ height: 50, width: 100 }}
                />
                <Text>{this.time_convert(item.duration)}</Text>

            </Card>
        )
    }


    getMovie = () => {
        const url = "http://localhost:5000/recommended-movies"
        axios.get(url).then((response) => {
            this.setState({ recommend_data: response.data })
        })
            .catch(error => {
                console.log(error.message)
            })

    }
    componentDidMount() {
        this.getMovie()
    }

    render() {

        if (Object.keys(this.state.recommend_data).length !== 0) {
            return (
                <View>
                    <View>
                        <Text style={styles.title}>Recommended Movie</Text>
                    </View>


                    <View>
                        <FlatList
                            data={this.state.recommend_data}
                            keyExtractor={(item, index) => (

                                index.toString()

                            )}
                            renderItem={this.renderItem}
                        />

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
        fontStyle: "Futura"

    },
    button: {
        backgroundColor: "blue",
        fontSize: 10,
        borderRadius: 10,
        marginBottom: 2,
        alignItems: 'center',
        marginTop: 10
    }
})