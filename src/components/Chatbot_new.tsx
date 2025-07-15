import { useContext, useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ChatbotContext } from '../context/ChatbotContext';
import kemetImage from '../assets/images/weeeeeeeeeee.jpg';
import * as signalR from '@microsoft/signalr';


interface Travel {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
}

interface Event {
  id: number;
  name: string;
  date: string | Date;
  location?: string;
  description?: string;
}

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  travels?: Travel[];
  events?: Event[];
}

interface ServerResponse {
  response: string;
  travels?: Travel[];
  events?: Event[];
}

const Chatbot = () => {
  const { 
    isChatOpen, 
    messages, 
    toggleChat, 
    setMessages
  } = useContext(ChatbotContext);
  
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const inputModeRef = useRef<'voice' | 'text'>('voice');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const retryLangRef = useRef<string | null>(null);
  const hasRetriedRef = useRef(false);
  const [listening, setListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'ar-EG' | 'en-US'>(() => {
    const browserLang = navigator.language || 'ar-EG';
    return browserLang.startsWith('ar') ? 'ar-EG' : 'en-US';
  });


  function handleVoiceStart(forcedLang?: 'ar-EG' | 'en-US') {
    const recognitionLang = forcedLang || selectedLanguage;
    setInputMode('voice');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }

    const recognition = new SpeechRecognition();
    recognition.lang = recognitionLang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      const isArabic = /[\u0600-\u06FF]/.test(transcript);

      if (!hasRetriedRef.current && (
          (recognitionLang === 'ar-EG' && !isArabic) ||
          (recognitionLang === 'en-US' && isArabic)
      )) {
        hasRetriedRef.current = true;
        retryLangRef.current = recognitionLang === 'ar-EG' ? 'en-US' : 'ar-EG';
        recognition.stop();
      } else {
        hasRetriedRef.current = false;
        handleSendMessage(transcript);
      }
    };

    recognition.onerror = (event) => {
      alert("Speech Recognition Error: " + event.error);
    };

    recognition.onend = () => {
      setListening(false);
      if (retryLangRef.current) {
        const retryLang = retryLangRef.current;
        retryLangRef.current = null;

        // This message is shown before switching to the new language
        setMessages(prev => [
          ...prev,
          {
            text: retryLang === 'ar-EG'
              ? "لم أتمكن من فهم ذلك. سأحاول بالعربية."
              : "Couldn't understand. Retrying in English.",
            sender: 'bot',
            timestamp: new Date()
          }
        ]);

        handleVoiceStart(retryLang); // Retry with the opposite language
      }
    };


    recognition.start();
    setListening(true);
  }


  function speak(text: string) {
    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);

    const containsArabic = /[\u0600-\u06FF]/.test(text); // Arabic character detection
    utterance.lang = containsArabic ? 'ar-EG' : 'en-US';

    const setVoiceAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
      const englishVoice = voices.find(v => v.name === "Aaron");

      if (containsArabic && arabicVoice) {
        utterance.voice = arabicVoice;
      } else if (!containsArabic && englishVoice) {
        utterance.voice = englishVoice;
      } else {
        utterance.voice = voices[0]; // fallback to first available
      }

      utterance.pitch = containsArabic ? 1.2 : 1.0;
      utterance.rate = containsArabic ? 1.3 : 0.88;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
    } else {
      setVoiceAndSpeak();
    }
  }




  useEffect(() => {
    inputModeRef.current = inputMode;
  }, [inputMode]);

  useEffect(() => {
    const connectionOptions: signalR.IHttpConnectionOptions = {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
      logger: signalR.LogLevel.Trace
    };

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://journeymate.runasp.net/chatHub", connectionOptions)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log("SignalR connection established successfully");
          
          connection.on("ReceiveMessage", (payload: unknown) => {
            console.log('Received server response:', payload);
            
            try {
              const serverResponse = payload as ServerResponse;
              const botMessage: ChatMessage = {
                text: serverResponse.response,
                sender: 'bot',
                timestamp: new Date(),
                travels: serverResponse.travels,
                events: serverResponse.events ? serverResponse.events.map(event => ({
                  ...event,
                  date: event.date ? new Date(event.date) : new Date()
                })) : undefined
              };

              if (inputModeRef.current === 'voice') {
                speak(serverResponse.response);
              }

              setMessages(previousMessages => [...previousMessages, botMessage]);
            } catch (error) {
              console.error('Error processing server response:', error);
              const errorMessage: ChatMessage = {
                text: 'Error processing server response',
                sender: 'bot',
                timestamp: new Date()
              };
              setMessages(previousMessages => [...previousMessages, errorMessage]);
            }
          });
        })
        .catch(error => {
          console.error("SignalR connection error:", error);
          const errorMessage: ChatMessage = {
            text: 'Connection error: ' + (error instanceof Error ? error.message : 'Failed to connect'),
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(previousMessages => [...previousMessages, errorMessage]);
        });
    }
  }, [connection, setMessages]);

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      const welcomeText =
        selectedLanguage === 'ar-EG'
          ? 'مرحبًا، أنا كيميت. أنا هنا لمساعدتك في استكشاف مصر. كيف يمكنني مساعدتك؟'
          : "Hello, I am Kemet. I'm here to help you explore Egypt. How may I assist you today?";

      const welcomeMessage: ChatMessage = {
        text: welcomeText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isChatOpen, messages.length, setMessages, selectedLanguage]);


  const handleSendMessage = async (messageToSend?: string) => {
    const message = messageToSend?.trim() || inputMessage.trim();

    if (message === '' || !connection) {
      return;
    }
    if (!messageToSend) {
      setInputMode('text');
    }
    const userMessage: ChatMessage = {
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(previousMessages => [...previousMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = {
        text: 'Error sending message: ' + (error instanceof Error ? error.message : 'Please try again'),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(previousMessages => [...previousMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleTravelClick = (travelId: number) => {
    navigate(`/travel-with-us`, { state: { id: travelId } });
    toggleChat(); // Close the chat when navigating
  };

 const handleEventClick = (eventId: number) => {
  navigate(`/events/${eventId}`);
  toggleChat();
};

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      <button
        onClick={toggleChat}
        className={`w-20 h-20 rounded-full bg-[#DF6951] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 ${
          !isChatOpen ? 'animate-float' : ''
        }`}
        aria-label="Toggle chatbot"
      >
        <img 
          src={kemetImage} 
          alt="Kemet Assistant" 
          className="w-16 h-16 rounded-full object-cover"
        />
      </button>

      {isChatOpen && (
        <div 
          className="w-[370px] h-[500px] bg-white rounded-t-lg rounded-bl-lg shadow-xl flex flex-col absolute bottom-20 right-0 overflow-hidden"
          style={{ 
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div className="bg-[#DF6951] text-white p-3 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <img 
                  src={kemetImage} 
                  alt="Kemet" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <span className="font-semibold">Kemet Assistant</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setSelectedLanguage((prev) => (prev === 'ar-EG' ? 'en-US' : 'ar-EG'))
                }
                className="text-white font-semibold text-xs px-2 hover:underline transition-all"
                aria-label="Toggle language"
              >
                {selectedLanguage === 'ar-EG' ? 'ع' : 'EN'}
              </button>

              <button 
                onClick={toggleChat}
                className="text-white hover:text-gray-200 transition-colors duration-200"
                aria-label="Close chat"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>
          </div>


          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-[#DF6951] text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                  style={{ 
                    borderRadius: message.sender === 'user' 
                      ? '12px 12px 0 12px' 
                      : '12px 12px 12px 0',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  
                  {message.travels && message.travels.length > 0 && (
                    <div className="mt-3">
                      <h4 className="font-bold mb-2 text-sm">Suggested Travel Packages:</h4>
                      <div className="space-y-2">
                        {message.travels.map((travel) => (
                          <div 
                            key={travel.id} 
                            className="p-2 bg-white bg-opacity-30 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleTravelClick(travel.id)}
                          >
                            {travel.imageUrl && (
                              <img 
                                src={travel.imageUrl} 
                                alt={travel.title} 
                                className="w-full h-32 object-cover rounded-t-lg mb-2"
                              />
                            )}
                            <div className="font-medium">{travel.title}</div>
                            {travel.description && (
                              <p className="text-xs mt-1 text-gray-600">{travel.description}</p>
                            )}
                            {travel.price && (
                              <div className="text-xs mt-1 font-semibold text-[#DF6951]">
                                From ${travel.price.toLocaleString()}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {message.events && message.events.length > 0 && (
                    <div className="mt-3">
                      <h4 className="font-bold mb-2 text-sm">Upcoming Events:</h4>
                      <div className="space-y-2">
                        {message.events.map((event) => (
                          <div 
                            key={event.id}
                            className="p-2 bg-white bg-opacity-30 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleEventClick(event.id)}
                          >
                            <div className="font-medium">{event.name}</div>
                            <div className="text-xs mt-1 text-gray-600">
                              {formatDate(event.date)}
                              {event.location && ` • ${event.location}`}
                            </div>
                            {event.description && (
                              <p className="text-xs mt-1 text-gray-600">{event.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
    
          <div className="border-t border-gray-200 p-3 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={selectedLanguage === 'ar-EG' ? "اسأل عن مصر ..." : "Ask about Egypt..."}
              dir={selectedLanguage === 'ar-EG' ? 'rtl' : 'ltr'}
              className="flex-1 border border-gray-300 rounded-lg px-4 h-12 text-sm focus:outline-none focus:ring-1 focus:ring-[#DF6951] transition-all duration-150"
              disabled={isLoading}
            />

            <button
              onClick={() => handleVoiceStart(selectedLanguage)}
              className={`w-8 h-10 p-1 flex items-center justify-center rounded-md	 transition-all duration-200 ${
                listening
                  ? 'bg-red-100 ring-2 ring-red-400 animate-pulse'
                  : 'bg-[#DF6951] hover:bg-[#C55A42]'
              }`}
              aria-label="Tap to speak"
            >
              <FaMicrophone size={18} className={listening ? 'text-red-600' : 'text-white'} />
            </button>

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || inputMessage.trim() === ''}
              className={`w-8 h-10 p-1 rounded-md	 flex items-center justify-center ${
                isLoading || inputMessage.trim() === ''
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#DF6951] hover:bg-[#C55A42] text-white'
              }`}
              aria-label="Send"
            >
              <FaPaperPlane className="text-sm" /> 
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default Chatbot;
