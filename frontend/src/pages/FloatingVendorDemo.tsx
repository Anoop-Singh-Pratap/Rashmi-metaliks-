import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Settings, Smartphone, Monitor, Eye, EyeOff } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingVendorButton from '../components/FloatingVendorButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import SEO from '../components/SEO';

const FloatingVendorDemo = () => {
  const [position, setPosition] = useState<'right' | 'left'>('right');
  const [hideOnMobile, setHideOnMobile] = useState(false);
  const [showDemo, setShowDemo] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Floating Vendor Button Demo | Rashmi Metaliks"
        description="Interactive demo of the floating vendor registration button component with customizable settings and responsive design."
        keywords="floating button, vendor registration, UI component, demo, Rashmi Metaliks"
        canonicalUrl="/floating-vendor-demo"
      />

      <Header />

      {/* Demo Floating Button */}
      {showDemo && (
        <FloatingVendorButton 
          position={position}
          hideOnMobile={hideOnMobile}
          className="demo-floating-button"
        />
      )}

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-rashmi-dark/5 to-rashmi-red/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-rashmi-red/10 text-rashmi-red px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building size={16} />
              Interactive Demo
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rashmi-dark to-rashmi-red bg-clip-text text-transparent">
              Rectangular Floating
              <br />
              <span className="text-rashmi-red">Vendor Registration</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Experience our redesigned rectangular floating vendor registration button positioned vertically at the screen corner.
              Click to see the smooth slide-out animation with enhanced typography using Poppins and Inter fonts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Controls */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-rashmi-red">Customize</span> the Experience
              </h2>
              <p className="text-xl text-muted-foreground">
                Try different settings and see how the floating button adapts
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Controls Panel */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-rashmi-red" />
                      Demo Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Position Control */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Button Position</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={position === 'right' ? 'default' : 'outline'}
                          onClick={() => setPosition('right')}
                          className={position === 'right' ? 'bg-rashmi-red hover:bg-rashmi-red/90' : ''}
                        >
                          Right Side
                        </Button>
                        <Button
                          variant={position === 'left' ? 'default' : 'outline'}
                          onClick={() => setPosition('left')}
                          className={position === 'left' ? 'bg-rashmi-red hover:bg-rashmi-red/90' : ''}
                        >
                          Left Side
                        </Button>
                      </div>
                    </div>

                    {/* Mobile Visibility */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="hide-mobile" className="text-base font-medium">
                        Hide on Mobile
                      </Label>
                      <Switch
                        id="hide-mobile"
                        checked={hideOnMobile}
                        onCheckedChange={setHideOnMobile}
                      />
                    </div>

                    {/* Show/Hide Demo */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-demo" className="text-base font-medium">
                        Show Demo Button
                      </Label>
                      <Switch
                        id="show-demo"
                        checked={showDemo}
                        onCheckedChange={setShowDemo}
                      />
                    </div>

                    {/* Instructions */}
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Eye className="h-4 w-4 text-rashmi-red" />
                        How to Test
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Look for the rectangular vertical button on the {position} corner</li>
                        <li>• Click to see the smooth slide-out animation</li>
                        <li>• Notice the enhanced typography with Poppins & Inter fonts</li>
                        <li>• Try different positions and mobile settings</li>
                        <li>• The button auto-hides on vendor registration page</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Features Panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-rashmi-red" />
                      Key Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium">Rectangular Vertical Design</h4>
                          <p className="text-sm text-muted-foreground">
                            Modern rectangular button positioned at screen corner
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium">Slide-Out Animation</h4>
                          <p className="text-sm text-muted-foreground">
                            Smooth slide-out panel with spring animations
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium">Premium Typography</h4>
                          <p className="text-sm text-muted-foreground">
                            Enhanced fonts using Poppins and Inter for better readability
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium">Auto-Hide Logic</h4>
                          <p className="text-sm text-muted-foreground">
                            Hides on vendor registration page to avoid redundancy
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium">Responsive Design</h4>
                          <p className="text-sm text-muted-foreground">
                            Optimized for both desktop and mobile experiences
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium">Accessibility</h4>
                          <p className="text-sm text-muted-foreground">
                            Keyboard navigation and screen reader support
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Device Preview */}
                    <div className="pt-4 border-t border-muted/30">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-rashmi-red" />
                        Device Preview
                      </h4>
                      <div className="flex gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Monitor className="h-3 w-3" />
                          <span>Desktop: Right/Left side</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Smartphone className="h-3 w-3" />
                          <span>Mobile: Bottom right</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-rashmi-red">Implementation</span> Details
              </h2>
              <p className="text-xl text-muted-foreground">
                The floating vendor button is now active across all pages
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-rashmi-red/10 text-rashmi-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold mb-2">Global Presence</h3>
                  <p className="text-sm text-muted-foreground">
                    Appears on all pages except vendor registration
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-rashmi-red/10 text-rashmi-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold mb-2">Mobile Optimized</h3>
                  <p className="text-sm text-muted-foreground">
                    Responsive design with mobile-specific positioning
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-rashmi-red/10 text-rashmi-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold mb-2">Configurable</h3>
                  <p className="text-sm text-muted-foreground">
                    Customizable position, visibility, and behavior
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FloatingVendorDemo;
