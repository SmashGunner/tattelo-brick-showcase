import { useState } from "react";
import { Save, Upload, Plus, Trash2, Edit2, Phone, Mail, MapPin, Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WebsiteSettings = () => {
  const [contactInfo, setContactInfo] = useState({
    phones: ["076 500 0714", "079 724 5067"],
    email: "tattelobussiness@gmail.com",
    address: "47 Chris Di Villiers Street, Ermelo, 2350",
    slogan: "Build a better Tomorrow with us"
  });

  const [heroImages, setHeroImages] = useState([
    "/src/assets/hero1.jpg",
    "/src/assets/hero2.jpg",
    "/src/assets/hero3.jpg",
    "/src/assets/hero4.jpg"
  ]);

  const [deliveryImages, setDeliveryImages] = useState([
    "/src/assets/truck1.jpg",
    "/src/assets/truck2.jpg"
  ]);

  const saveContactInfo = () => {
    // In a real app, this would save to database
    localStorage.setItem("websiteContactInfo", JSON.stringify(contactInfo));
    console.log("Contact info saved:", contactInfo);
  };

  const saveHeroImages = () => {
    // In a real app, this would save to database
    localStorage.setItem("websiteHeroImages", JSON.stringify(heroImages));
    console.log("Hero images saved:", heroImages);
  };

  const saveDeliveryImages = () => {
    // In a real app, this would save to database
    localStorage.setItem("websiteDeliveryImages", JSON.stringify(deliveryImages));
    console.log("Delivery images saved:", deliveryImages);
  };

  const addPhone = () => {
    setContactInfo({
      ...contactInfo,
      phones: [...contactInfo.phones, ""]
    });
  };

  const updatePhone = (index: number, value: string) => {
    const newPhones = [...contactInfo.phones];
    newPhones[index] = value;
    setContactInfo({
      ...contactInfo,
      phones: newPhones
    });
  };

  const removePhone = (index: number) => {
    const newPhones = contactInfo.phones.filter((_, i) => i !== index);
    setContactInfo({
      ...contactInfo,
      phones: newPhones
    });
  };

  const addHeroImage = () => {
    setHeroImages([...heroImages, ""]);
  };

  const updateHeroImage = (index: number, value: string) => {
    const newImages = [...heroImages];
    newImages[index] = value;
    setHeroImages(newImages);
  };

  const removeHeroImage = (index: number) => {
    const newImages = heroImages.filter((_, i) => i !== index);
    setHeroImages(newImages);
  };

  const addDeliveryImage = () => {
    setDeliveryImages([...deliveryImages, ""]);
  };

  const updateDeliveryImage = (index: number, value: string) => {
    const newImages = [...deliveryImages];
    newImages[index] = value;
    setDeliveryImages(newImages);
  };

  const removeDeliveryImage = (index: number) => {
    const newImages = deliveryImages.filter((_, i) => i !== index);
    setDeliveryImages(newImages);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Website Settings</h1>
          <p className="text-muted-foreground">Manage your website content and appearance</p>
        </div>

        <Tabs defaultValue="contact" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contact">Contact Information</TabsTrigger>
            <TabsTrigger value="hero">Hero Carousel</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Section</TabsTrigger>
          </TabsList>

          {/* Contact Information Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Phone Numbers */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Phone Numbers</Label>
                  {contactInfo.phones.map((phone, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={phone}
                        onChange={(e) => updatePhone(index, e.target.value)}
                        placeholder="Phone number"
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removePhone(index)}
                        disabled={contactInfo.phones.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={addPhone} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Phone
                  </Button>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({
                      ...contactInfo,
                      email: e.target.value
                    })}
                    placeholder="Email address"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-base font-semibold flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({
                      ...contactInfo,
                      address: e.target.value
                    })}
                    placeholder="Business address"
                    rows={3}
                  />
                </div>

                {/* Slogan */}
                <div className="space-y-2">
                  <Label htmlFor="slogan" className="text-base font-semibold">Company Slogan</Label>
                  <Input
                    id="slogan"
                    value={contactInfo.slogan}
                    onChange={(e) => setContactInfo({
                      ...contactInfo,
                      slogan: e.target.value
                    })}
                    placeholder="Company slogan"
                  />
                </div>

                <Button onClick={saveContactInfo} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Contact Information
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Carousel Tab */}
          <TabsContent value="hero" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Image className="w-5 h-5 mr-2 text-primary" />
                  Hero Carousel Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Hero Images</Label>
                  {heroImages.map((image, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={image}
                        onChange={(e) => updateHeroImage(index, e.target.value)}
                        placeholder="Image path or URL"
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeHeroImage(index)}
                        disabled={heroImages.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={addHeroImage} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Hero Image
                  </Button>
                </div>

                <Button onClick={saveHeroImages} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Hero Images
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Section Tab */}
          <TabsContent value="delivery" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Image className="w-5 h-5 mr-2 text-primary" />
                  Delivery Section Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Delivery Images</Label>
                  {deliveryImages.map((image, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={image}
                        onChange={(e) => updateDeliveryImage(index, e.target.value)}
                        placeholder="Image path or URL"
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeDeliveryImage(index)}
                        disabled={deliveryImages.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={addDeliveryImage} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Delivery Image
                  </Button>
                </div>

                <Button onClick={saveDeliveryImages} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Delivery Images
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default WebsiteSettings;