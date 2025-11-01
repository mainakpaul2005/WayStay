'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Languages, 
  ArrowRightLeft, 
  Volume2,
  Copy,
  Check,
  Mic,
  Camera,
  Loader2,
  Globe,
  MessageCircle,
  Book,
  MapPin,
  Utensils,
  ShoppingBag,
  Car,
  Hotel,
  Plane,
  Heart,
  AlertCircle,
  Lightbulb,
  Star
} from 'lucide-react';
import { TranslationService } from '@/lib/gemini';

const translationService = new TranslationService();

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴' }
];

const commonPhrases = {
  greetings: [
    'Hello', 'Good morning', 'Good evening', 'How are you?', 'Nice to meet you',
    'Thank you', 'You\'re welcome', 'Excuse me', 'I\'m sorry', 'Goodbye'
  ],
  travel: [
    'Where is the airport?', 'How much does this cost?', 'Can you help me?',
    'I don\'t understand', 'Do you speak English?', 'Where is the bathroom?',
    'How do I get to...?', 'What time is it?', 'Can I have the check, please?',
    'I need help'
  ],
  accommodation: [
    'I have a reservation', 'Can I check in?', 'What time is checkout?',
    'Do you have wifi?', 'Where is my room?', 'Can I have extra towels?',
    'The air conditioning isn\'t working', 'Can I have a wake-up call?',
    'Is breakfast included?', 'Can you call a taxi for me?'
  ],
  dining: [
    'Table for two, please', 'Can I see the menu?', 'I\'d like to order',
    'What do you recommend?', 'I\'m vegetarian', 'I\'m allergic to...',
    'Can I have the bill?', 'Is service included?', 'This is delicious',
    'Can I have water, please?'
  ],
  emergency: [
    'Help!', 'Call the police', 'I need a doctor', 'Where is the hospital?',
    'I lost my passport', 'I\'ve been robbed', 'I need an ambulance',
    'Where is the embassy?', 'I don\'t feel well', 'Emergency'
  ]
};

export function AITranslationService() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('es');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [culturalContext, setCulturalContext] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const translation = await translationService.translateText(
        sourceText,
        targetLang
      );

      setTranslatedText(translation);

      // Get cultural context for the translation
      try {
        const context = await translationService.getCulturalContext(
          sourceText,
          targetLang
        );
        setCulturalContext(context);
      } catch (contextError) {
        console.warn('Could not get cultural context:', contextError);
      }

    } catch (err) {
      setError('Translation failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    if (sourceLang === 'auto') return;
    
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopy = async () => {
    if (translatedText) {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePhraseSelect = (phrase: string) => {
    setSourceText(phrase);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const getLanguageFlag = (code: string) => {
    if (code === 'auto') return '🌐';
    const lang = languages.find(l => l.code === code);
    return lang?.flag || '🌍';
  };

  const getLanguageName = (code: string) => {
    if (code === 'auto') return 'Auto-detect';
    const lang = languages.find(l => l.code === code);
    return lang?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Languages className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">AI Translation Service</CardTitle>
          <p className="text-muted-foreground">
            Break language barriers with intelligent translation and cultural insights
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="translator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="translator">Translator</TabsTrigger>
          <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
        </TabsList>

        {/* Main Translator Tab */}
        <TabsContent value="translator" className="space-y-4">
          {/* Language Selection */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-center space-x-4">
                {/* Source Language */}
                <div className="flex-1">
                  <Label className="text-sm font-medium">From</Label>
                  <Select value={sourceLang} onValueChange={setSourceLang}>
                    <SelectTrigger className="mt-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getLanguageFlag(sourceLang)}</span>
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">
                        <div className="flex items-center space-x-2">
                          <span>🌐</span>
                          <span>Auto-detect</span>
                        </div>
                      </SelectItem>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center space-x-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Swap Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSwapLanguages}
                  disabled={sourceLang === 'auto'}
                  className="mt-6"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>

                {/* Target Language */}
                <div className="flex-1">
                  <Label className="text-sm font-medium">To</Label>
                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger className="mt-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getLanguageFlag(targetLang)}</span>
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center space-x-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Translation Interface */}
          <Card>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                {/* Source Text */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="font-medium">
                      {getLanguageName(sourceLang)}
                    </Label>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    ref={textareaRef}
                    placeholder="Enter text to translate..."
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    className="min-h-[120px] resize-none border-0 focus-visible:ring-0"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {sourceText.length} characters
                    </span>
                    <Button 
                      onClick={handleTranslate}
                      disabled={loading || !sourceText.trim()}
                      size="sm"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          Translating...
                        </>
                      ) : (
                        <>
                          <Languages className="h-4 w-4 mr-1" />
                          Translate
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Translated Text */}
                <div className="p-4 bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="font-medium">
                      {getLanguageName(targetLang)}
                    </Label>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleCopy}
                        disabled={!translatedText}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" disabled={!translatedText}>
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="min-h-[120px] p-3 bg-background rounded border">
                    {translatedText ? (
                      <p className="text-sm">{translatedText}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Translation will appear here...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Cultural Context */}
          {culturalContext && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Cultural Context & Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {culturalContext.culturalNotes && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">{culturalContext.culturalNotes}</p>
                    </div>
                  )}
                  {culturalContext.formalityLevel && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        Formality: {culturalContext.formalityLevel}
                      </Badge>
                    </div>
                  )}
                  {culturalContext.alternativeTranslations && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Alternative translations:</h4>
                      <div className="space-y-1">
                        {culturalContext.alternativeTranslations.map((alt: string, index: number) => (
                          <Badge key={index} variant="secondary" className="mr-2">
                            {alt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Common Phrases Tab */}
        <TabsContent value="phrases" className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(commonPhrases).map(([category, phrases]) => (
              <Card key={category}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg capitalize flex items-center">
                    {category === 'greetings' && <Heart className="h-5 w-5 mr-2" />}
                    {category === 'travel' && <MapPin className="h-5 w-5 mr-2" />}
                    {category === 'accommodation' && <Hotel className="h-5 w-5 mr-2" />}
                    {category === 'dining' && <Utensils className="h-5 w-5 mr-2" />}
                    {category === 'emergency' && <AlertCircle className="h-5 w-5 mr-2" />}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {phrases.map((phrase, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start h-auto p-3 text-left"
                        onClick={() => handlePhraseSelect(phrase)}
                      >
                        <span className="text-sm">{phrase}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}