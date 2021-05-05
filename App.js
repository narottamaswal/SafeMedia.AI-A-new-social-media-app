import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, FlatList, Text} from 'react-native';
import ItemBox from './ItemBox';

const data = [
  {id: '1', name: 'Narottam'},
  {id: '2', name: 'Nitin'},
  {id: '3', name: 'C'},
  {id: '4', name: 'D'},
  {id: '5', name: 'E'},
  {id: '6', name: 'F'},
];

const App = () => {
  const [lists, setLists] = useState(data);

  const deleteItem = (index) => {
    const arr = [...lists];
    arr.splice(index, 1);
    setLists(arr);
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={lists}
        renderItem={({item, index}) => {
          return <ItemBox data={item} handleDelete={() => deleteItem(index)} />;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.seperatorLine}></View>;
        }}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  seperatorLine: {
    height: 1,
    backgroundColor: 'black',
  },
});
