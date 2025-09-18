import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Globe, 
  Moon, 
  Sun, 
  Palette, 
  Bell, 
  Shield, 
  Volume2,
  Smartphone,
  Wifi,
  Battery,
  Settings,
  Check,
  Languages
} from "lucide-react";

interface GlobalSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: 'en' | 'hi';
  currentTheme: 'light' | 'dark';
  onLanguageChange: (language: 'en' | 'hi') => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export default function GlobalSettings({ 
  isOpen, 
  onClose, 
  currentLanguage, 
  currentTheme, 
  onLanguageChange, 
  onThemeChange 
}: GlobalSettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' }
  ];

  const themes = [
    { 
      id: 'light', 
      name: 'Light Mode', 
      icon: Sun, 
      preview: 'bg-gradient-to-br from-white to-gray-50',
      description: 'Clean and bright interface'
    },
    { 
      id: 'dark', 
      name: 'Dark Mode', 
      icon: Moon, 
      preview: 'bg-gradient-to-br from-gray-900 to-gray-800',
      description: 'Easy on the eyes'
    }
  ];

  const settingsCategories = [
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { 
          label: 'Language / भाषा', 
          description: 'Choose your preferred language',
          component: 'language'
        },
        { 
          label: 'Theme / थीम', 
          description: 'Switch between light and dark mode',
          component: 'theme'
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { 
          label: 'Push Notifications', 
          description: 'Booking updates and alerts',
          component: 'switch',
          value: notifications,
          onChange: setNotifications
        },
        { 
          label: 'Sound Effects', 
          description: 'App sounds and feedback',
          component: 'switch',
          value: soundEffects,
          onChange: setSoundEffects
        }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { 
          label: 'Location Services', 
          description: 'Find nearby parking spots',
          component: 'switch',
          value: locationServices,
          onChange: setLocationServices
        },
        { 
          label: 'Auto Sync', 
          description: 'Sync data across devices',
          component: 'switch',
          value: autoSync,
          onChange: setAutoSync
        }
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-4 bg-background rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
                    >
                      <Settings className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-bold">Settings</h2>
                      <p className="text-primary-foreground/80 text-sm">सेटिंग्स</p>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="text-primary-foreground hover:bg-white/20 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {settingsCategories.map((category, categoryIndex) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + categoryIndex * 0.1 }}
                    >
                      <Card className="overflow-hidden border-0 shadow-lg">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center space-x-3">
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
                            >
                              <Icon className="h-4 w-4 text-primary" />
                            </motion.div>
                            <span>{category.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {category.items.map((item, itemIndex) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + categoryIndex * 0.1 + itemIndex * 0.05 }}
                              className="space-y-3"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium">{item.label}</h4>
                                  <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                
                                {/* Language Selector */}
                                {item.component === 'language' && (
                                  <div className="flex space-x-2">
                                    {languages.map((lang) => (
                                      <motion.div
                                        key={lang.code}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        <Button
                                          variant={currentLanguage === lang.code ? "default" : "outline"}
                                          size="sm"
                                          onClick={() => onLanguageChange(lang.code as 'en' | 'hi')}
                                          className="relative overflow-hidden"
                                        >
                                          <motion.div
                                            animate={currentLanguage === lang.code ? {
                                              scale: [1, 1.2, 1],
                                              rotate: [0, 5, -5, 0]
                                            } : {}}
                                            transition={{ duration: 0.5 }}
                                            className="flex items-center space-x-2"
                                          >
                                            <span className="text-lg">{lang.flag}</span>
                                            <span>{lang.nativeName}</span>
                                            {currentLanguage === lang.code && (
                                              <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="ml-1"
                                              >
                                                <Check className="h-3 w-3" />
                                              </motion.div>
                                            )}
                                          </motion.div>
                                        </Button>
                                      </motion.div>
                                    ))}
                                  </div>
                                )}

                                {/* Theme Selector */}
                                {item.component === 'theme' && (
                                  <div className="flex space-x-2">
                                    {themes.map((theme) => {
                                      const Icon = theme.icon;
                                      return (
                                        <motion.div
                                          key={theme.id}
                                          whileHover={{ scale: 1.05, y: -2 }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                          <Button
                                            variant={currentTheme === theme.id ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => onThemeChange(theme.id as 'light' | 'dark')}
                                            className="relative overflow-hidden"
                                          >
                                            <motion.div
                                              animate={currentTheme === theme.id ? {
                                                rotate: [0, 360]
                                              } : {}}
                                              transition={{ duration: 1 }}
                                              className="flex items-center space-x-2"
                                            >
                                              <Icon className="h-4 w-4" />
                                              <span>{theme.name.split(' ')[0]}</span>
                                              {currentTheme === theme.id && (
                                                <motion.div
                                                  initial={{ scale: 0 }}
                                                  animate={{ scale: 1 }}
                                                  className="ml-1"
                                                >
                                                  <Check className="h-3 w-3" />
                                                </motion.div>
                                              )}
                                            </motion.div>
                                          </Button>
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                )}

                                {/* Switch Component */}
                                {item.component === 'switch' && 'value' in item && 'onChange' in item && (
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Switch
                                      checked={item.value}
                                      onCheckedChange={item.onChange}
                                      className="data-[state=checked]:bg-primary"
                                    />
                                  </motion.div>
                                )}
                              </div>

                              {/* Theme Preview */}
                              {item.component === 'theme' && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  transition={{ delay: 0.5 }}
                                  className="grid grid-cols-2 gap-3"
                                >
                                  {themes.map((theme) => (
                                    <motion.div
                                      key={theme.id}
                                      whileHover={{ scale: 1.02 }}
                                      onClick={() => onThemeChange(theme.id as 'light' | 'dark')}
                                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                        currentTheme === theme.id 
                                          ? 'border-primary shadow-lg' 
                                          : 'border-border hover:border-primary/50'
                                      }`}
                                    >
                                      <div className={`h-12 rounded-md mb-2 ${theme.preview}`} />
                                      <p className="text-xs font-medium">{theme.name}</p>
                                      <p className="text-xs text-muted-foreground">{theme.description}</p>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </motion.div>
                          ))}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Card className="bg-gradient-to-r from-primary/5 to-green-500/5 border-0">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-1">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-lg font-bold text-primary"
                          >
                            98%
                          </motion.div>
                          <p className="text-xs text-muted-foreground">App Performance</p>
                        </div>
                        <div className="space-y-1">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="text-lg font-bold text-green-600"
                          >
                            24/7
                          </motion.div>
                          <p className="text-xs text-muted-foreground">Support Available</p>
                        </div>
                        <div className="space-y-1">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            className="text-lg font-bold text-blue-600"
                          >
                            2M+
                          </motion.div>
                          <p className="text-xs text-muted-foreground">Happy Users</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="p-6 border-t bg-muted/30"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    SmartPark v1.0.0
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={onClose}
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                    >
                      <motion.div
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="flex items-center space-x-2"
                      >
                        <Check className="h-4 w-4" />
                        <span>Apply Changes</span>
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
