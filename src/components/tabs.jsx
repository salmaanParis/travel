import React from 'react';

export const Tabs = ({ children }) => {
  return <div className="tabs">{children}</div>;
};

export const TabsList = ({ children }) => {
  return <div className="tabs-list">{children}</div>;
};

export const TabsTrigger = ({ children, onClick }) => {
  return <button className="tabs-trigger" onClick={onClick}>{children}</button>;
};

export const TabsContent = ({ children }) => {
  return <div className="tabs-content">{children}</div>;
};
