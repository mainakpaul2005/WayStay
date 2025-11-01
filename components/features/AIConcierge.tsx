'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Shield,
  Loader2,
  Sparkles,
  Mic,
  Paperclip,
  MoreHorizontal
} from 'lucide-react';
import { ConciergeService } from '@/lib/gemini';

const conciergeService = new ConciergeService();

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'action';
  metadata?: any;
}

interface AIConciergeProps {
  userLocation?: string;
  userName?: string;
}

export function AIConcierge({ userLocation, userName = 'Guest' }: AIConciergeProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello ${userName}! I'm your AI travel concierge. I'm here 24/7 to help you with bookings, recommendations, local insights, translations, and any travel questions you might have. How can I assist you today?`,
      isBot: true,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickSuggestions = [
    'Find restaurants nearby',
    'Help with booking',
    'Translate a phrase',
    'Local weather',
    'Emergency contacts',
    'Best time to visit attractions',
    'Currency exchange rates',
    'Transportation options'
  ];

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputText.trim();
    if (!messageContent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      isBot: false,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);
    setIsTyping(true);

    try {
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await conciergeService.handleQuery(messageContent, {
        destination: userLocation,
        travelers: 1
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        isBot: true,
        timestamp: new Date(),
        type: response.actionable ? 'action' : 'text',
        metadata: response.suggestions || response.actionData
      };

      setMessages(prev => [...prev, botMessage]);

      // Add suggestions as separate messages if available
      if (response.suggestions && response.suggestions.length > 0) {
        const suggestionMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: 'Here are some related suggestions:',
          isBot: true,
          timestamp: new Date(),
          type: 'suggestion',
          metadata: { suggestions: response.suggestions }
        };
        setMessages(prev => [...prev, suggestionMessage]);
      }

    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment, or contact our human support team if the issue persists.',
        isBot: true,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 rounded-b-none">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600">
                <AvatarFallback className="text-white">
                  <Bot className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <CardTitle className="text-xl">AI Concierge</CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Online • Responds instantly</span>
              </div>
            </div>
            <div className="ml-auto">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages Area */}
      <Card className="flex-1 rounded-none border-x border-b-0">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`flex max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'} space-x-2`}>
                  <Avatar className={`h-8 w-8 ${message.isBot ? 'mr-2' : 'ml-2'}`}>
                    <AvatarFallback className={message.isBot ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}>
                      {message.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`space-y-1 ${message.isBot ? '' : 'items-end'}`}>
                    <div 
                      className={`rounded-2xl px-4 py-2 ${
                        message.isBot 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    
                    {/* Suggestions */}
                    {message.type === 'suggestion' && message.metadata?.suggestions && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {message.metadata.suggestions.map((suggestion: string, index: number) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => handleQuickSuggestion(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    {/* Action buttons */}
                    {message.type === 'action' && message.metadata && (
                      <div className="mt-2 space-y-1">
                        {message.metadata.bookingUrl && (
                          <Button size="sm" className="text-xs">
                            Complete Booking
                          </Button>
                        )}
                        {message.metadata.mapLocation && (
                          <Button variant="outline" size="sm" className="text-xs">
                            <MapPin className="h-3 w-3 mr-1" />
                            View on Map
                          </Button>
                        )}
                      </div>
                    )}
                    
                    <div className={`text-xs text-muted-foreground ${message.isBot ? 'text-left' : 'text-right'}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>

      {/* Quick Suggestions */}
      {messages.length <= 1 && (
        <Card className="rounded-none border-x border-b-0">
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground mb-2">Quick suggestions:</div>
            <div className="flex flex-wrap gap-1">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => handleQuickSuggestion(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Input Area */}
      <Card className="rounded-t-none border-t-0">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your travel needs..."
                className="pr-12"
                disabled={loading}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={loading || !inputText.trim()}
                size="sm"
                className="absolute right-1 top-1 h-6 w-6 p-0"
              >
                {loading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Send className="h-3 w-3" />
                )}
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            I can help with bookings, translations, recommendations, and more. Available 24/7!
          </div>
        </CardContent>
      </Card>
    </div>
  );
}