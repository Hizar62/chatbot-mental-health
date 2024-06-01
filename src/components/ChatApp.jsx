import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import ContactUs from './ContactUs';
import axios from 'axios';
import { serverTimestamp, collection, doc, getDoc, query, getDocs, addDoc, deleteDoc, updateDoc, arrayUnion, setDoc, orderBy, onSnapshot } from 'firebase/firestore';
import { app, firestore } from '../firebase'; // Ensure proper import paths

const examples = [
  "How to manage stress and anxiety effectively?",
  "Dealing with feelings of loneliness and isolation.",
  "Coping strategies for handling depression and low mood.",
  "Tips to manage anger and frustration in daily life.",
  "What are three things I'm grateful for today?",
  "Plan for building self-confidence and overcoming self-doubt."
];

const Chat = ({ currentUserUID }) => {
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [title, setTitle] = useState('');
  const [input, setInput] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isContactUsVisible, setIsContactUsVisible] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);

  // Fetch chat history
  const getChat = async () => {
    if (!currentUserUID) return;

    try {
        const userMessagesRef = collection(firestore, `chats/${currentUserUID}/messages`);

        // Get all documents in the 'messages' collection
        const querySnapshot = await getDocs(userMessagesRef);

        let allMessages = [];

        querySnapshot.forEach((doc) => {
            const conversationData = doc.data();
            if (conversationData && conversationData.messages) {
                allMessages = [...allMessages, ...conversationData.messages];
            }
        });
        
        // Sort messages by timestamp
        allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        console.log(allMessages)

        setChatHistory(allMessages);
        return allMessages;
    } catch (error) {
        console.error('Error getting chat:', error);
        return [];
    }
};


  
  
  

  // Load chat history on component mount or when currentUserUID changes
  useEffect(() => {
    getChat();
  }, [currentUserUID]);

  // Handle sending a new message
  const handleSend = async () => {
    if (input.trim() === '') return;
    setConversationStarted(true);
    const userMessage = { text: input, timestamp: new Date().toISOString() };
    setMessages((prevChat) => [...prevChat, userMessage]);
    setInput('');


    try {
        const response = await axios.get(
            `https://fj5pdfxsqg.execute-api.eu-north-1.amazonaws.com/llama2?query=${encodeURIComponent(input)}`
        );

        const botReply = response.data.replace(input, '').trim();
        const botMessage = { text: botReply, timestamp: new Date().toISOString() };
        setMessages((prevChat) => [...prevChat, botMessage]);

        // Set up Firestore references
        const today = new Date();
        const dateKey = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format
        const userMessagesRef = collection(firestore, `chats/${currentUserUID}/messages`);

        // Check if the conversation document already exists
        const conversationDocRef = doc(userMessagesRef, dateKey);
        const conversationDocSnapshot = await getDoc(conversationDocRef);

        if (conversationDocSnapshot.exists()) {
            // Conversation document exists, update it with new messages
            await updateDoc(conversationDocRef, {
                messages: arrayUnion(userMessage, botMessage)
            });
        } else {
            // Conversation document doesn't exist, create it with initial messages
            await setDoc(conversationDocRef, {
                messages: [userMessage, botMessage]
              });
              
        }

        console.log('Message sent successfully!');
    } catch (error) {
        console.error('Error sending message:', error);
    }

};
  

  const handleNewChat = () => {
    setMessages([]);
    // setTitle('');
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const toggleContactUs = () => {
    setIsContactUsVisible(!isContactUsVisible);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('Sign-out successful.');
    }).catch((error) => {
      console.error('An error happened during logout:', error);
    });
  };

  return (
    <div className='h-screen w-screen flex bg-[#050509]'>
      <div className='w-[20%] h-screen bg-[#0c0c15] text-white p-4 flex flex-col'>
        <div className='h-[5%]'>
          <button className='w-full h-[50px] border rounded hover:bg-slate-600' onClick={handleNewChat}>
            + New Chat
          </button>
        </div>
        <div className='p-4'>

        </div>
        <div className='h-[80%] overflow-y-auto shadow-lg hide-scroll-bar mb-4'>
          {chatHistory.map((item, index) => (
            <div key={index} className=' py-3 text-center rounded mt-4 text-lg font-light flex items-center px-8 hover:bg-slate-600 cursor-pointer'>
              <span className='mr-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-message'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                  <path d='M8 9h8'></path>
                  <path d='M8 13h6'></path>
                  <path d='M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z'></path>
                </svg>
              </span>
              <span className='text-left mr-8 text-xs inline-block float-left truncate'>{item.text?.slice(0, 8)}</span>
              <img className='h-5 mr-3 inline-block float-right' src="src/img/icons8-delete-48.png" alt="deleteIcon" />
            </div>
          ))}
        </div>
        <div className='h-[20%] border-t flex flex-col items-center justify-between '>
          <button className='bg-blue-500 text-white px-4 py-2 rounded mb-4' onClick={handleLogout}>
            Logout
          </button>
          <div className='py-3 text-center rounded text-lg font-light flex items-center px-8 hover:bg-slate-600 cursor-pointer' onClick={toggleContactUs}>
            <span className='mr-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-mail'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24V0H0z' fill='none'></path>
                <path d='M3 8l9 6l9 -6'></path>
                <path d='M21 8v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-8'></path>
              </svg>
            </span>
            Contact us
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg' style={{ width: '250px', height: '200px', background: 'white' }}>
            <div className='text-xl font-bold mb-4'>Settings</div>
            <div >
              <button onClick={handleLogout}>
                Logout
              </button>
            </div>
            <div className='flex justify-center mt-4'>
              <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700' onClick={togglePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isContactUsVisible && <ContactUs toggleContactUs={toggleContactUs} />}

      <div className='w-[80%] h-screen flex flex-col justify-between'>
        <div className='flex-grow overflow-auto p-8'>
          {messages.map((message, index) => (
            <div key={index} className={`w-[60%] mx-auto p-6 text-white flex ${message.sender === 'botMessage' ? 'bg-slate-900 rounded' : 'bg-slate-700 rounded'}`}>
              <span className='mr-8 p-2 text-white rounded-full'>
                {message.sender === 'userMessage' ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-user-bolt'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                    <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0'></path>
                    <path d='M6 21v-2a4 4 0 0 1 4 -4h4c.267 0 .529 .026 .781 .076'></path>
                    <path d='M19 16l-2 3h4l-2 3'></path>
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-robot'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                    <path d='M7 7h10a2 2 0 0 1 2 2v1l1 1v3l-1 1v3a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-3l-1 -1v-3l1 -1v-1a2 2 0 0 1 2 -2z'></path>
                    <path d='M10 16h4'></path>
                    <circle cx='8.5' cy='11.5' r='.5' fill='currentColor'></circle>
                    <circle cx='15.5' cy='11.5' r='.5' fill='currentColor'></circle>
                    <path d='M9 7l-1 -4'></path>
                    <path d='M15 7l1 -4'></path>
                  </svg>
                )}
              </span>
              <div className='leading-loose' style={{ whiteSpace: 'break-spaces' }}>
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className='h-[20%] p-8 bg-[#050509]'>
          <div className='w-full flex justify-center relative'>
            <input
              type='text'
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className='w-[60%] rounded-lg p-4 pr-16 bg-slate-800 text-white'
              placeholder='Type your message here...'
            />
            <span className='absolute right-[20%] top-4 cursor-pointer flex' onClick={handleSend}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-send'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path d='M10 14l11 -11'></path>
                <path d='M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5'></path>
              </svg>
            </span>
          </div>
          <small className='text-slate-500 mt-2 block text-center'>AI can generate incorrect information.</small>
        </div>
      </div>
    </div>
  );
};

export default Chat;
