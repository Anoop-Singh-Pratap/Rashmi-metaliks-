import React, { useState, useEffect } from 'react';
import { getNews, createNews, updateNews } from '../services/cmsService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { CalendarIcon, ImageIcon, Newspaper, FileText, Tag, RefreshCw, PlusCircle, Edit, AlertCircle, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Import shadcn components
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
}

// Define category list and utility functions
const categories = ["General", "Press Release", "Event", "Updates", "Awards", "Industry News"];

// Utility function to get category color
const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'general':
      return 'bg-blue-500/10 text-blue-500';
    case 'press release':
      return 'bg-green-500/10 text-green-500';
    case 'event':
      return 'bg-purple-500/10 text-purple-500';
    case 'updates':
      return 'bg-amber-500/10 text-amber-500';
    case 'awards':
      return 'bg-red-500/10 text-red-500';
    case 'industry news':
      return 'bg-indigo-500/10 text-indigo-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

const NewsAdmin = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [formData, setFormData] = useState({
    Heading: '',
    Date: '',
    Category: '',
    Description: '',
    Content: '',
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);
  
  // Check if user is already authenticated with Supabase
  useEffect(() => {
    const checkAuth = async () => {
      // This is the only place where Supabase is used - for authentication only
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setAuthenticated(true);
        setAuthToken(data.session.access_token);
      }
    };
    
    checkAuth();
  }, []);
  
  // Fetch news data if authenticated
  useEffect(() => {
    if (authenticated) {
      fetchNews();
    }
  }, [authenticated]);
  
  // Handle login with Supabase
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Using Supabase only for authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      if (data.session) {
        setAuthenticated(true);
        setAuthToken(data.session.access_token);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch news using CMS API (not Supabase)
  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      // Get news from CMS API through the backend proxy
      const data = await getNews();
      setNews(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch news');
    } finally {
      setLoadingNews(false);
    }
  };
  
  // Handle logout from Supabase
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthenticated(false);
    setAuthToken('');
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };
  
  // Handle create/update news
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      if (!authToken) {
        throw new Error('Authentication required');
      }
      
      if (formMode === 'edit' && selectedNews) {
        // Update existing news using CMS API (not Supabase)
        await updateNews(selectedNews.id, formData, authToken);
      } else {
        // Create new news using CMS API (not Supabase)
        await createNews({
          ...formData,
          Heading: formData.Heading,
          Date: formData.Date || new Date().toISOString().split('T')[0],
          Category: formData.Category || 'General'
        }, authToken);
      }
      
      // Reset form and refresh news list
      resetForm();
      fetchNews();
    } catch (err: any) {
      setError(err.message || 'Failed to save news');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleSelectNews = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setFormData({
      Heading: newsItem.title,
      Date: newsItem.date,
      Category: newsItem.category,
      Description: newsItem.excerpt,
      Content: newsItem.content,
      image: null
    });
    setImagePreview(newsItem.image);
    setFormMode('edit');
  };
  
  const handleClearForm = () => {
    setFormData({
      Heading: '',
      Date: new Date().toISOString().split('T')[0],
      Category: 'General',
      Description: '',
      Content: '',
      image: null
    });
    setImagePreview('');
    setSelectedNews(null);
    setFormMode('create');
  };
  
  const handleEdit = (item: NewsItem) => {
    handleSelectNews(item);
  };
  
  const resetForm = () => {
    handleClearForm();
  };
  
  // Login form
  if (!authenticated) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8 min-h-screen">
          <div className="max-w-md mx-auto mt-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  News Admin Login
                </CardTitle>
                <CardDescription>
                  Please login to manage news content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        <>
                          <LogIn className="mr-2 h-4 w-4" />
                          Login
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Admin panel if authenticated
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>News Admin | Rashmi Metaliks</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">
              News Management <span className="text-rashmi-red">Panel</span>
            </h1>
            <p className="text-muted-foreground mt-2">Create and manage news articles for the Rashmi Metaliks website</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={fetchNews} 
              variant="outline" 
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button 
              onClick={handleLogout} 
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              Logout
            </Button>
          </div>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="list" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list" className="gap-2"><Newspaper className="h-4 w-4" /> News Items</TabsTrigger>
            <TabsTrigger value="form" className="gap-2">{formMode === 'create' ? <PlusCircle className="h-4 w-4" /> : <Edit className="h-4 w-4" />} {formMode === 'create' ? 'Create News' : 'Edit News'}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-rashmi-red" />
                  News Articles
                </CardTitle>
                <CardDescription>
                  {news.length} items in the news database
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading && news.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <RefreshCw className="h-8 w-8 text-muted-foreground animate-spin mb-4" />
                    <p className="text-muted-foreground">Loading news items...</p>
                  </div>
                ) : news.length > 0 ? (
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {news.map(item => (
                        <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                          <div className="flex items-start justify-between p-6">
                            <div>
                              <h3 className="font-bold text-lg line-clamp-2">{item.title}</h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <CalendarIcon className="h-3 w-3" />
                                  {new Date(item.date).toLocaleDateString()}
                                </Badge>
                                <Badge className={`${getCategoryColor(item.category)}`}>
                                  {item.category}
                                </Badge>
                              </div>
                              <p className="mt-3 text-muted-foreground line-clamp-2">{item.excerpt}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(item)}
                              className="shrink-0 gap-1"
                            >
                              <Edit className="h-3.5 w-3.5" /> Edit
                            </Button>
                          </div>
                          {item.image && (
                            <div className="px-6 pb-6">
                              <div className="relative h-40 w-full overflow-hidden rounded-md bg-muted">
                                <img 
                                  src={typeof item.image === 'string' ? item.image : URL.createObjectURL(item.image as any)} 
                                  alt={item.title}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex flex-col items-center justify-center border border-dashed border-border rounded-lg py-12 text-center">
                    <Newspaper className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground font-medium">No news items found</p>
                    <p className="text-sm text-muted-foreground mt-1">Create your first news item using the form.</p>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="mt-4 gap-2"
                      onClick={() => {
                        const formTab = document.querySelector('[data-value="form"]');
                        if (formTab) {
                          formTab.dispatchEvent(new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                          }));
                        }
                      }}
                    >
                      <PlusCircle className="h-4 w-4" /> Create News Item
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="form" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  {formMode === 'create' ? <PlusCircle className="h-5 w-5 text-rashmi-red" /> : <Edit className="h-5 w-5 text-rashmi-red" />}
                  {formMode === 'create' ? 'Create News Item' : 'Edit News Item'}
                </CardTitle>
                <CardDescription>
                  {formMode === 'create' 
                    ? 'Create a new news article to display on the website' 
                    : `Editing news item with ID: ${selectedNews?.id}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" /> Title
                        </Label>
                        <Input
                          id="title"
                          name="Heading"
                          value={formData.Heading}
                          onChange={handleInputChange}
                          placeholder="Enter news title"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" /> Date
                        </Label>
                        <Input
                          id="date"
                          name="Date"
                          type="date"
                          value={formData.Date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="category" className="flex items-center gap-2">
                          <Tag className="h-4 w-4" /> Category
                        </Label>
                        <Select 
                          value={formData.Category} 
                          onValueChange={(value) => setFormData(prev => ({...prev, Category: value}))}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(cat => (
                              <SelectItem key={cat} value={cat}>
                                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getCategoryColor(cat)}`}></span>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="image" className="flex items-center gap-2">
                          <ImageIcon className="h-4 w-4" /> Featured Image
                        </Label>
                        <div className="relative">
                          <Input
                            id="image"
                            name="image"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="pt-2"
                          />
                          {formData.image && (
                            <div className="mt-2 relative h-32 w-full overflow-hidden rounded-md bg-muted">
                              <img 
                                src={URL.createObjectURL(formData.image)} 
                                alt="Preview"
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                          {formMode === 'edit' && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Leave empty to keep the current image
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="excerpt" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" /> Excerpt (Short Description)
                        </Label>
                        <Textarea
                          id="excerpt"
                          name="Description"
                          value={formData.Description}
                          onChange={handleInputChange}
                          placeholder="Brief description of the news item"
                          className="min-h-24"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="content" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" /> Content
                        </Label>
                        <Textarea
                          id="content"
                          name="Content"
                          value={formData.Content}
                          onChange={handleInputChange}
                          placeholder="Full content of the news article"
                          className="min-h-64"
                          required
                        />
                      </div>
                    </div>
                  </div>
                
                  <Separator />
                  
                  <div className="flex justify-end gap-3">
                    {formMode === 'edit' && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className="gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          {formMode === 'create' ? 'Creating...' : 'Updating...'}
                        </>
                      ) : (
                        <>
                          {formMode === 'create' ? (
                            <>
                              <PlusCircle className="h-4 w-4" />
                              Create News Item
                            </>
                          ) : (
                            <>
                              <Edit className="h-4 w-4" />
                              Update News Item
                            </>
                          )}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsAdmin; 