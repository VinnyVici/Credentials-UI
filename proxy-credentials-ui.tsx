import React, { useState } from 'react';
import { Copy, Check, Eye, EyeOff, MousePointer, Download } from 'lucide-react';

const ProxyCredentialsUI = () => {
  const [copiedItem, setCopiedItem] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [draggedFormat, setDraggedFormat] = useState(null);
  
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

  const handleDragStart = (e, format, formatName) => {
    e.dataTransfer.setData('text/plain', format);
    setDraggedFormat(formatName);
  };

  const handleDragEnd = () => {
    setDraggedFormat(null);
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🔐 Proxy Credentials</h1>
        <p className="text-gray-600">Copy your connection strings with ease</p>
      </div>

      {/* Drag & Drop Zone */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MousePointer size={20} />
          Drag & Drop Formats
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, format1, 'host:port:user:pass')}
            onDragEnd={handleDragEnd}
            className={`p-4 bg-blue-50 rounded-lg border-2 border-blue-200 cursor-move hover:bg-blue-100 transition-colors ${draggedFormat === 'host:port:user:pass' ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono bg-blue-200 px-2 py-1 rounded">host:port:user:pass</span>
              <CopyButton text={format1} itemId="drag1" className="text-xs px-2 py-1">
                {copiedItem === 'drag1' ? <Check size={12} /> : <Copy size={12} />}
              </CopyButton>
            </div>
            <div className="font-mono text-sm text-gray-700 break-all mb-2">
              {showPassword ? format1 : format1.replace(proxyData.pass, '••••••••••••')}
            </div>
            <p className="text-xs text-gray-500">👆 Drag this anywhere to copy, or use the copy button</p>
          </div>
          
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, format2, 'user:pass@host:port')}
            onDragEnd={handleDragEnd}
            className={`p-4 bg-green-50 rounded-lg border-2 border-green-200 cursor-move hover:bg-green-100 transition-colors ${draggedFormat === 'user:pass@host:port' ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-mono bg-green-200 px-2 py-1 rounded">user:pass@host:port</span>
              <CopyButton text={format2} itemId="drag2" className="text-xs px-2 py-1 bg-green-500 hover:bg-green-600">
                {copiedItem === 'drag2' ? <Check size={12} /> : <Copy size={12} />}
              </CopyButton>
            </div>
            <div className="font-mono text-sm text-gray-700 break-all mb-2">
              {showPassword ? format2 : format2.replace(proxyData.pass, '••••••••••••')}
            </div>
            <p className="text-xs text-gray-500">👆 Drag this anywhere to copy, or use the copy button</p>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <Download size={16} />
            <span className="text-sm text-gray-600">Drag the boxes above to any text field</span>
          </div>
        </div>
      </div>

      {/* Individual Components */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Individual Components</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="border rounded-lg p-3">
            <label className="text-xs text-gray-500 uppercase tracking-wide">Host</label>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono">{proxyData.host}</span>
              <CopyButton text={proxyData.host} itemId="host" className="p-1 text-xs">
                <Copy size={12} />
              </CopyButton>
            </div>
          </div>
          
          <div className="border rounded-lg p-3">
            <label className="text-xs text-gray-500 uppercase tracking-wide">Port</label>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono">{proxyData.port}</span>
              <CopyButton text={proxyData.port} itemId="port" className="p-1 text-xs">
                <Copy size={12} />
              </CopyButton>
            </div>
          </div>
          
          <div className="border rounded-lg p-3">
            <label className="text-xs text-gray-500 uppercase tracking-wide">Username</label>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono">{proxyData.user}</span>
              <CopyButton text={proxyData.user} itemId="user" className="p-1 text-xs">
                <Copy size={12} />
              </CopyButton>
            </div>
          </div>
          
          <div className="border rounded-lg p-3">
            <label className="text-xs text-gray-500 uppercase tracking-wide">Password</label>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono">
                {showPassword ? proxyData.pass : '••••••••••••'}
              </span>
              <CopyButton text={proxyData.pass} itemId="pass" className="p-1 text-xs">
                <Copy size={12} />
              </CopyButton>
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
            <CopyButton text={format1} itemId="inline1" className="text-sm px-2 py-1">
              {copiedItem === 'inline1' ? <Check size={14} /> : <Copy size={14} />}
            </CopyButton>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600 min-w-36">user:pass@host:port:</span>
            <code className="flex-1 text-sm bg-white px-2 py-1 rounded border font-mono break-all">
              {showPassword ? format2 : format2.replace(proxyData.pass, '••••••••••••')}
            </code>
            <CopyButton text={format2} itemId="inline2" className="text-sm px-2 py-1">
              {copiedItem === 'inline2' ? <Check size={14} /> : <Copy size={14} />}
            </CopyButton>
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