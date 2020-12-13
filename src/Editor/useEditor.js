import React from "react";

const useEditor = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const onClick = () => console.log('close editor')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return {
    tabValue,
    handleTabChange,
    onClick,
  }
}

export default useEditor;