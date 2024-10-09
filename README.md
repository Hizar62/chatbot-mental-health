# Chatbot Development Project Report

## Project Information

- **Project Title:** Chatbot For Mental Health (Virtual Psychiatrist) with LLM
- **Project Duration:** 1 year
- **Project Team:** 3

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Project Architecture](#project-architecture)
4. [Features Implemented](#features-implemented)
5. [Challenges and Solutions](#challenges-and-solutions)
6. [Testing and Debugging](#testing-and-debugging)
7. [Future Enhancements](#future-enhancements)
8. [Conclusion](#conclusion)
9. [References](#references)

## Introduction

- **Overview:** The Mental Health Chatbot is a conversational agent designed to provide users with a safe and supportive platform for discussing mental health concerns. By leveraging the Llama-2 7B parameter model, the chatbot offers empathetic and context-aware responses to user queries. The front-end is built with React.js, and the back-end is powered by Express and Firebase. The chatbot's model is deployed on AWS SageMaker, ensuring scalable and efficient AI-driven conversations.

- **Motivation:** Mental health is a crucial issue that often goes unaddressed due to stigma, lack of resources, or fear of judgment. This chatbot was developed to offer an accessible and anonymous solution for individuals seeking mental health support. It aims to provide users with a space where they can freely talk about their feelings, ask questions, and receive thoughtful responses. By using advanced AI technology, this chatbot helps raise awareness and encourages users to explore their mental health in a non-threatening way.


## Technologies Used

### Frontend

- React
- Next.js
- Tailwind CSS

### Backend

- Node.js
- Express
- Firebase

### Tools for Model Training

- AWS SageMaker
- lambda function
- Google Colab
- hugging face


## Features Implemented

- **Chat Interface:** The chatbot features a clean and user-friendly chat interface designed with React.js. Users can interact with the bot in real-time, sending messages and receiving responses. The interface is intuitive, with a message history section, an input box for text, and a send button. It is responsive, ensuring a seamless experience across different devices, including desktops, tablets, and smartphones.

- **Backend API Integration:** The frontend is integrated with the backend via Express.js APIs. The chatbot sends user inputs to the backend, which processes the data and interacts with the Llama-2 model. The model’s responses are then sent back through the API to the frontend, allowing for a fluid conversation. Firebase is used for managing user sessions, storing chat history, and handling authentication (if required).

- **State Management:** Redux is used to manage the application’s state efficiently. It helps track the state of the conversation, user inputs, and bot responses across the application. Redux enables centralized state management, ensuring smooth data flow between components and maintaining the consistency of the chat interface even as the app scales.

## Challenges and Solutions

### Challenges Faced

- Dataset Gathering: The initial attempt to gather a dataset involved scraping over 1 million subreddits from Reddit. However, the resulting dataset was too messy and not suitable for training the model.
- Limited GPU Resources: The free version of Google Colab did not offer sufficient GPU power for fine-tuning the Llama-2 model, which hindered progress on the project.

### Solutions Implemented

- Dataset Refinement: After realizing the initial dataset was unusable, I gathered a smaller but cleaner dataset consisting of 41,000 samples from various sources on the internet. This allowed for a more manageable and focused dataset for training.
- Upgrading GPU Access: To address the GPU power limitations, I opted to purchase a subscription to Google Colab. This provided the necessary computational resources to effectively fine-tune the Llama-2 model, ensuring timely progress on the project.


## Future Enhancements

- **Potential Features:** Voice-Based Interaction, Multi-Language Support
- **Improvements:** Enhanced User Interface

## Conclusion

- **Summary:** The Mental Health Chatbot project successfully developed an AI-driven conversational agent designed to provide users with support for their mental health concerns. By leveraging the Llama-2 7B parameter model, the chatbot demonstrates the capabilities of large language models in understanding and generating human-like responses. Key achievements include the effective integration of a React.js frontend with an Express and Firebase backend, along with the deployment of the model on AWS SageMaker, ensuring scalability and performance.

Throughout this project, significant challenges were encountered, particularly in dataset gathering and resource limitations. However, these obstacles were addressed through strategic refinements and resource upgrades, leading to valuable learning outcomes.

This project not only highlighted the technical aspects of AI and web development but also emphasized the importance of mental health awareness. Moving forward, there is potential for further enhancements, such as adding voice-based interactions and expanding the chatbot's capabilities to better serve users..

