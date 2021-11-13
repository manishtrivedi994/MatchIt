import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { shuffle } from "lodash";
const { height, width } = Dimensions.get("screen");
import { InitialArray } from "../constants";

const Game = () => {
  const [restart, setRestart] = useState(false);
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);
  const [arr, setArr] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  useEffect(() => {
    let initalArray = InitialArray;
    initalArray = shuffle(initalArray);
    setArr(initalArray);
  }, []);
  useEffect(() => {
    let initalArray = InitialArray;
    initalArray = shuffle(initalArray);
    setArr(initalArray);
    setTurns(0);
    setMatches(0);
    setSelectedItem({});
  }, [restart]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.matchAndTurnContainer}>
        <View style={styles.matchAndTurn}>
          <Text>Matches</Text>
          <Text>{matches}</Text>
        </View>
        <View style={styles.matchAndTurn}>
          <Text>Turns</Text>
          <Text>{turns}</Text>
        </View>
      </View>
      <FlatList
        data={arr}
        renderItem={(indexItem) => (
          <Grid
            indexItem={indexItem}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            arr={arr}
            setArr={setArr}
            setTurns={setTurns}
            setMatches={setMatches}
            turns={turns}
            matches={matches}
          />
        )}
        extraData={arr}
        key={(index, item) => item.id}
        numColumns={4}
      />
      <TouchableOpacity
        style={styles.restart}
        onPress={() => setRestart(!restart)}
      >
        <Text>Restart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Game;

const styles = StyleSheet.create({
  grid: {
    width: width * 0.22,
    height: 100,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "green",
  },
  container: {
    marginTop: height * 0.2,
    marginHorizontal: 20,
  },
  matchAndTurnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  matchAndTurn: { alignItems: "center" },
  restart: { marginTop: 20, alignItems: "flex-end" },
});

const Grid = ({
  indexItem,
  selectedItem,
  setSelectedItem,
  arr,
  setArr,
  turns,
  matches,
  setTurns,
  setMatches,
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!Object.keys(selectedItem).length) {
      setShow(false);
    }
  }, [selectedItem]);
  const addItem = () => {
    setTurns(turns + 1);
    if (!Object.keys(selectedItem).length) {
      setSelectedItem({ val: indexItem?.item, index: indexItem.index });
      setShow(true);
    } else if (selectedItem.index === indexItem.index) {
      return;
    } else {
      setShow(true);
      setTimeout(() => {
        if (indexItem.item.val !== selectedItem.val.val) {
          setShow(false);
          setSelectedItem({});
        } else {
          let newArr = [...arr];
          newArr[indexItem.index] = {
            val: " ",
            id: indexItem.item.id,
          };
          newArr[selectedItem.index] = {
            val: " ",
            id: selectedItem.val.id,
          };
          setArr(newArr);
          setSelectedItem({});
          setMatches(matches + 1);
        }
      }, 1000);
    }
  };
  return (
    <TouchableOpacity
      style={
        indexItem.item.val === " "
          ? { ...styles.grid, backgroundColor: "black" }
          : { ...styles.grid }
      }
      onPress={() => {
        if (indexItem.item.val === " ") {
          return;
        } else {
          addItem();
        }
      }}
    >
      {show && <Text>{indexItem.item.val}</Text>}
    </TouchableOpacity>
  );
};
