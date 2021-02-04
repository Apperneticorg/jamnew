import React, {useMemo, useState} from 'react';
import {createRoom} from '../backend';
import swarm from '../lib/swarm.js';
import {navigate} from '../lib/use-location';
import {enterRoom} from '../main';

export default function Start({urlRoomId, displayRoom}) {
  let randomId = useMemo(() => Math.random().toString(36).substr(2, 6), []);
  let [customId, setRoomId] = useState(urlRoomId || '');
  let [name, setName] = useState('');
  let roomId = customId || randomId;

  let submit = async e => {
    e.preventDefault();
    await createRoom(roomId, name, swarm.myPeerId);
    if (urlRoomId !== roomId) navigate('/' + roomId);
    enterRoom(roomId);
    displayRoom();
  };
  return (
    <div className="container">
      <div className="child">
        <h1>Welcome to Jam</h1>

        <div className="flex flex-row pt-4 pb-4">
          <div className="flex-1 text-gray-600 pt-6">
            Jam is an <span className="italic">audio space</span>
            <br />for chatting, brainstorming, debating, jamming, micro-conferences and more.
            <br /><br />
            <a href="/" className="underline text-blue-800 hover:text-blue-600">
              Learn more about Jam.</a>
          </div>
          <div className="flex-1">
            <img
              className=""
              style={{width: 200, height: 200}}
              alt="Jam mascot"
              title="Jam mascot"
              src="/img/jam-illustration.jpg" />
          </div>
        </div>

        <hr />

        <br />
        <br />

        <form onSubmit={submit}>
          <p>
            <input
              autoFocus
              className="rounded placeholder-gray-300 bg-gray-50 w-2/3"
              type="text"
              placeholder="Room topic"
              value={name}
              name="jam-room-topic"
              autocomplete="off"
              onChange={e => {
                setName(e.target.value);
              }}
            ></input>
            <p className="p-2 text-gray-500 italic">Pick a topic to talk about.</p>
            <input
              className="hidden"
              type="text"
              placeholder={randomId}
              value={customId}
              onChange={e => {
                setRoomId(e.target.value);
              }}
            ></input>
          </p>
          <button
            onClick={submit}
            className="mt-5 h-12 px-6 text-lg text-black bg-gray-200 rounded-lg focus:shadow-outline hover:bg-gray-300"
          >
            🌱 Start room
          </button>
        </form>
      </div>
    </div>
  );
}
