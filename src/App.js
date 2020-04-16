import React, { useState, useEffect } from "react";

import api from "./services/api";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Picker,
} from "react-native";



export default function App() {

  const [repositories, setRepositories] = useState([]);


  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    })
  }, [])


  async function handleAddRepository(){
    const res = await api.post('/repositories', {
      title: "Frontend app",
      techs: ["ReactJS", "React Native"],
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);

  }


  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    const response = await api.post(`/repositories/${id}/like`);

    const liked = response.data;



    const updatedRepository = repositories.map(repository => {
      if(repository.id === id){
        return liked;
      }else{
        return repository;
      }
    });

    setRepositories(updatedRepository);
   

  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
            <>
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>
                {repository.techs.map(tech =>
                  <Text key={tech} style={styles.tech}>
                    {tech}
                  </Text>
                )}

              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
        </View>

          </>
          )}
        />
          
        </View>

        <View style={styles.container}>
          <TouchableOpacity
          style={styles.buttonAdd}
          onPress={handleAddRepository}
          >
            <Text style={styles.buttonAddText}>Add Repository</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 40,
    
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },

  buttonAdd: {
    margin: 20,
    alignItems: "center",
    
  
  },

  buttonAddText: {
    width: 150,
    height: 50,
    backgroundColor: "#FFF",
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 12,
    fontFamily: "Fira Code",
    fontWeight: "bold",
    borderRadius: 4,
  }
});