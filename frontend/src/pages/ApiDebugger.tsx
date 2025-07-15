import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const ApiDebugger = () => {
  const [apiUrl, setApiUrl] = useState('http://localhost:1337/api/news-and-updates-panel?populate=*');
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setResponseData(data);
      console.log('API Response:', data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data from the API');
      setResponseData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>API Debugger | Rashmi Metaliks</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-display font-bold text-foreground mb-8">
          API <span className="text-rashmi-red">Debugger</span>
        </h1>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Test API Endpoint</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">API URL</label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
              />
            </div>
            
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-4 py-2 bg-rashmi-red text-white rounded-md hover:bg-rashmi-red/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Fetch Data'}
            </button>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
            </div>
          )}
          
          {responseData && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">API Response</h2>
              
              <div className="overflow-x-auto">
                <pre className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
                  {JSON.stringify(responseData, null, 2)}
                </pre>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">Response Structure Analysis</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Has data array:</strong> {responseData.data ? 'Yes' : 'No'}
                    {responseData.data && (
                      <ul className="list-circle pl-5 mt-1">
                        <li><strong>Array length:</strong> {Array.isArray(responseData.data) ? responseData.data.length : 'Not an array'}</li>
                      </ul>
                    )}
                  </li>
                  
                  {responseData.data && Array.isArray(responseData.data) && responseData.data[0] && (
                    <>
                      <li>
                        <strong>First item has ID:</strong> {responseData.data[0].id ? 'Yes' : 'No'}
                      </li>
                      <li>
                        <strong>First item has attributes:</strong> {responseData.data[0].attributes ? 'Yes' : 'No'}
                        {responseData.data[0].attributes && (
                          <ul className="list-circle pl-5 mt-1">
                            <li><strong>title:</strong> {responseData.data[0].attributes.title || 'Missing'}</li>
                            <li><strong>date:</strong> {responseData.data[0].attributes.date || 'Missing'}</li>
                            <li><strong>category:</strong> {responseData.data[0].attributes.category || 'Missing'}</li>
                            <li><strong>excerpt:</strong> {responseData.data[0].attributes.excerpt || 'Missing'}</li>
                            <li><strong>content:</strong> {responseData.data[0].attributes.content ? 'Present' : 'Missing'}</li>
                            <li><strong>image:</strong> {responseData.data[0].attributes.image?.data ? 'Present' : 'Missing'}</li>
                          </ul>
                        )}
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApiDebugger; 