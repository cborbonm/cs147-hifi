import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Pressable,
    FlatList,
    Image,
    SafeAreaView,
} from 'react-native';

import Colors from "../Themes/colors";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { MESSAGES } from '../data/messages';
import { GiftedChat } from 'react-native-gifted-chat'

export default function Chat ({ route, navigation }) {
  const [messages, setMessages] = useState(MESSAGES);

  const addMessages = (newMessage, index) => {
    let messagesCopy = [...messages];
    messagesCopy[index].chat.push(newMessage);
    setMessages(messagesCopy);
  }

  
  function ChatRoomPreview ({ chatHist, index, navigation, addMessages}) {

    let fullChat = chatHist.chat
    let lastMessage = fullChat[fullChat.length-1];


    return (
      <Pressable // press whole row
        onPress={ () => navigation.navigate("ChatRoom", { chatWith: chatHist.chatWith, chat: chatHist.chat, addMessages: addMessages, index: index }) } 
        style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.pressed_background : Colors.background,
        },
        styles.post
        ]}
      >
          <View style={styles.left}>
            <FontAwesome name="user-circle" size={60} color={Colors.chatty} />
          </View>
          <View style={styles.right}>
            <Text style={styles.name}>{chatHist.chatWith}</Text>
            <Text style={styles.message_preview}>{lastMessage.text}</Text>
          </View>
      </Pressable>
    );
}

return (
  <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({item, index}) => 
          <ChatRoomPreview 
            chatHist={item}
            index={index}
            navigation={navigation}
            addMessages={addMessages}
          /> 
        }
        keyExtractor={(item) => item.key}
      />
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    flex: 1,
    overflow: 'hidden',
  },
  post: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: Colors.lavender,
    borderBottomWidth: 1,
    width: '100%',
  },
  left: {
    flex: 2,
  },
  right: {
    flex: 8,
    paddingLeft: 0,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message_preview: {
    fontSize: 16,
  },
});