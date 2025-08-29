import React, { useState } from 'react';
import { Copy, Check, Eye, EyeOff } from 'lucide-react';

const ProxyCredentialsUI = () => {
  const [copiedItem, setCopiedItem] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Sample proxy data
  const proxyData = {
    host: '192.168.1.100',
    port: '3306',
    user: 'admin',
    pass: 'mypassword123'
  };

  const format1 = `${proxyData.host}:${proxyData.port}:${proxyData.user}:${proxyData.pass}`;
  const format2 = `${proxyData.user}:${proxyData.pass}@${proxyData.host}:${proxyData.port}`;

  const copyToClipboard = async (text, itemId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };


  const CopyButton = ({ text, itemId, children, className = "" }) => (
    <button
      onClick={() => copyToClipboard(text, itemId)}
      className={`flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors ${className}`}
    >
      {copiedItem === itemId ? <Check size={16} /> : <Copy size={16} />}
      {children}
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Proxy Credentials UI Options</h1>
          </div>


      {/* Individual Components */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Individual Components</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="border rounded-lg p-3">
            <label className="text-xs text-gray-500 uppercase tracking-wide">Host</label>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono">{proxyData.host}</span>
              <CopyButton text={proxyData.host} itemId="host" className="p-1 text-xs" />
            </div>
          </div>
          
          <div className="border rounded-lg p-3">
            <label className="text-xs text-gray-500 uppercase tracking-wide">Port</label>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono">{proxyData.port}</span>
              <CopyButton text={proxyData.port} itemId="port" className="p-1 text-xs" />
            </div>
          </div>
          
          <div className="border rounded-lg p-3">
            <label className="text-xs text-gray-500 uppercase tracking-wide">Username</label>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono">{proxyData.user}</span>
              <CopyButton text={proxyData.user} itemId="user" className="p-1 text-xs" />
            </div>
          </div>
          
          <div className="border rounded-lg p-3">
            <label className="text-xs text-gray-500 uppercase tracking-wide">Password</label>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono">
                {showPassword ? proxyData.pass : '••••••••••••'}
              </span>
              <CopyButton text={proxyData.pass} itemId="pass" className="p-1 text-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Compact Inline */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Compact Inline</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600 min-w-36">host:port:user:pass:</span>
            <code className="flex-1 text-sm bg-white px-2 py-1 rounded border font-mono break-all">
              {showPassword ? format1 : format1.replace(proxyData.pass, '••••••••••••')}
            </code>
            <CopyButton text={format1} itemId="inline1" className="text-sm px-2 py-1" />
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600 min-w-36">user:pass@host:port:</span>
            <code className="flex-1 text-sm bg-white px-2 py-1 rounded border font-mono break-all">
              {showPassword ? format2 : format2.replace(proxyData.pass, '••••••••••••')}
            </code>
            <CopyButton text={format2} itemId="inline2" className="text-sm px-2 py-1" />
          </div>
        </div>
      </div>

      {/* Password visibility toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          {showPassword ? 'Hide Passwords' : 'Show Passwords'}
        </button>
      </div>
    </div>
  );
};

export default ProxyCredentialsUI;