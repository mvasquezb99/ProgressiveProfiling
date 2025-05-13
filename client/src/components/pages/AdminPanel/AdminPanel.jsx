import { useEffect, useState } from 'react';
import axios from 'axios';
import { JsonEditor } from 'json-edit-react';
import AdminAddUserForm from './AdminAddUserForm';
import { getFormat, getHint } from '../../../utils/apiHelpers';
import dotenv from 'dotenv';

export default function AdminPanel() {
  const [jsonInput, setJsonInput] = useState('{}');
  const [response, setResponse] = useState(null);
  const [method, setMethod] = useState('GET');
  const [queryParams, setQueryParams] = useState([]);
  const [endpoint, setEndpoint] = useState('/users');
  const [status, setStatus] = useState(null);
  const [inputMode, setInputMode] = useState('json');
  const [hint, setHint] = useState(null);
  const [loading, setLoading] = useState(false);

  const endpoints = {
    '[GET] Get all users': '/users',
    '[GET] Get users by name': '/admin/users',
    '[GET] Get all occupations': '/admin/occupations',
    '[GET] Get occupation by name': '/admin/occupations/single',
    '[GET] Get all occupation categories': '/admin/categories',
    '[GET] Get occupation category by name': '/admin/categories/single',
    '[POST] Create many users': '/admin/users',
    '[POST] Create a single user': '/admin/users/single',
    '[POST] Relate an existing user': '/admin/users/relate',
    '[POST] Create many occupations': '/admin/occupations',
    '[POST] Create a single occupation': '/admin/occupations/single',
    '[POST] Create many categories': '/admin/categories',
    '[POST] Create a single category': '/admin/categories/single',
    '[POST] Relate a category with a occupation': '/admin/categories/relate',
    '[PUT] Update a user by name': '/admin/users',
    '[DELETE] Delete user by name': '/admin/users',
    '[DELETE] Delete occupation by name': '/admin/occupations',
    '[DELETE] Delete category by name': '/admin/categories',
  };

  const server_url = import.meta.env.VITE_SERVER_URL;

  const handleSendRequest = async () => {
    setLoading(true);
    try {
      let parsedJson;
      if (typeof jsonInput === typeof '') {
        parsedJson = JSON.parse(jsonInput);
      } else {
        parsedJson = jsonInput;
      }
      const queryString = queryParams
        .filter((param) => param.key && param.value)
        .map((param) => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
        .join('&');

      const url = `${server_url}${endpoint}${queryString ? `?${queryString}` : ''}`;
      const res = await axios({
        url,
        method,
        headers: { 'Content-Type': 'application/json' },
        data: method !== 'GET' ? parsedJson : undefined,
      });
      // console.log(url);
      setStatus(res.status);
      setResponse(res.data);
    } catch (error) {
      setStatus('Error');
      setResponse({ error: 'Invalid JSON or request failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEndpoint = (endpoint) => {
    const parsedEndpoint = JSON.parse(endpoint);
    const endpointValue = Object.values(parsedEndpoint)[0];
    setEndpoint(endpointValue);
    setMethod(Object.keys(parsedEndpoint)[0].substring(1, Object.keys(parsedEndpoint)[0].indexOf(']')));
    if (endpointValue !== '/admin/users/single') {
      setInputMode('json');
    }
  };

  const handleSubmitAddUser = async (userInput) => {
    console.log(userInput);
    setJsonInput(userInput);
    await handleSendRequest();
  };

  const methodColors = {
    GET: 'bg-green-600',
    POST: 'bg-yellow-600',
    PUT: 'bg-blue-600',
    DELETE: 'bg-red-600',
  };

  useEffect(() => {
    if (!jsonInput || Object.keys(jsonInput).length === 0) {
      const format = getFormat(method, endpoint);
      setJsonInput(format);
    }
    const hint = getHint(method, endpoint);
    setHint(hint);
  }, [method, endpoint, jsonInput]);

  return (
    <main className="flex items-center justify-center h-full w-full overflow-hidden">
      <div className="flex items-center justify-center min-h-full min-w-screen bg-gray-900 text-white">
        <div className="w-3/4 max-w-8xl bg-gray-800 p-6 rounded-lg shadow-lg flex justify-center items-stretch mx-auto h-screen overflow-hidden">
          {/* Left Panel */}
          <div className="w-1/2 p-4 flex flex-col h-full overflow-y-auto">
            <div className="bg-gray-700 p-4 rounded-lg shadow-md flex-grow flex flex-col">
              <a href={`${server_url}/api/docs`}>For more info visit the docs</a>
              <select
                className="mb-4 p-2 rounded-lg text-white bg-gray-600"
                onChange={(e) => handleChangeEndpoint(e.target.value)}
              >
                {Object.entries(endpoints).map(([name, url]) => (
                  <option key={name} value={JSON.stringify({ [name]: url })}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="mb-4">
                {queryParams.map((param, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="p-2 rounded-lg bg-gray-600 text-white flex-grow"
                      placeholder="Key"
                      value={param.key}
                      onChange={(e) => {
                        const newParams = [...queryParams];
                        newParams[index].key = e.target.value;
                        setQueryParams(newParams);
                      }}
                    />
                    <input
                      type="text"
                      className="p-2 rounded-lg bg-gray-600 text-white flex-grow"
                      placeholder="Value"
                      value={param.value}
                      onChange={(e) => {
                        const newParams = [...queryParams];
                        newParams[index].value = e.target.value;
                        setQueryParams(newParams);
                      }}
                    />
                    <button
                      className="bg-red-600 text-white px-2 rounded-lg"
                      onClick={() => setQueryParams(queryParams.filter((_, i) => i !== index))}
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  className="bg-gray-500 text-white px-2 py-1 rounded-lg"
                  onClick={() => setQueryParams([...queryParams, { key: '', value: '' }])}
                >
                  + Add Query Param
                </button>
              </div>
              <div className="text-gray-200 text-sm italic">🔎 {hint}</div>
              <div className="w-full flex-grow bg-gray-600 text-white p-2 rounded-lg">
                {endpoint === '/admin/users/single' ? (
                  <div>
                    <select
                      className="mb-4 p-2 rounded-lg bg-gray-600 text-white"
                      value={inputMode}
                      onChange={(e) => setInputMode(e.target.value)}
                    >
                      <option value="json">JSON Editor</option>
                      <option value="form">User Form</option>
                    </select>
                    {inputMode === 'json' ? (
                      <JsonEditor data={jsonInput} setData={setJsonInput} />
                    ) : (
                      <AdminAddUserForm setJsonInput={handleSubmitAddUser} />
                    )}
                  </div>
                ) : (
                  <JsonEditor data={jsonInput} setData={setJsonInput} />
                )}
                <div />
              </div>
              {inputMode === 'json' && (
                <button
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                  onClick={handleSendRequest}
                >
                  Send
                </button>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-1/2 p-4 flex flex-col h-full overflow-y-auto">
            <div className="bg-gray-700 p-4 rounded-lg shadow-md flex-grow flex flex-col overflow-auto">
              <div
                className={`mb-2 text-lg font-bold rounded-lg bg-gray-600 p-2 ${status >= 200 && status < 300
                  ? 'text-green-500'
                  : status !== null
                    ? 'text-red-500'
                    : 'text-yellow-500'
                  }`}
              >
                {' '}
                <span className="text-white">Status: </span>
                {status !== null ? status : 'Waiting...'}
              </div>
              <div className="w-full flex-grow bg-gray-600 text-white p-2 rounded-lg">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
                  </div>
                ) : (
                  <JsonEditor data={response || {}} viewOnly={true} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
