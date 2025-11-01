import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Search, MoreVertical, Clock } from 'lucide-react';

export default function MessagesPage() {
  const conversations = [
    {
      id: 1,
      hostName: "Sarah Johnson",
      propertyTitle: "Modern Downtown Apartment",
      lastMessage: "The apartment will be ready for check-in at 3 PM. Looking forward to hosting you!",
      time: "2 hours ago",
      unread: true,
      avatar: "SJ"
    },
    {
      id: 2,
      hostName: "Michael Chen",
      propertyTitle: "Cozy Studio near Central Park",
      lastMessage: "Thank you for your interest! The studio has all the amenities you mentioned.",
      time: "1 day ago",
      unread: false,
      avatar: "MC"
    },
    {
      id: 3,
      hostName: "Emily Rodriguez",
      propertyTitle: "Luxury Penthouse Suite",
      lastMessage: "I'd be happy to answer any questions about the neighborhood.",
      time: "3 days ago",
      unread: false,
      avatar: "ER"
    }
  ];

  const currentChat = conversations[0];

  const messages = [
    {
      id: 1,
      sender: "guest",
      content: "Hi! I'm interested in booking your apartment for next weekend. Is it available?",
      time: "10:30 AM"
    },
    {
      id: 2,
      sender: "host",
      content: "Hello! Yes, the apartment is available for next weekend. I'd be happy to host you!",
      time: "10:45 AM"
    },
    {
      id: 3,
      sender: "guest",
      content: "Great! Could you tell me more about the parking situation in the area?",
      time: "11:00 AM"
    },
    {
      id: 4,
      sender: "host",
      content: "There's free street parking available, and there's also a parking garage just 2 blocks away if you prefer covered parking.",
      time: "11:15 AM"
    },
    {
      id: 5,
      sender: "host",
      content: "The apartment will be ready for check-in at 3 PM. Looking forward to hosting you!",
      time: "2 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-2">
            <MessageCircle className="h-8 w-8" />
            <span>Messages</span>
          </h1>
          <p className="text-muted-foreground">
            Chat with hosts and manage your bookings
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-l-2 ${
                      conversation.id === currentChat.id 
                        ? 'border-l-primary bg-muted/50' 
                        : 'border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {conversation.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold truncate">{conversation.hostName}</h4>
                          <span className="text-xs text-muted-foreground">{conversation.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1 truncate">
                          {conversation.propertyTitle}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread && (
                          <Badge variant="default" className="mt-2 h-5 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                    {currentChat.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{currentChat.hostName}</h3>
                    <p className="text-sm text-muted-foreground">{currentChat.propertyTitle}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'guest' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.sender === 'guest' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    } rounded-lg p-3`}>
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center mt-1 space-x-1 text-xs ${
                        message.sender === 'guest' 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>
                        <Clock className="h-3 w-3" />
                        <span>{message.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}