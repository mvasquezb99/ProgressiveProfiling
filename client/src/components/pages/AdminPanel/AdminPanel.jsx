import { useState } from 'react';
import axios from 'axios';
import { JsonEditor } from 'json-edit-react';
import AdminAddUserForm from './AdminAddUserForm';

export default function AdminPanel() {
  const [jsonInput, setJsonInput] = useState('{}');
  const [response, setResponse] = useState(null);
  const [method, setMethod] = useState('GET');
  const [queryParams, setQueryParams] = useState([]);
  const [endpoint, setEndpoint] = useState('/users');
  const [status, setStatus] = useState(null);
  const [inputMode, setInputMode] = useState('json');

  const endpoints = {
    '[GET] Get all users': '/users',
    '[GET] Get users by name': '/admin/users',
    '[POST] Create many users': '/admin/users',
    '[DELETE] Delete user by name': '/admin/users',
    '[PUT] Update a user by name': '/admin/users',
    '[POST] Create a single user': '/admin/users/single',
    '[POST] Relate an existing user': '/admin/users/relate',
  };

  const server_url = 'http://localhost:3000';

  const handleSendRequest = async () => {
    try {
      let parsedJson;
      if (typeof jsonInput === typeof '') {
        parsedJson = JSON.parse(jsonInput);
      } else {
        parsedJson = jsonInput;
      }
      console.log(parsedJson);
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
      console.log(url);
      setStatus(res.status);
      setResponse(res.data);
    } catch (error) {
      setStatus('Error');
      setResponse({ error: 'Invalid JSON or request failed' });
    }
  };

  const handleSubmitAddUser = async (userInput) => {
    setJsonInput(userInput);
    await handleSendRequest();
  };

  const methodColors = {
    GET: 'bg-green-600',
    POST: 'bg-yellow-600',
    PUT: 'bg-blue-600',
    DELETE: 'bg-red-600',
  };

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-900 text-white">
        <div className="w-3/4 max-w-8xl bg-gray-800 p-6 rounded-lg shadow-lg flex justify-center items-center mx-auto min-h-[80vh] h-[100vh]">
          {/* Left Panel */}
          <div className="w-1/2 p-4 flex flex-col h-screen">
            <div className="bg-gray-700 p-4 rounded-lg shadow-md flex-grow flex flex-col">
              <a href={`${server_url}/api/docs`}>For more info visit the docs</a>
              <select
                className="mb-4 p-2 rounded-lg text-white bg-gray-600"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
              >
                {Object.entries(endpoints).map(([name, url]) => (
                  <option key={name} value={url}>
                    {name}
                  </option>
                ))}
              </select>
              <select
                className={`mb-4 p-2 rounded-lg text-white ${methodColors[method]}`}
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
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
          <div className="w-1/2 p-4 flex flex-col h-screen">
            <div className="bg-gray-700 p-4 rounded-lg shadow-md flex-grow flex flex-col overflow-auto">
              <div
                className={`mb-2 text-lg font-bold rounded-lg bg-gray-600 p-2 ${
                  status >= 200 && status < 300 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {' '}
                <span className="text-white">Status: </span>
                {status !== null ? status : 'Waiting...'}
              </div>
              <div className="w-full flex-grow bg-gray-600 text-white p-2 rounded-lg">
                <JsonEditor data={response || {}} viewOnly={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
